/* eslint-disable no-unused-vars */
/* Syntax check */
/* What is the result of this code? 

let user = {
  name: "Luna",
  go: function() { alert(this.name) }
}

(user.go)()

*/

/* P.S. There's a pitfall :) */

/* Answer: Error.

let user = {
  name: "Luna",
  go: function() { alert(this.name) }
}

(user.go)() // error!


The error message in most browsers does not give us much of a clue about 
what went wrong.

The error appears because a semicolon is missing after user = {...}.

JavaScript does not auto-insert a semicolon before a bracket (user.go)(), 
so it reads the code like:

let user = { go:... }(user.go)()

Then we can also see that such a joint expression is syntactically a call 
of the object { go: ... } as a function with the argument (user.go). And 
that also happens on the same line with let user, so the user object has not 
yet even been defined, hence the error.

If we insert the semicolon, all is fine:
*/
let user = {
  name: "Luna",
  go: function() { alert(this.name); }
};  // semicolon here

(user.go)(); // Luna

/* Please note that parentheses around (user.go) do nothing here. Usually 
they setup the order of operations, but here the dot . works first anyway, 
so there's no effect. Only the semicolon thing matters. */



/* Explain the value of "this" */
/* In the code below we intend to call obj.go() method 4 times in a row.

But calls (1) and (2) works differently from (3) and (4). Why? */
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined


/* Answer:
1. That's a regular object method call.

2. The same, parenthesis do not change the order of operations here, the dot is
first anyway. 

3. Here we have a more complex call (expression)(). The call works as if it were
split into two lines: 

f = obj.go; // calculate the expression
f();        // call what we have

Here f() is executed as a function, without this.

4. The similar thing as (3), to the left of the parentheses () we have an expression.


To explain the behavior of (3) and (4) we need to recall that property 
accessors (dot or square brackets) return a value of the Reference Type.

Any operation on it except a method call (like assignment = or ||) turns it 
into an ordinary value, which does not carry the information allowing to set this. */