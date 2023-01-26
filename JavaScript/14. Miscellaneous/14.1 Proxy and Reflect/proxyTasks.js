/* Error on reading non-existent property */
/* Usually, an attempt to read a non-existent property returns undefined.

Create a proxy that throws an error for an attempt to read of a non-existent 
property instead.

That can help to detect programming mistakes early.

Write a function wrap(target) that takes an object target and return a proxy 
that adds this functionality aspect.

That’s how it should work: */
let user = {
  name: "Luna"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`);
      }
    }
  });
}

user = wrap(user);

console.log(user.name); // Luna
console.log(user.age); // ReferenceError: Property doesn't exist: "age"



/* Accessing array[-1] */
/* In some programming languages, we can access array elements using 
negative indexes, counted from the end.

Like this: */
{
  let array = [1, 2, 3];

  array[-1]; // 3, the last element
  array[-2]; // 2, one step from the end
  array[-3]; // 1, two steps from the end
}

/* In other words, array[-N] is the same as array[array.length - N].

Create a proxy to implement that behavior.

That’s how it should work: */
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      // even if we access it like arr[1]
      // prop is a string, so need to convert it to number
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});

console.log( array[-1] ); // 3
console.log( array[-2] ); // 2

// Other array functionality should be kept "as is"



/* Observable */
/* Create a function makeObservable(target) that “makes the object 
observable” by returning a proxy.

In other words, an object returned by makeObservable is just like 
the original one, but also has the method observe(handler) that sets 
handler function to be called on any property change.

Whenever a property changes, handler(key, value) is called with the 
name and value of the property.

P.S. In this task, please only take care about writing to a property. 
Other operations can be implemented in a similar way.
*/
function makeObservable(target) {
  /* your code */
}

// Here’s how it should work: 
{
let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  console.log(`SET ${key}=${value}`);
});

user.name = "Luna"; // console.logs: SET name=Luna
}