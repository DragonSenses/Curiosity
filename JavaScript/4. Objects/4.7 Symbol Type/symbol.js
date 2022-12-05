/* Symbol Type */
/* Summary
 Symbol is a primitive type for unique identifiers.

Symbols are created with Symbol() call with an optional description (name).

    Symbols are always different values, even if they have the same name.
If we want same-named symbols to be equal, then we should use the global 
registry: Symbol.for(key) returns (creates if needed) a global symbol 
with key as the name. Multiple calls of Symbol.for with the same key 
return exactly the same symbol. 

Symbols have two main use cases:
  1. "Hidden" Object Properties
    If we want to add a property into an object that “belongs” to another 
    script or a library, we can create a symbol and use it as a property 
    key. A symbolic property does not appear in for..in, so it won’t be 
    accidentally processed together with other properties. Also it won’t 
    be accessed directly, because another script does not have our symbol. 
    So the property will be protected from accidental use or overwrite.

    So we can “covertly” hide something into objects that we need, but others 
    should not see, using symbolic properties.

  2. There are many system symbols used by JavaScript which are accessible as
  Symbol.*  
    We can use them to alter some built-in behaviors. For instance, later we
  will use the Symbol.iterator for iterables, Symbol.toPrimitive to setup 
  object-to-primitive conversion and so on.

Technically, symbols are not 100% hidden. There is a built-in method 
Object.getOwnPropertySymbols(obj) that allows us to get all symbols. 
Also there is a method named Reflect.ownKeys(obj) that returns all keys of an 
object including symbolic ones. But most libraries, built-in functions and 
syntax constructs don’t use these methods.
*/

/* By specification, only 2 primitive types may serve as object property keys:
  1) String Type 
  2) Symbol Type
  
  Otherwise, if one uses another type, such as number, it's autoconverted to 
  String. So that 
    - obj[1] is the same as obj["1"]
    - obj[true] is the same as obj["true"] 
    
Symbols represents a unique identifier. 
    A "primitive unique value" withh an optional description.
    A value of this type can be created using Symbol():
*/
let symbol = Symbol();

console.log(symbol); // undefined

// Upon creation, we can give symbols a description (aka symbol name), mostly
// useful for debugging purposes:

let id = Symbol("id");

console.log(id);    // undefined

/* Symbols are guaranteed to be unique. Even if we create many symbols with 
exactly the same description, they are different values. 

The Symbol Name or description is just a label that does not affect anything. 

For instance, here are two symbols with the same description 
  - they are not equal:
*/
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

/* Warning: Symbols do not auto-convert to a string 
Most values JavaScript support implicit conversion to a string. But symbols are
special, they do NOT auto-convert. 

For instance, we can alert almost any value, and it will work. But this alert
will show an error:
*/
let id4 = Symbol("id4");
alert(id4); // TypeError: Cannot convert a Symbol value to a string

/* That's a "language guard" against messing up, because strings and symbols
are fundamentally different and should not accidentally convert one into 
another. */

/* To really show a symbol, need to explicitly call .toString() on it: */
let id5 = Symbol("id5");
alert(id5.toString()); // Symbol(id5), now it works

// Or get "symbol.description" property to show the description only:
let id6 = Symbol("id6");
alert(id6.description); // id6


/* Hidden Properties */
/* Symbols allow us to create "hidden" properties of an object, that no other
part of code can accidentally access or overwrite. For instance, if we're 
working with "user" objects, that belong to third-party code. We'd liek to add
identifiers to them. */
let user = { // belongs to another code
  name: "Leo"
};

id = Symbol("id");

user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key

/* Question: What's the beenfit of using Symbol("id") over a string "id" ? 

Safety:
  As a user object belongs to another codebase, it's unsafe to add fields to
them, since we might affect pre-defined behavior in that other codebase. 
However, symbols cannot be accessed accidentally. The third-party code won’t 
be aware of newly defined symbols, so it’s safe to add symbols to the user
objects.

No Conflicts:
  Also, imagine that another script wants to have its own identifier inside user,
for its own purposes.

Then that script can create its own Symbol("id"), like this:
// ... 
let id = Symbol("id");

user[id] = "Their id value";

  There will be no conflict between our and their identifiers, because symbols
are always different, even if they have the same name. But if we used a string
"id" instead of a symbol for the same purpose, then there would be a conflict:
*/
user = { name: "Leo" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"; //Boom! Overwritten by another script!

/* Symbols in an Object Literal */
/*  If we want to use a symbol in an object literal {...}, 
we need square brackets around it. 
  e.g: 
*/

// let id = Symbol("id");

user = {
  name: "Luna",
  [id]: 123 // not "id": 123
};

// That's because we need the value from the variable "id" as the key, not the
// string "id"

/* Symbols are skipped by the for...in loop */
/* Symbol properties do not participate in the for..in loop
For instance: */

// let id = Symbol("id");
user = {
  name: "Luna",
  age: 20,
  [id]: 123 
};

for (let key in user) console.log(key); // name  age  (no symbols)

// the direct access by the symbol works
console.log( "Direct: " + user[id] ); // Direct: 123

/* Object.keys(user) also ignores them. 
  That's a part of the general "hiding symbolic properties" principle. If
  another script or a library loops over our object, it won't unexpectedly
  access a symbolic property.

In contrast, Object.assign copies both String and Symbol properties.
That's by design. The idea is that when we clone an object or merge objects,
we usually want all properties to be copied(including symbols like id). 
  e.g: */
// let id = Symbol("id");
let dog = {
  [id]: 123
};

let clone = Object.assign({}, dog);

console.log( clone[id] ); // 123

/* Global Symbols */
/* Usually all symbols are different, even if they have the same name.
But sometimes we want same-named symbols to be same entities. For instance,
different parts of our application want to access symbol "id" meaning exactly
the same property. 

To achieve that, there exists a Global Symbol Registry. We can create symbols
in it and access thyem later, and it guarantees that repeated accesses by the
same name return exactly the same symbol. 

In order to read (create if absent) a symbol from the registry,
  use Symbol.for(key)

That call checks the global registry, and if there's a symbol described as key,
then returns it, otherwise creates a new symbol Symbol(key) and stores it in
the registry by the given key. 

For instance:
*/
// read from the global registry
id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
console.log( id === idAgain ); // true

/* Symbols inside the registry are called Global Symbols. If we want an 
application-wide symbol, accessible everywehre in the code - that's what they
are for. */

/* Symbol.keyFor */
/* Symbol.keyFor(sym) - returns a name by global symbol. 

Internally uses the global symbol registry to look up the key for the symbol.
So it doesn't work for non-global symbols. If the symbol is not global, it 
won't be able to find it and returns undefined. 

For instance: */
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) );  // name
alert( Symbol.keyFor(sym2) ); // id

/* All Symbols have the description property */
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) );  // undefined, not global

alert( localSymbol.description ); // name

/* System Symbols */
/* There exist many “system” symbols that JavaScript uses internally, 
and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the Well-known symbols table:
  - Symbol.hasInstance
  - Symbol.isConcatSpreadable
  - Symbol.iterator
  - Symbol.toPrimitive
  - ... and so on.

  For instance, Symbol.toPrimitive allows us to describe object 
  to primitive conversion. 
*/