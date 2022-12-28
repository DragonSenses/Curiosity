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
/* Here we also need to test key == "" to exclude the first call where it is 
normal that value is meetup. */
  
/* result:
{
    "title":"Conference",
    "occupiedBy":[{"name":"John"},{"name":"Alice"}],
    "place":{"number":23}
}
*/