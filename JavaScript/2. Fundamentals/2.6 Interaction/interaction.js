/** Interaction: alert, prompt, confirm
 *  - alert() shows a message (string passed in as argument) and waits for the
 * user to press "OK". The mini-window with message is a modal window, i.e., 
 * the visitor can't interact with the rest of the page until they have dealt
 * with the window (pressing "OK")
 * 
 * - prompt(title,[default]) - shows a modal window with a text message, an 
 * input field for the visitor, and the buttons OK/Cancel. "title" is text to 
 * show the visitor whereas "default" is an optional second parameter, the 
 * initial value for the input field. The user types something within the
 * input field and pressing OK will save that text into the result. Or if they
 * cancel by pressing cancel or Esc key, then we get null as the result. 
 * 
 * -confirm(question) - shows a modal window with a question and two buttons 
 * "OK" and "Cancel". The result is true if OK is pressed, and false otherwise.
 * 
 */

/* Examples of using the functions
// Using alert()
alert("Hello");

// Using prompt()
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!

// Using confirm()
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed 
*/

let name = prompt("What is your name?", "noName");
alert(`Your name is ${name}.`);