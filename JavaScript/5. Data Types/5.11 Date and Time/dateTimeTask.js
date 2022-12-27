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
  
    /* 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. */
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

function getLocalDay(date) {
    /* 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. */
    let day = date.getDay();

    // since getDay() returns 0 for Sunday, change it to 7
    if (day == 0) { // weekday 0 (sunday) is 7 in european
        day = 7;
    }

    return day;
}

{
let date = new Date(2012, 0, 3);        // 3 Jan 2012
console.log( getLocalDay(date) );       // Tuesday, should show 2

date = new Date(2022, 11, 25);          // 25 Dec 2022
console.log( getLocalDay(date) );       // Sunday, should show 7    
}

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

/**
 * Returns the day of month days ago from the date.
 * @param {Date} date The date to determine from
 * @param {number} days how many days ago from the given date
 */
function getDateAgo(date, days){
    // Subtract given number of days from date
    // But do not modify the passed in object date
    // So clone the date, then subtract
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
}

{
let date = new Date(2015, 0, 2);        //     (2 Jan 2015)
console.log( getDateAgo(date, 1) );     // 1,  (1 Jan 2015)
console.log( getDateAgo(date, 2) );     // 31, (31 Dec 2014)
console.log( getDateAgo(date, 365) );   // 2,  (2 Jan 2014)
}


/* Last day of month? */
/* Write a function getLastDayOfMonth(year, month) that returns the last 
day of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:
* year – four-digits year, for instance 2012.
* month – month, from 0 to 11.
For instance, getLastDayOfMonth(2012, 1) = 29 (leap year, Feb). */

/* Answer: Normally, dates start from 1, but technically we can pass any number, 
the date will autoadjust itself. So when we pass 0, then it means “one day 
before 1st day of the month”, in other words: “the last day of the previous month”. 
*/
function getLastDayOfMonth(year, month){
    // Add a month, then get the previous day (passing in 0)
    let date = new Date(year, month + 1, 0);
    return date.getDate();  
}

console.log(getLastDayOfMonth(2012, 1));    // 29 (leap year, Feb.)


/* How many seconds have passed today? */
/* Write a function getSecondsToday() that returns the number of seconds 
from the beginning of today.
The function should work in any day. That is, it should not have a hard-coded 
value of “today”.

For instance, if now were 10:00 am, and there was no daylight savings shift, 
then:   getSecondsToday() == 36000 // (3600 * 10)
*/

/**
 * @returns {number} seconds that passed from the beginning of today
 */
function getSecondsToday(){
    /* To get the number of seconds, we can generate a date using the current 
    day and time 00:00:00, then substract it from now */
    let now = new Date();

     // create an object using the current day/month/year
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /* The difference is the number of milliseconds from the beginning of the 
    day, that we should divide by 1000 to get seconds: */
    let diff = now - today; // ms difference
    return Math.round(diff / 1000); // make seconds
}

console.log( getSecondsToday() ); // getSecondsToday() == 36000 (3600 * 10)  10AM, no DST

/* Alternative Solution is get Hours/Minutes/Seconds and cocnvert to seconds */
function getSecondsToday2(){
    let d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
console.log( getSecondsToday2() );


/* How many seconds till tomorrow? */
/* Create a function getSecondsToTomorrow() that returns the number of seconds till tomorrow.

P.S. The function should work at any day, the “today” is not hardcoded.

For instance, if now is 23:00, then: getSecondsToTomorrow() == 3600 */


function getSecondsToTomorrow(){
    /* To get the number of milliseconds till tomorrow, we can from 
    “tomorrow 00:00:00” substract the current date. */
    let now = new Date();

    // create tommorow date object using the current day/month/year, adding 1 day
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
  
    let diff = tomorrow - now;      // ms difference
    return Math.round(diff / 1000); // convert to seconds
}

console.log(getSecondsToTomorrow());

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

/**
 * Formats date as follows:
 * - If since date passed less than 1 second, then "right now".
 * - Otherwise, if since date passed less than 1 minute, then "n sec. ago".
 * - Otherwise, if less than an hour, then "m min. ago".
 * - Otherwise, the full date in the format "DD.MM.YY HH:mm". That is: 
 * "day.month.year hours:minutes", all in 2-digit format, e.g. 31.12.16 10:00.
 * 
 * @param {Date} date object that will be formatted
 */
function formatDate(date){
    let diff = new Date() - date;
    // Case 1: Less than 1 second
    if (diff < 1000) { 
        return 'right now';
    }
    
    let sec = Math.floor(diff / 1000); // convert diff to seconds
    
    // Case 2: Less than 1 minute
    if (sec < 60) {
        return sec + ' sec. ago';
    }
    
    let min = Math.floor(diff / 60000); // convert diff to minutes

    // Case 3: Less than 1 hour
    if (min < 60) {
        return min + ' min. ago';
    }
    
    // Case 4: Full Date in format "DD.MM.YY HH:mm"
    // format the date
    // add leading zeroes to single-digit day/month/hours/minutes
    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // take last 2 digits of every component
    
    // join the components into date
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

console.log( formatDate(new Date(new Date - 1)) );  // "right now"

console.log( formatDate(new Date(new Date - 30 * 1000)) );  // "30 sec. ago"

console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
console.log( formatDate(new Date(new Date - 86400 * 1000)) );