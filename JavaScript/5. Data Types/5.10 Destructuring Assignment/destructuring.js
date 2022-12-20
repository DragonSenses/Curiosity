/* Destructuring Assignment */
/* Summary
- Destructuring assignment allows for instantly mapping an object or array onto many variables.

The full object syntax:
        let {prop : varName = default, ...rest} = object

    * This means that property prop should go into the variable varName and, 
      if no such property exists, then the default value should be used.

    * Object properties that have no mapping are copied to the rest object.

The full array syntax:
        let [item1 = default, item2, ...rest] = array

    * The first item goes to item1; the second goes into item2, 
      all the rest makes the array rest.

- It’s possible to extract data from nested arrays/objects, for that the left side 
must have the same structure as the right one.
*/

/* The two most used data structures in JavaScript are Object and Array.

    - Objects allow us to create a single entity that stores data items by key.
    - Arrays allow us to gather data items into an ordered list.

Although, when we pass those to a function, it may need not be an object/array 
as a whole. It may need individual pieces.

Destructuring assignment is a special syntax that allows us to “unpack” arrays 
or objects into a bunch of variables, as sometimes that’s more convenient.

Destructuring also works great with complex functions that have a lot of 
parameters, default values, and so on.
*/

/* Array Destructuring */
/* Here’s an example of how an array is destructured into variables: */
// we have an array with the name and surname
let arr = ["Luna", "Berry"];

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName); // Luna
console.log(surname);   // Berry

/* Now we can work with variables instead of array members.

It looks great when combined with split or other array-returning methods: */
[firstName, surname] = "Luna Berry".split(' ');
console.log(firstName); // Luna
console.log(surname);   // Berry

/* As you can see, the syntax is simple. There are several peculiar details though. 
Let’s see more examples, to better understand it. */

/* “Destructuring” does not mean “destructive”. */
/* It’s called “destructuring assignment,” because it “destructurizes” by copying 
items into variables. But the array itself is not modified.

It’s just a shorter way to write: 
*/
// let [name, name2] = arr;
let name = arr[0];
let name2 = arr[1];

console.log(name + " " + name2);

/* Ignorning elements using commas */
/* Unwanted elements of the array can also be thrown away via an extra comma: */
// second element is not needed
let [name1, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log( title ); // Consul
console.log( name1 ); // Julius
/* In the code above, the second element of the array is skipped, the third one 
is assigned to title, and the rest of the array items is also skipped 
(as there are no variables for them). */


/* Works with any iterable on the right-side */
/* …Actually, we can use it with any iterable, not only arrays: */
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

console.log(a, b, c);
console.log(one, two, three);

/* That works, because internally a destructuring assignment works by iterating 
over the right value. It’s a kind of syntax sugar for calling for..of over the 
value to the right of = and assigning the values. */

/* Assign to anything at the left-side */
/* We can use any “assignables” on the left side.

For instance, an object property: */
let user = {};
[user.name, user.surname] = "Luna Berry".split(' ');

console.log(user.name);     // Luna
console.log(user.surname);  // Berry


/* Looping with .entries() */
/* Previously we saw the Object.entries(obj) method.
We can use it with destructuring to loop over keys-and-values of an object:
*/
user = {
    name: "Luna",
    age: 20
};

// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
    console.log(`${key}:${value}`); // name:Luna, then age:20
}

/* Swap Variables Trick */
/* There’s a well-known trick for swapping values of two variables using a 
destructuring assignment: */
let guest = "Frey";
let admin = "Glare";

console.log(`${guest} ${admin}`); // Frey Glare 

// Let's swap the values: make guest=Glare, admin=Frey
[guest, admin] = [admin, guest];

console.log(`${guest} ${admin}`); // Glare Frey (successfully swapped!)


