# Summary | WeakRef and FinalizationRegistry

`WeakRef` - designed to create weak references to objects, allowing them to be deleted from memory by the garbage collector if there are no longer strong references to them.
This is beneficial for addressing excessive memory usage and optimizing the utilization of system resources in applications.

`FinalizationRegistry` - is a tool for registering callbacks, that are executed when objects that are no longer strongly referenced, are destroyed.
This allows releasing resources associated with the object or performing other necessary operations before deleting the object from memory.

#### **Warning** "hidden" features of the language

This article covers a very narrowly focused topic, that most developers extremely rarely encounter in practice (and may not even be aware of its existence).  

We recommend skipping this chapter if you have just started learning JavaScript.

---

Recalling the basic concept of the *reachability principle* from the garbage collection chapter (under Objects), we can note that the JavaScript engine is guaranteed to keep values in memory that are accessible or in use.

For example:

```js
//  the user variable holds a strong reference to the object
let user = { name: "John" };

// let's overwrite the value of the user variable
user = null;

// the reference is lost and the object will be deleted from memory

```

Or a similar, but slightly more complicated code with two strong references:

```js
//  the user variable holds a strong reference to the object
let user = { name: "John" };

// copied the strong reference to the object into the admin variable
*!*
let admin = user;
*/!*

// let's overwrite the value of the user variable
user = null;

// the object is still reachable through the admin variable
```
The object `{ name: "John" }` would only be deleted from memory if there were no strong references to it (if we also overwrote the value of the `admin` variable).

In JavaScript, there is a concept called `WeakRef`, which behaves slightly differently in this case.

---

#### Terms: **Strong reference**, **Weak reference**

**Strong reference** - is a reference to an object or value, that prevents them from being deleted by the garbage collector. Thereby, keeping the object or value in memory, to which it points.  

This means, that the object or value remains in memory and is not collected by the garbage collector as long, as there are active strong references to it.  

In JavaScript, ordinary references to objects are strong references. For example:

```js
// the user variable holds a strong reference to this object
let user = { name: "John" };
```

**Weak reference** - is a reference to an object or value, that does *not* prevent them from being deleted by the garbage collector.
An object or value can be deleted by the garbage collector if, the only remaining references to them are weak references.

## WeakRef

#### Note of caution

Before we dive into it, it is worth noting that the correct use of the structures discussed in this article requires very careful thought, and they are best avoided if possible. 

`WeakRef` - is an object, that contains a weak reference to another object, called `target` or `referent`. 

The peculiarity of `WeakRef` is that it does not prevent the garbage collector from deleting its referent-object. In other words, a `WeakRef` object does not keep the `referent` object alive.  

Now let's take the `user` variable as the "referent" and create a weak reference from it to the `admin` variable.
To create a weak reference, you need to use the `WeakRef` constructor, passing in the target object (the object you want a weak reference to).

In our case — this is the `user` variable:


```js
//  the user variable holds a strong reference to the object
let user = { name: "John" };

//  the admin variable holds a weak reference to the object
*!*
let admin = new WeakRef(user);
*/!*

```

The diagram below depicts two types of references: a strong reference using the `user` variable and a weak reference using the `admin` variable:

![](weakref-finalizationregistry-01.svg)  

Then, at some point, we stop using the `user` variable - it gets overwritten, goes out of scope, etc., while keeping the `WeakRef` instance in the `admin` variable:

```js
// let's overwrite the value of the user variable
user = null;
```

A weak reference to an object is not enough to keep it "alive". When the only remaining references to a referent-object are weak references, the garbage collector is free to destroy this object and use its memory for something else.

However, until the object is actually destroyed, the weak reference may return it, even if there are no more strong references to this object.
That is, our object becomes a kind of "[Schrödinger's cat](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat)" – we cannot know for sure whether it's "alive" or "dead":

![](weakref-finalizationregistry-02.svg)

At this point, to get the object from the `WeakRef` instance, we will use its `deref()` method.  

The `deref()` method returns the referent-object that the `WeakRef` points to, if the object is still in memory. If the object has been deleted by the garbage collector, then the `deref()` method will return `undefined`:

```js
let ref = admin.deref();

if (ref) {
  // the object is still accessible: we can perform any manipulations with it
} else {
  // the object has been collected by the garbage collector
}
```

## WeakRef use cases

`WeakRef` is typically used to create caches or [associative arrays](https://en.wikipedia.org/wiki/Associative_array) that store resource-intensive objects.
This allows one to avoid preventing these objects from being collected by the garbage collector solely based on their presence in the cache or associative array.  

One of the primary examples - is a situation when we have numerous binary image objects (for instance, represented as `ArrayBuffer` or `Blob`), and we want to associate a name or path with each image.
Existing data structures are not quite suitable for these purposes: