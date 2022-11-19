/* Check the login 

Write the code which asks for a login with prompt.

If the visitor enters "Admin", then prompt for a password, if the input is an
empty line or Esc – show "Canceled", if it’s another string – then show "I don’t know you".

The password is checked as follows:

If it equals "TheMaster", then show "Welcome!",
Another string – show "Wrong password",
For an empty string or cancelled input, show "Canceled" 

Please use nested if blocks. Mind the overall readability of the code.

Hint: passing an empty input to a prompt returns an empty string ''. 
Pressing ESC during a prompt returns null.

*/

let login = prompt("Who's there?",'');

// Check if login is either "Admin", empty line/ESC (empty string), or other.
if(login == "Admin"){   // login is Admin?
    let password = prompt("Password?",'');

    if(password == "TheMaster") {   // password is TheMaster?
        console.log("Welcome!");
    } else if( (login === '') || (login === null)) {
        console.log("Canceled"); 
    } else {
        console.log("I don't know you");
    }

} else if( (login === '') || (login === null)){ // strictly an empty string or null?
    console.log("Canceled");
} else {    // login is any other String
    console.log("I don't know you");
}