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
    A value of this type can be created using Symbol():
*/
let id = Symbol();

/* */
