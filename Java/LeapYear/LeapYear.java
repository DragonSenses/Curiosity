package Java.LeapYear;

/**
 * This is how the Gregorian calendar calculates leap years:
 * - If the year is divisible by four, it's a leap year.
 * - But if the year can be divided by 100 as well as four, it's not a leap year.
 * - However, if the year is divisible by 400, it is a leap year.
 * 
 * This system keeps the calendar aligned with the Solar year to within a few 
 * decimal places of accuracy.
 * 
 * @see https://www.bbc.com/future/article/20240228-leap-year-the-imperfect-solution-to-fix-the-calendar
 */
public class LeapYear {

/**
 * Checks if a given year is a leap year.
 *
 * @param year the year to check
 * @return true if the year is a leap year, false otherwise
 */
public static boolean isLeapYear(int year) {
  if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
      return true;
  }
  return false;
}

  /**
   * Prints to the console whether the year is a leap year.
   * @param year the year to check if it is a leap year
   */
  public static void check(int year){
    StringBuilder b = new StringBuilder();
    b.append(String.valueOf(year));
    b.append(" is ");
    
    if (isLeapYear(year)) {
      b.append("a leap year. \t\t [true]");
    } else {
      b.append("NOT a leap year. \t [false]");
    }

    System.out.println(b.toString());
  }

  public static void main(String[] args) {
    check(1600);
    check(1900);
    check(2000);
    check(2023);
    check(2024);
  }
}
