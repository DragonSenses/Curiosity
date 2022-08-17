package Java.ControlFlow;

/**
 * Demonstrates the use of the continue statement, mostly used within loops
 * as control flow directly jumps to the beginning of the loop for the next
 * iteration, skipping the execution of statements inside the loops body
 * for the current iteration.
 * 
 * Useful when you want ot continue thhe loop but do not want the rest of the
 * statements to execute (after continue statement) in loop  body to execute
 * for thata particular iteration.
 */
public class Continue {
    private Continue() {} // prevent instantiation

    // For this example we will iterate through 1-7, but omit 4 using continue
    public static void main(String[] args) {
        StringBuilder output = new StringBuilder("Numbers:\n1, 2, 3, 4, 5, 6, 7");
        System.out.println(output.toString());  // Digits 1-7 for reference
        output.delete(0,output.indexOf("7") + 1); // Clear

        System.out.println("======== Continue in a For Loop ========");
        // 1. Continue in a For Loop
        for(int k = 1; k <= 7; k++){
            if(k==4) {
                continue;   // Skip this iteration if k = 4
            }
            // Lines to Execute in loop body during iteration, better output
            output.append(k);
            if(k != 7){
                output.append(", ");
            }
        }
        System.out.println(output.toString());
        output.delete(0,output.indexOf("7") + 1); // Clear

        System.out.println("\n======== Continue in a While Loop ========");
        // 2. Continue in a While Loop
        int k = 1;
        while(k <= 7){
            if(k == 4) { 
                k++;      // Remember to increment at this line, or we skip it during k = 4
                continue; // Skip iteration if k = 4
            }    
            output.append(k);
            if(k != 7) { output.append(", "); }
            k++;
        }
        System.out.println(output.toString());
        output.delete(0,output.indexOf("7") + 1); // Clear

        System.out.println("\n======== Continue in a Do-While Loop ========");
        // 3. Continue in a Do-While Loop
        k = 1;
        do{
            if(k == 4) { 
                k++;      // Don't skip iteration when k = 4 !
                continue; // Skip the rest of execution below when k = 4
            }    
            output.append(k);
            if(k != 7) { output.append(", "); }
            k++;
        }while(k <= 7);
        System.out.println(output.toString());
    }
}
