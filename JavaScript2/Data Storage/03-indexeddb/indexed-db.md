# Summary | IndexedDB

IndexedDB can be thought of as a "localStorage on steroids". It's a simple key-value database, powerful enough for offline apps, yet simple to use.

The best manual is the specification, [the current one](https://www.w3.org/TR/IndexedDB-2/) is 2.0, but few methods from [3.0](https://w3c.github.io/IndexedDB/) (it's not much different) are partially supported.

The basic usage can be described with a few phrases:

1. Get a promise wrapper like [idb](https://github.com/jakearchibald/idb).
2. Open a database: `idb.openDb(name, version, onupgradeneeded)`
    - Create object storages and indexes in `onupgradeneeded` handler or perform version update if needed.
3. For requests:
    - Create transaction `db.transaction('books')` (readwrite if needed).
    - Get the object store `transaction.objectStore('books')`.
4. Then, to search by a key, call methods on the object store directly.
    - To search by an object field, create an index.
5. If the data does not fit in memory, use a cursor.

---

# IndexedDB

IndexedDB is a database that is built into a browser, much more powerful than `localStorage`.

- Stores almost any kind of values by keys, multiple key types.
- Supports transactions for reliability.
- Supports key range queries, indexes.
- Can store much bigger volumes of data than `localStorage`.

That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies.

The native interface to IndexedDB, described in the specification <https://www.w3.org/TR/IndexedDB>, is event-based.

We can also use `async/await` with the help of a promise-based wrapper, like <https://github.com/jakearchibald/idb>. That's pretty convenient, but the wrapper is not perfect, it can't replace events for all cases. So we'll start with events, and then, after we gain an understanding of IndexedDb, we'll use the wrapper.

```smart header="Where's the data?"
Technically, the data is usually stored in the visitor's home directory, along with browser settings, extensions, etc.

Different browsers and OS-level users have each their own independant storage.
```

## Open database

To start working with IndexedDB, we first need to `open` (connect to) a database.

The syntax:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- a string, the database name.
- `version` -- a positive integer version, by default `1` (explained below).

We can have many databases with different names, but all of them exist within the current origin (domain/protocol/port). Different websites can't access each other's databases.

The call returns `openRequest` object, we should listen to events on it:
- `success`: database is ready, there's the "database object" in `openRequest.result`, we should use it for further calls.
- `error`: opening failed.
- `upgradeneeded`: database is ready, but its version is outdated (see below).

**IndexedDB has a built-in mechanism of "schema versioning", absent in server-side databases.**

Unlike server-side databases, IndexedDB is client-side, the data is stored in the browser, so we, developers, don't have full-time access to it. So, when we have published a new version of our app, and the user visits our webpage, we may need to update the database.

If the local database version is less than specified in `open`, then a special event `upgradeneeded` is triggered, and we can compare versions and upgrade data structures as needed.

The `upgradeneeded` event also triggers when the database doesn't yet exist (technically, its version is `0`), so we can perform the initialization.

Let's say we published the first version of our app.

Then we can open the database with version `1` and perform the initialization in an `upgradeneeded` handler like this:

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // ...perform initialization...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue working with database using db object
};
```

Then, later, we publish the 2nd version.

We can open it with version `2` and perform the upgrade like this:

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

openRequest.onupgradeneeded = function(event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(event.oldVersion) { // existing db version
    case 0:
      // version 0 means that the client had no database
      // perform initialization
    case 1:
      // client had version 1
      // update
  }
};
```

Please note: as our current version is `2`, the `onupgradeneeded` handler has a code branch for version `0`, suitable for users that are accessing for the first time and have no database, and also for version `1`, for upgrades.

And then, only if `onupgradeneeded` handler finishes without errors, `openRequest.onsuccess` triggers, and the database is considered successfully opened.

To delete a database:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror tracks the result
```

---

### **We can’t open a database using an older open call version**

If the current user database has a higher version than in the `open` call, e.g. the existing DB version is `3`, and we try to `open(...2)`, then that's an error, `openRequest.onerror` triggers.

That's rare, but such a thing may happen when a visitor loads outdated JavaScript code, e.g. from a proxy cache. So the code is old, but his database is new.

To protect from errors, we should check `db.version` and suggest a page reload. Use proper HTTP caching headers to avoid loading the old code, so that you'll never have such problems.

---

### Parallel update problem
