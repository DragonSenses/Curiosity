/* Property getters and setters */
/* There are two kinds of object properties.

  1. The first kind is data properties. We already know how to work with them. 
  All properties that we’ve been using until now were data properties.

  2. The second type of property is something new. It’s an accessor property. 
  They are essentially functions that execute on getting and setting a value, 
  but look like regular properties to an external code. 
  
*/

/* Getters and Setters */
/* Accessor properties are represented by “getter” and “setter” methods. 
In an object literal they are denoted by get and set: 

let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  }
};

The getter works when obj.propName is read, the setter – when it is assigned.

For instance, we have a user object with name and surname:

let user = {
  name: "Luna",
  surname: "Berry"
};

*/

/* Now we want to add a fullName property, that should be "Luna Berry". 
Of course, we don’t want to copy-paste existing information, so we can 
implement it as an accessor: */
let user = {
  name: "Luna",
  surname: "Berry",
  
    get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

console.log(user.fullName); // Luna Berry

/* From the outside, an accessor property looks like a regular one. 
That’s the idea of accessor properties. We don’t call user.fullName as a 
function, we read it normally: the getter runs behind the scenes.

As of now, fullName has only a getter. If we attempt to assign user.fullName=, 
there will be an error: 

user.fullName = "Test"; // Error (property has only a getter)

*/

/* Let’s fix it by adding a setter for user.fullName: */
user = {
  name: "Luna",
  surname: "Berry",
  
  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper

/* As the result, we have a “virtual” property fullName. It is readable and writable. */


/* Accessor descriptors */
/* Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no value or writable, but instead there are get and set functions.

That is, an accessor descriptor may have: 

  * get – a function without arguments, that works when a property is read,
  * set – a function with one argument, that is called when the property is set,
  * enumerable – same as for data properties,
  * configurable – same as for data properties.
   
For instance, to create an accessor fullName with defineProperty, 
we can pass a descriptor with get and set: */