package Java.ControlFlow;

/**
 * Multiple-value control flow using switch statement.
 * 
 * Evaluates an integer, string, character, or even enum expression causing
 * control flow to jump to the code location labeled with the value of this
 * expression. 
 * 
 * Flow of control "falls through" to the next case if the code for a case is
 * not ended with a "break" statement (which causes control flow to jump to 
 * the end). Whenever a "break" statement is encountered in the switch body,
 * the execution flow would directly come out of the switch, ignoring rest
 * of the cases.
 * 
 * If there is no matching label then control flow jumps to the location 
 * labeled "default", the only explicit jump performed by the switch
 * statement. 
 * 
 * Case does not need to have an order (ex. 1,2,3 ...), can be specified in
 * any order based on the requirement.
 * 
 * Expression inside the switch should result in a constant value, otherwise
 * it would not be valid
 * 
 * Valid expressions for switch:
 * switch(1+2)
 * switch(2*7+4%5)
 * 
 * Invalid expressions for switch:
 * switch(ab+cd)
 * switch(x+y+z)
 */
public class switchCase {
    public enum Day {MON, TUE, WED, THU, FRI, SAT, SUN};

    public static void todayIs(Day d){
        switch(d){
            case MON:
                System.out.println("Mondays are the start.");
                break;
                    
            case FRI:
                System.out.println("Fridays are good.");
                break;
                         
            case SAT: case SUN:
                System.out.println("Weekends are great.");
                break;
                        
            default:
                System.out.println("Midweek days are ok");
                break;
        }
    }

    
}
