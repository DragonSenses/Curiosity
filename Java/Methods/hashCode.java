package Java.Methods;

/**
 * Override hashCode when you override equals()
 * 
 * Contract of hashCode
 * 1. Whenever hashCode is invoked in the same object it should return the
 *  same integer.
 * 2. If two objects are equals according to the equals, the should return the
 *  same integer calling hashCode.
 * 3. Is not required (but recommended) that two non equals objects return
 *  distinct hashCode.
 * 
 * The second condition is the one that is more often violated.
 * 
 * =========================== The Recipe ===========================
 * 1. Store constant value (i.e. 17) in an integer called result
 * 2. For each field f used in equals do:
 * 
 */
public class hashCode {
    
}
