package Java.String;

import java.util.stream.IntStream;

/**
 * Was always interested in powers of 2, so wanted to: 
 * To Do: Create a power of 2 table with n left column, 2^n right column.
 * 
 * Next step: split the pairs of columns n/2^n at 16 values, so 0-15 for
 * the first then 16-31 for the 2nd 
 * 
 * Next step: calculate powers of 1024 and its deviation
 */
public class PowersOfTwo {
    // To Do 
    // Want a Table such that every integer is a power of two 
    // print tab with each until 5th value print new line
    public static boolean skipLine(int i){
        switch(i){
            case(16):   //2^4
                return true; 
            case(512):  // 2^9
                return true;    
            case(16384):    // 2^14    
                return true;    
            case(524288):   // 2^19
                return true;
            default:
                return false;
        }
    }

    // Java 8 practice, breaking lines every 5 elements using a lambda and ternary
    // statement.
    // print the values, if it isn't a multiple of 4 tab, otherwise a newline
    public static void main(String[] args) {
        // IntStream.rangeClosed(1,25) // Generate a range of 1 to 25
        //         .map(i -> (i << 1)) // Multiply each value by 2
        //         .forEachOrdered(i -> System.out.print(i + ((i % 5 != 0) ? "\t" : "\n")));

        // IntStream.rangeClosed(1,70)
        //         .filter(i -> (i & i-1) == 0)    
        //         .forEachOrdered(i -> System.out.println(i));

        // IntStream.rangeClosed(1,70)
        //         .filter(i -> (i & i-1) == 0)    
        //         .forEachOrdered(i -> System.out.print(i + ((i % 16 != 0) ? "\t" : "\n")));

        IntStream.rangeClosed(1,524288)
                .filter(i -> (i & i-1) == 0)    
                .forEachOrdered(i -> System.out.print(i + ((skipLine(i)) ? "\n" : "\t")));
    }


}
