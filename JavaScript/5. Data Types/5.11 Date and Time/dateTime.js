/* Date and Time */
/* Summary 
 - Date and time in JavaScript are represented with the Date object. 
   We can’t create “only date” or “only time”: Date objects always carry both.

 - Months are counted from zero (yes, January is a zero month).

 - Days of week in getDay() are also counted from zero (that’s Sunday).

 - Date auto-corrects itself when out-of-range components are set. 
   Good for adding/subtracting days/months/hours.

 - Dates can be subtracted, giving their difference in milliseconds. 
   That’s because a Date becomes the timestamp when converted to a number.

 - Use Date.now() to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. 

Node.js has microtime module and other ways. 
Technically, almost any device and environment allows to get more precision, it’s just not in Date.

JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), 
but most environments provide it. For instance, browser has performance.now() 
that gives the number of milliseconds from the start of page loading with 
microsecond precision (3 digits after the point):
*/
console.log(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct


/* Let’s meet a new built-in object: Date. 
- It stores the date, time and provides methods for date/time management.

For instance, we can use it to store creation/modification times, to measure 
time, or just to print out the current date. */

/* Creation */
/* To create a new Date object call new Date() with one of the following arguments:

new Date()
    Without arguments – create a Date object for the current date and time:
*/
let now = new Date();
console.log( now ); // shows current date/time

/* 
new Date(milliseconds) 
    Create a Date object with the time equal to number of milliseconds (1/1000 of a second) 
passed after the Jan 1st of 1970 UTC+0.
*/

// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log( Jan01_1970 );

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 );

/* Timestamp: an integer number representing the number of milliseconds that 
has passed since the beginning of 1970. 

It’s a lightweight numeric representation of a date. We can always create a 
date from a timestamp using new Date(timestamp) and convert the existing Date 
object to a timestamp using the date.getTime() method (see below).

Dates before 01.01.1970 have negative timestamps, e.g.:
*/

// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
alert( Dec31_1969 );

/*  */