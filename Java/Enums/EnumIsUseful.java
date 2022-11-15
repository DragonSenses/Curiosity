package Java.Enums;

/**
 * Enumerations serve the purpose of representing a group of named constants in
 * a programming language.
 * 
 * Enum constants are implicitly static and final and you can not change their
 * value once created.
 * 
 * Benefits:
 * 1. Enum is Type-Safe, cannot assign anything else other than predefined Enum
 * constants to an Enum variable. 
 * 2. Enum has its own namespace.
 * 3. Can use Enums in Java as an argument inside Switch statements like int or
 * char primitive data types. 
 * 4. Maintainability - adding new constants on Enum is easy, and does not break
 * existing code
 * 5. Enum in Java are reference types like class or interface and you can define
 * constructor, methods, and variables inside java Enum which makes it more 
 * powerful than Enum in C/C++
 * 6. Enums are implicitly static and final and can not be changed once created
 * 7. Safely compare Constants defined inside Enum in Java because they are final
 * and can safely compare them using "==", the equality operator.
 *      Note: Using "==" is null safe for enums, and also compile-time checking
 *      of types (e.g., enum.constant.equals("string") compiles whereas 
 *                      enum.constant == "string" will not compile)
 *      Works because only one instance of each enum constant see:
 *      https://docs.oracle.com/javase/specs/jls/se9/html/jls-8.html#jls-8.9
 
 * 8. Java compiler automatically generates static values() method for every
 * enum in Java. Values() method returns an array of Enum constants in the same
 * order they have listed in Enum and you can use values() to iterate over values
 * of Enum.
 * 
 * 9. Enum can override methods. 
 * 
 * A Java enumeration is a class type. Although we don’t need need to instantiate
 * an enum using new, it has the same capabilities as other classes. Just like 
 * classes, you can: 
 * - Give them constructors
 * - Add instance variables and methods
 * - Implement interfaces.
 * 
 * One thing to keep in mind is that, unlike classes, enumerations neither inherit
 * other classes nor can get extended(i.e become superclass). 
 */
public class EnumIsUseful {
    
    public enum Currency{
        PENNY, NICKLE, DIME, QUARTER
    }; 

    /* Specifying values of enum constants at creation time.
     * Though need to define member variable and constructor (as it calls a
     * constructor that accepts int value)
     */
    public enum Coins {
        penny(1), nickle(5), dime(10), quarter(25);
        
        /* Member Field */
        private int value; 
        
        /* Private Constructor */
        private Coins(int value) { this.value = value; }
        
        /* Getter for member field */
        public int getValue(){ return this.value; }


    }; // end of enum Coins

    public static void main(String[] args){
        Currency coin = Currency.PENNY;

        /*  
        (1) Enums are type-safe and have their own name space. Meaning enum
        will have a type "Currency" and you cannot assign any value other 
        than specified in Enum Constants 
        */

        // coin = 1;   // Compiler Error, Enums are type-safe

        /* (6) Enum constants are static and final and cannot be changed once made */
        // Currency.PENNY = Currency.DIME; // Compiler error, cannot be reassigned

        Currency oneCent = Currency.PENNY;
        Currency tenCent = Currency.DIME;

        /* (7) Can safely compare Enums using "==" equality operator */
        System.out.println("Is penny equal to one cent?\t" + 
            (coin == oneCent));
        System.out.println("Is penny equal to one cent?\t" + 
            (coin.equals(oneCent)));
        System.out.println("Is penny equal to ten cent?\t" + 
            (coin == tenCent));

        /* (8) Iterating over values of Enum (using values() method) */
        // Notice Insertion Order, exactly safe as defined order in Enum
        for(Currency c: Currency.values()){
            System.out.println("coin: " + c);
        }
    }
}
