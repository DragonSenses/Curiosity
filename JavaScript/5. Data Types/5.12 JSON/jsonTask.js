/* Turn the object into JSON and back */
/* Turn the user into JSON and then read it back into another variable. */
let user = {
    name: "Luna Berry",
    age: 20
};
  
let json = JSON.stringify(user);

console.log(json); // {"name":"Luna Berry","age":20}

let user2 = JSON.parse(json);

console.log(user);  // {name: 'Luna Berry', age: 20}
console.log(user2); // {name: 'Luna Berry', age: 20}



/* Exclude backreferences */
/* In simple cases of circular references, we can exclude an offending 
property from serialization by its name.

But sometimes we can’t just use the name, as it may be used both in circular 
references and normal properties. So we can check the property by its value.

Write replacer function to stringify everything, but remove properties that 
reference meetup: */
let room = {
    number: 23
};
  
let meetup = {
    title: "Conference",
    occupiedBy: [{name: "John"}, {name: "Alice"}],
    place: room
};
  
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

console.log( JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
}));
/* result:
{
    "title":"Conference",
    "occupiedBy":[{"name":"John"},{"name":"Alice"}],
    "place":{"number":23}
}
*/

/* Here we also need to test key == "" to exclude the first call where it is 
normal that value is meetup. 

Recall: replacer function gets every key/value pair including nested objects 
and array items. It is applied recursively. The value of this inside replacer 
is the object that contains the current property.

The first call is special. It is made using a special “wrapper object”: {"": meetup}. 
In other words, the first (key, value) pair has an empty key, and the value 
is the target object as a whole. That’s why the first line is ":[object Object]" 
in the example shown in jsonMethods.js

Shown again here for clarity:
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]

The idea is to provide as much power for replacer as possible: it has a chance 
to analyze and replace/skip even the whole object if necessary. */
  


/* Another Solution to Exclude backreferences is to use WeakSet to keep track
of the references of an object that has been visited before (serialized before) */
const visited = new WeakSet();

let jsonStr = JSON.stringify(meetup, function replacer(key, value){
    // primitive value, as WeakSet only stores objects
    if(typeof(value) != "object") return value;
    
    // circular reference, do not try to serialize this object again
    if(visited.has(value)) return undefined;

    // First time visiting object, so mark it as visited
    visited.add(value);

    return value;
});

console.log(jsonStr); 
// {"title":"Conference","occupiedBy":[{"name":"John"},{"name":"Alice"}],"place":{"number":23}}