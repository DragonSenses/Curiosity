package Java.PassByValue;

/**
 * 1. Pass-By-Value 
 *  Actual parameter (or argument expression) is fully evaluated 
 * and the resulting value is copied into a location being used 
 * to hold the formal parameter’s value during method/function 
 * execution. That location is typically a chunk of memory on the
 * runtime stack for the application (which is how Java handles it),
 * but other languages could choose parameter storage differently.
 * 
 * 2. Pass-By-Reference
 * The formal parameter merely acts as an alias for the actual parameter.
 *  Anytime the method/function uses the formal parameter (for reading or
 *  writing), it is actually using the actual parameter.
 * 
 * Java is strictly pass-by-value, exactly as in C. Read the Java Language
 * Specification (JLS). Java has pointers and is strictly pass-by-value. 
 * https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.1:
 * 
 *  "When the method or constructor is invoked (§15.12), the values of the 
 * actual argument expressions initialize newly created parameter variables,
 * each of the declared type, before execution of the body of the method or
 * constructor. The Identifier that appears in the FormalParameter may be
 * used as a simple name in the body of the method or constructor to refer
 * to the formal parameter."
 * 
 * Simple test to check whether a language supports pass-by-reference 
 * semantics is the traditional swap(x,y) method/function.
 * 
 * Traditional swap method/function takes two arguments, swaps them such
 * that variables passed into the function are changed outside the
 * function.
 */
public class Swapping {

    public static void swap (int x, int y) {
        int temp = x;
        x = y;
        y = temp;
    }

    public static void main(String[] args) {
        int x = 7;
        int y = 31;

        System.out.println("==== Before swap function is called ====");
        System.out.println("Value of x is:\t" + x);
        System.out.println("Value of y is:\t" + y);
        System.out.println("==== After swap function is called ====");

        System.out.println("Value of x is:\t" + x);
        System.out.println("Value of y is:\t" + y);
    }
}
