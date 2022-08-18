package Java.Equality;

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
 * - Two disadvantages is that its a lot less convenient than using a 
 * primitive arithmetic type; and its slower. 
 * 2) Use int or long, and track decimal point yourself 
 * 
 * Problem to demonstrate:
 */
public class FloatsArentExact {
    
    static void issueOne(){
        System.out.println("We have $1.03 and spent $0.42, what's left?");
        System.out.println("$1.03 - $0.42 = $" + (1.03 - 0.42));
        System.out.println("\nWe have $1.00 and buy 9 nine candies"
            + " worth 10 cents each, what's left? ");
        System.out.println("1.00 - 9 * 0.10 = $" + (1.00 - 9 * 0.10));
    }

    public static void main(String[] args){
        issueOne();
    }
}
