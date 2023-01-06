/* Arrow Functions revisited */
/* Summary
 - Do not have this
 - Do not have arguments
 - Can't be called with new
 - They also don't have super (see: Class inheritance)

That’s because they are meant for short pieces of code that do not have their 
own “context”, but rather work in the current one. And they really shine in 
that use case.
*/

/* Let’s revisit arrow functions.

Arrow functions are not just a “shorthand” for writing small stuff. 
They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function 
that’s executed somewhere else.

For instance:

arr.forEach(func) – func is executed by forEach for every array item.
setTimeout(func) – func is executed by the built-in scheduler.
…there are more.
It’s in the very spirit of JavaScript to create a function and pass it 
somewhere.

And in such functions we usually don’t want to leave the current context. 
That’s where arrow functions come in handy. */


/* Arrow Functions have no "this" */
/* Let’s revisit arrow functions.

Arrow functions are not just a “shorthand” for writing small stuff. 
They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that’s
 executed somewhere else.

For instance:
  - arr.forEach(func) – func is executed by forEach for every array item.
  - setTimeout(func) – func is executed by the built-in scheduler.

It’s in the very spirit of JavaScript to create a function and pass it somewhere.

And in such functions we usually don’t want to leave the current context. 
That’s where arrow functions come in handy. */


/* Arrow Functions have no "this" */
/* As we remember from the chapter Object methods, "this", arrow functions do 
not have this. If this is accessed, it is taken from the outside.

For instance, we can use it to iterate inside an object method: */
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();

/* Here in forEach, the arrow function is used, so this.title in it is exactly 
the same as in the outer method showList. That is: group.title.

If we used a “regular” function, there would be an error: 

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();


The error occurs because forEach runs functions with this=undefined by default, 
so the attempt to access undefined.title is made.

That doesn’t affect arrow functions, because they just don’t have this.
*/