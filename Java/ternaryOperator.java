package Java;

/**
 * ternaryOperator in java
 * 
 * Syntax:  
 * booleanExpression ? expression1: expression2
 * 
 * -First operand must be a booleanExpression
 * -Returns expression1 as an output if the first operand evaluates to true
 * -expression2 otherwise
 * 
 * Syntax2: 
 * variable = Expression1 ? Expression2: Expression3
 * 
 * @author kendr
 */
public class ternaryOperator {

	public static void main(String[] args) {
		Double input = -21.42;
		String output;
		
		output = (input > 0.0) ? "positive" : "notpositive";
		System.out.println(output);
		
		//if else construct determining if num > 10
		int num = 8;
		String isGreaterThan10 = "Number is greater than 10";
		String isLessThan10 = "Number is less than or equal to 10";
	
		if(num > 10) {
		    System.out.println(isGreaterThan10);
		}
		else {
		    System.out.println(isLessThan10);
		}
		
		System.out.println("------------------------------------------------");
		
		
		
		num+=6; //Set num to 14
		
		//TO simplify above code we can is TERNARY CONSTRUCT
		final String msg = num > 10 
				  ? "Number is greater than 10" 
				  : "Number is less than or equal to 10";

		System.out.println(msg);
		
		
		
		
		/* Note : When using a Java ternary construct, 
		 * only one of the right-hand side expressions 
		 * i.e. either expression1 or expression2 
		 * is evaluated at runtime.
		 */
		System.out.println("------------------------------------------------");
		
	    // variable declaration 
	    int n1 = 5, n2 = 10, max; 

	    System.out.println("First num: " + n1); 
	    System.out.println("Second num: " + n2); 

	    // Largest among n1 and n2 
	    max = (n1 > n2) ? n1 : n2; 

	    // Print the largest number 
	    System.out.println("Maximum is = " + max);	
	    
	    System.out.println("------------------------------------------------");
	    
        int n3 = 5, n4 = 10, ans; 
  
        System.out.println("First num: " + n3); 
        System.out.println("Second num: " + n4); 
  
        // Performing ternary operation 
        ans = (n3 > n4) ? (n3 + n4) : (n3 - n4); 
  
        //Since (5 > 10) is false, it will evaluate (5 - 10) 
        System.out.println("Result = " + ans); 
	    
	    
	    
	    
	    System.out.println("---------------End of Main Program --------------"); 
	}//END OF MAIN
}//end of Class
