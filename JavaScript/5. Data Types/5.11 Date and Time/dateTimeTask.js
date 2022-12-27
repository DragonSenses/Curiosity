/* Create a date */
/* Create a Date object for the date: Feb 20, 2012, 3:12am. 
The time zone is local.

Show it using console.log. */

// Answer:
/* The new Date constructor uses the local time zone. 
So the only important thing to remember is that months start from zero.

So February has number 1. */
{
// Example with numbers as date components:
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
console.log(d1);

/* We could also create a date from a string, like this: */
let d2 = new Date("2012-02-20T03:12");
console.log( d2 );
}


/* Show a weekday */
/* Write a function getWeekDay(date) to show the weekday in 
short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

For instance: 
let date = new Date(2012, 0, 3);  // 3 Jan 2012
console.log( getWeekDay(date) );        // should output "TU"
*/

// Answer:
/* The method date.getDay() returns the number of the weekday, starting from sunday.

Let’s make an array of weekdays, so that we can get the proper day name by 
its number: */
function getWeekDay(date) {
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  
    return days[date.getDay()];
}

{
let date = new Date(2012, 0, 3);  // 3 Jan 2012
console.log( getWeekDay(date) );  // should output "TU"

date = new Date(2014, 0, 3);      // 3 Jan 2014
console.log( getWeekDay(date) );  // FR
}




/* European weekday */
/* European countries have days of week starting with Monday (number 1), then 
Tuesday (number 2) and till Sunday (number 7). 

Write a function getLocalDay(date) that returns the “European” day of week for date.

let date = new Date(2012, 0, 3);  // 3 Jan 2012
console.log( getLocalDay(date) );       // tuesday, should show 2
*/


/* Which day of month was many days ago? */
/* Create a function getDateAgo(date, days) to return the day of month days 
ago from the date.

For instance, if today is 20th, then getDateAgo(new Date(), 1) should be 19th 
and getDateAgo(new Date(), 2) should be 18th.

P.S. The function should not modify the given date.

Should work reliably for days=365 or more: 
let date = new Date(2015, 0, 2);

console.log( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
console.log( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
console.log( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
*/


/* Last day of month? */
/* Write a function getLastDayOfMonth(year, month) that returns the last 
day of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:

year – four-digits year, for instance 2012.
month – month, from 0 to 11.
For instance, getLastDayOfMonth(2012, 1) = 29 (leap year, Feb). */



/* How many seconds have passed today? */
/* Write a function getSecondsToday() that returns the number of seconds 
from the beginning of today.
The function should work in any day. That is, it should not have a hard-coded value of “today”.

For instance, if now were 10:00 am, and there was no daylight savings shift, then: 
getSecondsToday() == 36000 // (3600 * 10)
*/


/* How many seconds till tomorrow? */
/* Create a function getSecondsToTomorrow() that returns the number of seconds till tomorrow.

P.S. The function should work at any day, the “today” is not hardcoded.

For instance, if now is 23:00, then: 
getSecondsToTomorrow() == 3600*/


/* Format the relative date */
/* Write a function formatDate(date) that should format date as follows:

 - If since date passed less than 1 second, then "right now".
 - Otherwise, if since date passed less than 1 minute, then "n sec. ago".
 - Otherwise, if less than an hour, then "m min. ago".
 - Otherwise, the full date in the format "DD.MM.YY HH:mm". That is: 
 "day.month.year hours:minutes", all in 2-digit format, e.g. 31.12.16 10:00.

For instance: 
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
*/