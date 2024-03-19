package Java.BitwiseOperations;

import java.math.BigDecimal;

public class BitwisePower {
  // Store the number of decimal places
  private static int decimalPlaces = 4; 

  /**
   * A function that returns the number of decimal places of a given number
   * @param number to get decimal places from
   * @return number of decimal places
   */
  public static int getDecimalPlaces(double number) {
    // Convert the number to a BigDecimal object
    BigDecimal bigDecimal = new BigDecimal(number);
    // Strip any trailing zeros from the BigDecimal
    bigDecimal = bigDecimal.stripTrailingZeros();
    // Return the scale of the BigDecimal, which is the number of digits after the decimal point
    return bigDecimal.scale();
  }

  /**
   * Round a double value to n decimal places
   * @param value to round
   * @param n number of decimal places
   * @return a rounded double value to n decimal places.
   */
  public static double round(double value, int n) {
    double scale = Math.pow(10, n);
    return Math.round(value * scale) / scale;
  }

  /**
   * Calculates x raised to the power of n.
   *
   * @param x the base
   * @param n the exponent
   * @return the result of x^n
   */
  public double myPow(double x, int n) {
    // Handle the base cases
    if (n == 0) {
        return 1;
    }
    if (n == 1) {
        return x;
    }
    if (n == -1) {
        return 1 / x;
    }

    // Initialize the result and the exponent
    double result = 1;
    int exponent = Math.abs(n);

    // Loop until the exponent becomes zero
    while (exponent > 0) {
        // If the exponent is odd, multiply the result by x
        if ((exponent & 1) == 1) {
            result *= x;
        }
        // Right shift the exponent by 1 bit
        exponent >>= 1;
        // Square the base
        x *= x;
    }

    // If the original exponent was negative, invert the result
    if (n < 0) {
        result = 1 / result;
    }

    // Round the result to 4 decimal places (you can add this step if needed)
    // result = round(result, 4);

    // Return the result
    return result;
  }
}
