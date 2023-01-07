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