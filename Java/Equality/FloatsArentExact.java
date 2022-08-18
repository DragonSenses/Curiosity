package Java.Equality;

import java.math.BigDecimal;

/**
 * Avoid float and double if exact answers are required. They perform binary
 * floating-point arithmetic which was carefully designed to furnish accurate
 * approximations quickly over a broad range of magnitudes. 
 * 
 * Due to their storage method in memory, floats and doubles are ill-suited
 * for monetary calculations, because it is impossible to represent 0.1 (or
 * any other negative power of ten) as a float or double exactly.
 * 
 * Naive workaround is to merely round the results prior to printing, but 
 * this does not always work. 
 * 
 * Solutions:
 * 1) BigDecimal
 * - if you want the system to keep track of the decimal point
 * - Gives full control over rounding, lets you select from eight rounding modes
 * - Two disadvantages is that its a lot less convenient than using a 
 * primitive arithmetic type; and its slower. 
 * 2) Use int or long
 * - Performance is of the essence
 * - Track decimal point yourself 
 * - use int if quantities don't exceed nine decimal digits
 * - use long if quantities don't exceed eighteen digits
 * 
 * Problem to demonstrate: Have $1 to spend, candies priced at $0.10, $0.20, $0.30,
 * and so forth up to a dollar. Buy one of each candy starting with the one with 
 * 10 cents until you cant afford to buy the next. How many candies can be bought, 
 * and how much change?
 */
public class FloatsArentExact {
    
    static void issueOne(){
        System.out.println("We have $1.03 and spent $0.42, what's left?");
        System.out.println("$1.03 - $0.42 = $" + (1.03 - 0.42));
        System.out.println("\nWe have $1.00 and buy 9 nine candies"
            + " worth 10 cents each, what's left? ");
        System.out.println("1.00 - 9 * 0.10 = $" + (1.00 - 9 * 0.10));
        System.out.println();
    }

    // Broken - uses floating point for monetary calculation!
    static void poorAttempt(){
        System.out.println("Candies priced at $0.10, $0.20, $0.30,"
            + " and so forth up to a dollar.\n\n\tHow many can we get starting from the 10 cent candy?\n");
        double funds = 1.00;
        System.out.println("funds = " + funds); 
        int itemsBought = 0;
        for (double price = 0.10; funds >= price; price += 0.10) {
            funds -= price;
            itemsBought++;
        }
        System.out.println(itemsBought + " items bought.");
        System.out.println("Change: $" + funds);
    }

    // Provides the correct answer
    static void goodAttempt(){
        System.out.println("\nLet's try that again, surely we can get more candy\n");
        final BigDecimal TEN_CENTS = new BigDecimal(".10");
        int itemsBought = 0;
        BigDecimal funds = new BigDecimal("1.00");
        for (BigDecimal price = TEN_CENTS;
            funds.compareTo(price) >= 0;
            price = price.add(TEN_CENTS)) {
            funds = funds.subtract(price);
            itemsBought++;
        }
        System.out.println(itemsBought + " items bought.");
        System.out.println("Money left over: $" + funds);
    }

    // Correct answer using int
    static void betterAttempt(){
        System.out.println();
        int funds = 100;
        int itemsBought = 0;
        for (int price = 10; funds >= price; price += 10) {
            funds -= price;
            itemsBought++;
        }
        System.out.println(itemsBought + " items bought.");
        System.out.println("Cash left over: " + funds + " cents");
    }

    public static void main(String[] args){
        issueOne();
        poorAttempt();
        goodAttempt();
        betterAttempt();
    }
}
