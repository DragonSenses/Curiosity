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

/*  */