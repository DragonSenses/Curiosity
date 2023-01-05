/* Bound function as a method */
/* What will be the output? */
function f() {
  console.log( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();

// Answer: null
/* The context of a bound function is hard-fixed. There's just no way to
further change it. So even while we run use.g(), the original function is
called with this=null.  */


/* Second bind */
/* Can we change this by additional binding? What will be the output? */
/*
function f() {
  console.log(this.name);
}
*/
// eslint-disable-next-line no-func-assign
f = f.bind( {name: "Luna"} ).bind( {name: "Ann" } );

f();  // ?

// Answer: Luna
/* The exotic bound function object returned by f.bind(...) remembers the 
context (and arguments if provided) only at creation time.

A function cannot be re-bound. */


/* Function property after bind */
/* There’s a value in the property of a function. Will it change after bind? 
Why, or why not? */
function sayHi() {
  console.log( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "Leo"
});

console.log( bound.test ); // what will be the output? why?

/* Answer: undefined.

The result of bind is another object. It does not have the test property. */


/* Fix a function that loses "this" */
/* The call to askPassword() in the code below should check the password 
and then call user.loginOk/loginFail depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right 
(other lines are not to be changed). */
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

user = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

/* askPassword(user.loginOk, user.loginFail);  // Line to Fix */
askPassword(user.loginOk, user.loginFail); 