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

/* The greater and less comparison operators, such as < >, can work with both 
strings and numbers too. Still, they use the "number" hint, not "default". 
That’s for historical reasons. 

In practice though, things are a bit simpler.

All built-in objects except for one case (i.e. Date object) implement "default" 
conversion the same way as "number". And we probably should do the same.

Still, it’s important to know about all 3 hints, soon we’ll see why.

To do the conversion, JavaScript tries to find and call three object methods:
  1. Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key 
  Symbol.toPrimitive (system symbol), if such method exists,

  2. Otherwise if hint is "string"
    - try calling obj.toString() or obj.valueOf(), whatever exists.

  3. Otherwise if hint is "number" or "default"
    - try calling obj.valueOf() or obj.toString(), whatever exists.

Recap: Symbol.toPrimitive > obj.toString()/obj.valueOf() whatever exists,
      the one called first is based on hint whether string or number/default
*/

/* Symbol.toPrimitive */
/* Built-in symbol named Symbol.toPrimitive that should be used to name the
conversion method, like this: 

obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};

If the method exists, it's used for all hints, and no more methods are needed.

For instance, here user object implements it:
*/
let person = {
  name: "Luna",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(person); // hint: string -> {name: "Luna"}
alert(+person); // hint: number -> 1000
alert(person + 500); // hint: default -> 1500

/* As we can see from the code, user becomes a self-descriptive string or a 
money amount, depending on the conversion. The single method user[Symbol.toPrimitive] 
handles all conversion cases. */


/* toString() or valueOf() 
  If there’s no Symbol.toPrimitive then JavaScript tries to find methods 
toString and valueOf 

- For the "string" hint: call toString method, and if it doesn’t exist or if it 
returns an object instead of a primitive value, then call valueOf (so toString 
has the priority for string conversions).

- For other hints: call valueOf, and if it doesn’t exist or if it returns an 
object instead of a primitive value, then call toString (so valueOf has the 
priority for maths).

Methods toString and valueOf come from ancient times. 
They are not symbols (symbols did not exist that long ago), but rather “regular” 
string-named methods. They provide an alternative “old-style” way to implement the conversion.

These methods must return a primitive value. If toString or valueOf returns an object, 
then it’s ignored (same as if there were no method).

By default, a plain object has following toString and valueOf methods:
  - The toString method returns a string "[object Object]".
  - The valueOf method returns the object itself.
*/

// So if we try to use an object as a string, like in an alert or so, 
// then by default we see [object Object].

let example = { name: "Luna" };
alert(example); // [object Object]
console.log(example.valueOf() === example); // true

/* The default valueOf is mentioned here only for the sake of completeness, 
to avoid any confusion. For historical reasons, it returns the object itself, 
and so is ignored. So we can assume it doesn’t exist. */

/* Customizing the Conversion */
/* For instance, here user does the same as above using a combination of 
toString and valueOf instead of Symbol.toPrimitive: 
*/
user = {
  name: "Luna",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "Luna"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500

/* Single "Catch-All" place to handle all primitive conversions.
In this case, we can implement toString only, likee this:  */