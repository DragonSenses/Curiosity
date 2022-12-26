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



/* Store read dates */
/* There’s an array of messages as in the previous task. The situation is similar. 

The question now is: which data structure you’d suggest to store the information: 
“when the message was read?”.

In the previous task we only needed to store the “yes/no” fact. Now we need to 
store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in Date class
*/



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
2 pieces of info are required here, that's why we wnet wiht the WeakMap. 
*/