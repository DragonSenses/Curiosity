package Java.Practices;

/**
 * List of best coding practices in Java to make code more
 * flexible, reusable, and maintainable. 
 * 
 * 1. Proper Naming Conventions
 * 2. Class members access privately
 * 3. Underscores in lengthy Numeric literals
 * 4. Never leave catch blocks empty
 * 5. StringBuilder/StringBuffer for String Concatenation
 * 6. Avoid Redundant initializations (like 0, false, null)
 * 7. Use enhanced for loops instead of for loops
 * 8. Proper Handling of Null Pointer Exceptions
 * 9. double for precision, float for space
 * 10. Use of single quotes and double quotes 
 * 11. Avoid Memory leaks
 * 12. Return Empty Collections instead of returning null elements
 * 13. String handling (only to represent text, use something else for all other cases)
 * 14. Avoid Unnecessary Object Creation 
 * 15. Proper Commenting for clean code
 */
public class BestPractices {
    // 3. Java 7 feature of lengthy numeric literals 
    int million = 1_000_000; // Higher Readability
    int MP48 = 57_885_161; // 48th Mersenee Prime 2^(MP48)-1;


    // 9. Float or Double
    // double offers more precision 
    // float requires half space
    public static void main(String[] args){
        // 10. Use double quotes to concatenate characters as single quotes 
        // may treat characters as integer values (due to widening primitive conversion)
        // "+" operator adds together the characters C and D as integers
        System.out.print("A" + "B");    // AB
        System.out.print('C' + 'D');    // AB135
        
    }
}
