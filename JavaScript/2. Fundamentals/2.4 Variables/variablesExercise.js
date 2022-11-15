/** Working with Variables
 * 1. Declare two variables: admin and name.
 * 2. Assign the value "John" to name. 
 * 3. Copy the value from name to admin.
 * 4. Show the value of admin using alert (must output “John”).
 */

let admin, name;

name = "John";
admin = name; 
alert(admin);

/** Right Naming
 * 1. Create a variable with the name of our planet. How would you name such a variable?
 * 2. Create a variable to store the name of a current visitor to a website. 
 * How would you name that variable?
 */

let ourPlanetName = "Earth";
let currentUserName = "John Doe";

/**
 * The age constant.
 *  
 * The age is calculated from birthday using someCode(), some function call 
 * whose implementation is hidden but calculates the age based on birthday.
 * 
 * Would it be right to use upper case for birthday? For age? Or even for both?
 */

// birthday is a hard-coded constant whose value is known prior to execution.
 const BIRTHDAY = '18.04.1982'; // so we name it as an uppercase constant

 // age is evaluated in run-time, constant in a sense that it does not change
 // through the code execution. Keep lower case for it. 
 const age = someCode(BIRTHDAY);
