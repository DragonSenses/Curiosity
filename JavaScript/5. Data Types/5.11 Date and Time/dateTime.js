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