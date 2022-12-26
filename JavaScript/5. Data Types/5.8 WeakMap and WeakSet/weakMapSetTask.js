/* Store "unread" flags */
/* There’s an array of messages: 

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

Your code can access it, but the messages are managed by someone else’s code. 
New messages are added, old ones are removed regularly by that code, and you 
don’t know the exact moments when it happens.

Now, which data structure could you use to store information about whether 
the message “has been read”? The structure must be well-suited to give the 
answer “was it read?” for the given message object.

P.S. When a message is removed from messages, it should disappear from your 
structure as well.

P.P.S. We shouldn’t modify message objects, add our properties to them. 
As they are managed by someone else’s code, that may lead to bad consequences.
*/
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

/* Let store read messages in WeakSet */
let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages (WeakSet) has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
console.log("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)

/* The WeakSet allows to store a set of messages and easily check for the 
existence of a message in it.

It cleans up itself automatically. The tradeoff is that we can’t iterate over it, 
can’t get “all read messages” from it directly. 

But we can do it by iterating over all messages and filtering those that are in the set. */

/* Another, different solution could be to add a property like 
  message.isRead=true to a message after it’s read. 
  
As messages objects are managed by another code, that’s generally discouraged, 
but we can use a symbolic property to avoid conflicts.

Like this: */
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;

/* Now third-party code probably won’t see our extra property.

Although symbols allow to lower the probability of problems, 
using WeakSet is better from the architectural point of view. 
*/



/* Store read dates */
/* There’s an array of messages as in the previous task. The situation is similar. 

The question now is: which data structure you’d suggest to store the information: 
“when the message was read?”.

In the previous task we only needed to store the “yes/no” fact. Now we need to 
store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in Date class
*/

/* Answer: To store a date, we can use WeakMap: */
let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));

// When was the first message read?     // Date (Year, Month, Day) 
console.log(readMap.get(messages[0]));  // Wed Feb 01 2017
                                        // Months start at 0 (Jan) to 11 (Dec)

readMap.set(messages[1], new Date()); // 2nd message read right now!

console.log(readMap.get(messages[1])); 


/* 
WeakSet: for Yes/No facts
WeakMap: for storing information

The requirements determine whether WeakSet or WeakMap is used. 

In Q1 all that is needed is a piece of info to check if a message is read or not, so
WeakSet is used. That is because you can store only values in Set/WeakSet, and a 
single value is all we need (i.e., messages[index]) 
    - Could have used WeakMap, e.g., storing the message as the key, and a boolean
    as the value. e.g., readMessages.set(messages[0], true). 
    - But WeakSet and .has() is easier and achieves the same behavior with better
    readability

In Q2, we store the message itself, in addition to the time it was read at, so
2 pieces of info are required here, that's why we wnet with the WeakMap. 
*/