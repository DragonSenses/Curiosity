package Java.Math;

/**
 * Ways to limit decimal places. 
 * 
 * 1. Using Math.round
 * 2. String.format()
 *   - String.format(%.(n)f, number), where n is number of places
 */
public class Rounding {

    // Could probably abstract away this as a lambda, but using Math.round()
    // to a certain decimal place

    /**
     * Rounds a given number n by a 1 decimal places
     * @param n The number to round
     * @return the number rounded to 1 decimal places
     */
    static double mathRound1(double n){
        return Math.round(n*10.0)/10.0;
    }

    /**
     * Rounds a given number n by a 2 decimal places
     * @param n The number to round
     * @return the number rounded to 2 decimal places
     */
    static double mathRound2(double n){
        return Math.round(n*100.0)/100.0;
    }



    public static void main(String[] args){
        double val = 123.4567;
        System.out.println("======== Rounding using Math.round() ========");
        System.out.println("Value: " + val);
        System.out.println(mathRound1(val));
        System.out.println(mathRound2(val));
        System.out.println("======== Now using String.format() ========");
        System.out.println(String.format("%.1f", val));
        System.out.println(String.format("%.2f", val));
        System.out.println(String.format("%.3f", val));
        System.out.println(String.format("%.5f", val));
    }
}