/* The rest '...' */
/* Usually, if the array is longer than the list at the left, the “extra” items are omitted.

For example, here only two items are taken, and the rest is just ignored: */
let [item1, item2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(item1); // Julius
console.log(item2); // Caesar
// Further items aren't assigned anywhere

/* If we’d like also to gather all that follows – we can add one more parameter
 that gets “the rest” using three dots "...": */
 let [i1, i2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
 console.log(i1);   // Julius
 console.log(i2);   // Caesar

 // rest is array of items, startim fron the 3rd one
 console.log(rest[0]);      // Consul
 console.log(rest[1]);      // of the Roman Republic
 console.log(rest.length);  // 2

 /* The value of rest is the array of the remaining array elements.

We can use any other variable name in place of rest, just make sure it 
has three dots before it and goes last in the destructuring assignment. 

e.g.,

let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]

*/

/* Default Values */
/* If the array is shorter than the list of variables at the left, there’ll be no errors. 
Absent values are considered undefined: */
let [x, y] = [];
console.log(x); // undefined
console.log(y); // undefined

/* If we want a Default value to replace the missing one, we can provide it using "=" */
// default values
let [hero = "Anyone", villain = "Joker"] = ["Batman"];

console.log(hero);    // Batman (from array)
console.log(villain); // Joker (default used)

/* Default values can be more complex expressions or even function calls. 
They are evaluated only if the value is not provided.

For instance, here we use the prompt function for two defaults: */

// prompt will run only for the missing value - codeName
let [realName = prompt('real name?'), codeName = prompt('code name?')] = ["Julius"];

console.log(realName);  // Julius (from array)
console.log(codeName);  // (whatever prompt gets)

/* Object destructuring */
/* The destructuring assignment also works with objects.
Syntax:
        let {var1, var2} = {var1:…, var2:…}

 - We should have an existing object on the right side, that we want to split into variables.
 - The left side contains an object-like “pattern” for corresponding properties. 
   In the simplest case, that’s a list of variable names in {...}.

For instance:
*/
let options = {
    alias: "Menu",
    width: 100,
    height: 200
};

let {alias, width, height} = options;

console.log(alias);  // Menu
console.log(width);  // 100
console.log(height); // 200

/* Properties options.title, options.width and options.height are assigned to 
the corresponding variables.

The order does not matter. This works too: */
// changed the order in let {...}
// let {height, width, alias} = { alias: "Menu", height: 200, width: 100 };

/* The pattern on the left side may be more complex and specify the mapping between properties and variables.

If we want to assign a property to a variable with another name, for instance, 
 make options.width go into the variable named w, 
 then we can set the variable name using a colon: */

options = {
    optName: "Menu",
    width: 100,
    height: 200
};
  
// { sourceProperty: targetVariable }
let {width: w, height: h, optName} = options;

// width -> w
// height -> h
// optName -> optName

console.log(optName);   // Menu
console.log(w);         // 100
console.log(h);         // 200

/* The colon shows “what : goes where”. In the example above the property 
width goes to w, property height goes to h, and optName is assigned to the same name. */

/* For potentially missing properties we can set default values using "=", like this:  */
function setDefaultValuesExample(){

    let options = {
        title: "Menu"
    };
      
    let {width = 100, height = 200, title} = options;
    
    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
}
setDefaultValuesExample();

/* Just like with arrays or function parameters, default values can be any expressions 
or even function calls. They will be evaluated if the value is not provided.

In the code below prompt asks for width, but not for title: */
function setDefaultValuesExample2(){

    let options = {
        title: "Menu"
    };
    
    let {width = prompt("width?"), title = prompt("title?")} = options;
    
    console.log(title);  // Menu
    console.log(width);  // (whatever the result of prompt is)
}
setDefaultValuesExample2();

/* We also can combine both the colon and equality: */

function setDefaultValuesExample3(){

    let options = {
        title: "Menu"
    };
    
    let {width: w = 100, height: h = 200, title} = options;
    
    console.log(title);  // Menu
    console.log(w);      // 100
    console.log(h);      // 200
}
setDefaultValuesExample3();

/* If we have a complex object with many properties, we can extract only what we need: */

function onlyExtractWhatIsNeeded(){
    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };
    
    // only extract title as a variable
    let { title } = options;
    
    console.log(title); // Menu
}
onlyExtractWhatIsNeeded();


/* The rest pattern "..." */
/* What if the object has more properties than we have variables? Can we take 
some and then assign the “rest” somewhere?

We can use the rest pattern, just like we did with arrays. (Works in Modern Browsers). 
 - It’s not supported by some older browsers (IE, use Babel to polyfill it)

It looks like this: */
function restWithObjects(){
    let options = {
        title: "Menu",
        height: 200,
        width: 100
    };
    
    // title = property named title
    // rest = object with the rest of properties
    let {title, ...rest} = options;
    
    // now title="Menu", rest={height: 200, width: 100}
    console.log(title);        // Menu
    console.log(rest.height);  // 200
    console.log(rest.width);   // 100
}
restWithObjects();

/* NOTE: Gotcha if there's no let */
/* In the examples above variables were declared right in the assignment: let {…} = {…}. 
Of course, we could use existing variables too, without let. But there’s a catch. 

This won’t work:

let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};


The problem is that JavaScript treats {...} in the main code flow (not inside 
another expression) as a code block. Such code blocks can be used to group statements, 
like this:
*/
{
    // a code block
    let message = "Hello";
    // ...
    alert( message );
}

/* So here JavaScript assumes that we have a code block, that’s why there’s an error. 
We want destructuring instead.

To show JavaScript that it’s not a code block, we can wrap the expression in parentheses (...): */
// let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

console.log( title );   // Menu
console.log( width );   // 100
console.log( height );  // 200


/* Nested Destructuring */
/* If an object or an array contain other nested objects and arrays, we can use
more complex left-side patterns to extract deeper portions.

In the code below options has another object in the property size and an array 
in the property items. The pattern on the left side of the assignment has the 
same structure to extract values from them: */
function nestedDestructuring(){

let options = {
    size: {
      width: 100,
      height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
    size: { // put size here
        width,
        height
    },
    items: [item1, item2], // assign items here
    title = "Menu" // not present in the object (default value is used)
} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
console.log(item1);  // Cake
console.log(item2);  // Donut

}
nestedDestructuring(); 

/* All properties of options object except extra that is absent in the 
left part, are assigned to corresponding variables.
    size -> size
    items -> items

Finally, we have width, height, item1, item2 and title from the default value.

Note that there are no variables for size and items, as we take their content instead.
 */