/* Object to Primitive Conversion */
/* Summary 
  The object-to-primitive conversion is called automatically by many built-in 
  functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
  - "string" (for alert and other operations that need a string)
  - "number" (for maths)
  - "default" (few operators, usually objects implement it the same way as "number")

The specification describes explicitly which operator uses which hint.

    The conversion algorithm is:
  1. Call obj[Symbol.toPrimitive](hint) if the method exists,
  2. Otherwise if hint is "string"
    - try calling obj.toString() or obj.valueOf(), whatever exists.
  3. Otherwise if hint is "number" or "default"
    - try calling obj.valueOf() or obj.toString(), whatever exists.

    All these methods must return a primitive to work (if defined).

In practice, it’s often enough to implement only obj.toString() as a “catch-all” 
method for string conversions that should return a “human-readable” representation 
of an object, for logging or debugging purposes.
*/

/* What happens when objects are added obj1 + obj2 or subtracted obj1 - obj2 or
printed using alert(obj)? 

  - JavaScript doesn't allow you to customize how operators work on objects
  - In case of such operations, objects are auto-converted to primitives, and
  then the operation is carried out over these primitives and results in a 
  primitive value
  - An important limitation: the result of obj1 + obj2 CANNOT be another object!
    e.g., we can’t make objects representing vectors or matrices (or achievements 
      or whatever), add them and expect a “summed” object as the result. 
      Such architectural feats are automatically “off the board”.
  - There's no maths with objects in real projects, when it happens it's mostly
  because of a coding mistake

So how are object converts to primitive? How to customize it?
*/

/* Conversion Rules 
  1. There’s no conversion to boolean. All objects are true in a boolean context, 
  as simple as that. There exist only numeric and string conversions.

  2. The numeric conversion happens when we subtract objects or apply mathematical 
  functions. For instance, Date objects (to be covered in the chapter Date and time) 
  can be subtracted, and the result of date1 - date2 is the time difference between two dates.

  3. As for the string conversion – it usually happens when we output an object
  with alert(obj) and in similar contexts.

We can implement String and Numeric Conversions by ourselves, using special object methods.
*/

/* Hints - how JavaScript decide which conversion to apply.
  There are 3 varaints of type conversion, that happen in various situations.
They're called "hints", as described in the specification:

  i. "string" - for an object-to-string conversion, when we're doing an operation
  on an object that expects a string, like alert: 
*/

let obj = {};
let anotherObj = {};

// output
alert(obj);

// using object as a property key
anotherObj[obj] = 123;

/* ii. "number" - for an object-to-number conversion: */
let date1, date2, user1, user2; // date and user objects

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;

// Most built-in mathematical functions also include such conversions
console.log(num + " " + n + " " + delta + " " + greater);

/* "default" 
Occurs in rare cases when the operator is "not sure" what type to expect.

For instance, binary plus + can work both with strings (concatenates them) and
numbers (adds them). So if a binary plus gets an object as an argument, it uses
the "default" hint to convert it.

Also, if an object is compared using == with a string, number or a symbol, 
it’s also unclear which conversion should be done, so the "default" hint is used.
*/

let obj1, obj2; // object references
let user = {}; // user object

// binary plus uses the "default" hint
let total = obj1 + obj2;
alert(total);

// obj == number uses the "default" hint
if (user == 1) { /* ... */ }