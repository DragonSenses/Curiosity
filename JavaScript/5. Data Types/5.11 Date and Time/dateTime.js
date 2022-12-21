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
console.log( Dec31_1969 );

/* 
new Date(datestring) 
    If there is a single argument, and it’s a string, then it is parsed automatically. 
The algorithm is the same as Date.parse uses, we’ll cover it later. */
let date = new Date("2017-01-26");
console.log(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

/* 
new Date(year, month, date, hours, minutes, seconds, ms) 
    Create the date with the given components in the local time zone. 
    Only the first two arguments are obligatory.

 - The year should have 4 digits. For compatibility, 2 digits are also accepted 
 and considered 19xx, e.g. 98 is the same as 1998 here, but always using 4 digits is strongly encouraged.
 - The month count starts with 0 (Jan), up to 11 (Dec).
 - The date parameter is actually the day of month, if absent then 1 is assumed.
 - If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.

For instance:
*/
new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default

/* The maximal precision is 1 ms (1/1000 sec): */
date = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log(date); // 1.01.2011, 02:03:04.567


/* Access Date Components */
/* There are methods to access the year, month and so on from the Date object: 
  - getFullYear() 
    * Get the year (4 digits)
    * NOTE: NOT "getYear()" as it returns 2-digit year sometimes, it is deprecated.

  - getMonth() 
    * Get the month, from 0 to 11.

  - getDate()
    * Get the day of month, from 1 to 31 
    * the name of the method does look a little bit strange.

  - getHours(), getMinutes(), getSeconds(), getMilliseconds()
    * Get the corresponding time components.

Additionally, we can get a day of week:
  - getDay()
    * Get the day of week, from 0 (Sunday) to 6 (Saturday). 
    * The first day is always Sunday, in some countries that’s not so, but can’t be changed.
    
All the methods above return the components relative to the local time zone.

There are also their UTC-counterparts, that return day, month, year and 
so on for the time zone UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). 
Just insert the "UTC" right after "get".

If your local time zone is shifted relative to UTC, then the code below shows different hours:
*/
// current date
date = new Date();

// the hour in your current time zone
console.log( date.getHours() );

// the hour in UTC+0 time zone (London time without daylight savings)
console.log( date.getUTCHours() );

/* Besides the given methods, there are two special ones that do not have a UTC-variant: 
  - getTime()
    * Returns the timestamp for the date – a number of milliseconds passed from 
  the January 1st of 1970 UTC+0.

  - getTimezoneOffset()
    * Returns the difference between UTC and the local time zone, in minutes:
*/
// if you are in timezone UTC-1, outputs 60
// if you are in timezone UTC+3, outputs -180
console.log( new Date().getTimezoneOffset() );

/* Setting date components */
/* The following methods allow to set date/time components:
 - setFullYear(year, [month], [date])
 - setMonth(month, [date])
 - setDate(date)
 - setHours(hour, [min], [sec], [ms])
 - setMinutes(min, [sec], [ms])
 - setSeconds(sec, [ms])
 - setMilliseconds(ms)
 - setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)

Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().


As we can see, some methods can set multiple components at once, for example setHours. 
The components that are not mentioned are not modified.

For instance:
*/
let today = new Date();

today.setHours(0);
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.


/* Autocorrection */
/* The autocorrection is a very handy feature of Date objects. 
We can set out-of-range values, and it will auto-adjust itself.

For instance: */
date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date); // ...is 1st Feb 2013!

/* Out-of-range date components are distributed automatically.
  Let’s say we need to increase the date “28 Feb 2016” by 2 days. 
It may be “2 Mar” or “1 Mar” in case of a leap-year. 
  We don’t need to think about it. Just add 2 days. 
The Date object will do the rest: */
date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

console.log( date ); // 1 Mar 2016

/* That feature is often used to get the date after the given period of time. 
For instance, let’s get the date for “70 seconds after now”: */
date = new Date();
date.setSeconds(date.getSeconds() + 70);

console.log( date ); // shows the correct date

/* We can also set zero or even negative values. For example: */
date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
console.log( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
console.log( date ); // 31 Dec 2015

/* Date to number, date diff */
/* When a Date object is converted to number, it becomes the timestamp 
same as date.getTime(): */
date = new Date();
console.log(+date); // the number of milliseconds, same as date.getTime()

/* The important side effect: dates can be subtracted, the result is their difference in ms.

That can be used for time measurements: */
let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  // let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

console.log( `The loop took ${end - start} ms` );