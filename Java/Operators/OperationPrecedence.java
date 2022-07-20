package Java.Operators;

/**
 * Precedence of Operations in Java
 * 
 * ======================================================================
 * Precedence   Operator    Type                            Associativity
 * ======================================================================
 *              ()          Parentheses
 * 15           []          Array subscript                 Left to Right
 *              .           Member selection
 * ----------------------------------------------------------------------
 * 14           ++          Unary post-increment            Right to left
 *              --          Unary post-decrement                        
 * ----------------------------------------------------------------------
 *              ++          Unary pre-increment         
 *              --          Unary pre-decrement
 *              +           Unary plus
 * 13           -           Unary minus                     Right to left
 *              !           Unary logical negation
 *              ~           Unary bitwise complement
 *              (type)      Unary type cast
 * ----------------------------------------------------------------------
 *              *           Multiplication
 * 12           /           Division                        Left to right
 *              %           Modulus
 * ----------------------------------------------------------------------
 * 11           +           Addition                        Left to right
 *              -           Subtraction
 * ----------------------------------------------------------------------
 *              <<          Bitwise left shift              Left to right
 * 10           >>          Bitwise right shift with sign extension
 *              >>>         Bitwise right shift with zero extension
 * ----------------------------------------------------------------------
 *              <           Relational less than
 *              <=          Relational less than or equal
 * 9            >           Relational greater than         Left to right
 *              >=          Relational greater than or equal
 *              instanceof  Type comparison (objects only) 
 * ----------------------------------------------------------------------
 * 8            ==          Relational is equal to          Left to right
 *              !=          Relational is not equal to   
 * ----------------------------------------------------------------------
 * 7            &           Bitwise AND                     Left to right
 * ----------------------------------------------------------------------
 * 6            ^           Bitwise exclusive OR (XOR)      Left to right
 * ----------------------------------------------------------------------
 * 5            |           Bitwise inclusive OR (OR)       Left to right
 * ----------------------------------------------------------------------
 * 4            &&          Logical AND                     Left to right
 * ----------------------------------------------------------------------
 * 3            ||          Logical OR                      Left to right
 * ----------------------------------------------------------------------
 * 2            ?:          Ternary conditional             Right to left
 * ----------------------------------------------------------------------
 *              =           Assignment
 *              +=          Addition assignment
 * 1            -=          Subtraction assignment          Right to left
 *              *=          Multiplication assignment
 *              /=          Division assignment
 *              %=          Modulus assignment
 *         &=   ^=   |=     Assignment Operators
 *          <<=    >>= 
 * ----------------------------------------------------------------------
 */
public class OperationPrecedence {
    
    /**
     * This code demonstrates why the value "7" is printed twice in a row
     * The code System.out.println(++i) evaluates to 7, because the prefix
     * version evalues to the incremented value. The next line, 
     * System.out.println(i++); evaluates to the current value of (7) then
     * increments by one. So 8 does not get printed until the next line
     */
    public static void prePostDemo(){
        int i = 4;
        i++;
        System.out.println(i);    // "5"
        ++i;                     
        System.out.println(i);    // "6"
        System.out.println(++i);  // "7"
        System.out.println(i++);  // "7"
        System.out.println(i);    // "8"
    }

    public static void prePostDemo2(){
        System.out.println("========== Post Increment Example ==========");
        int i = 10;
        System.out.println("int i = " + i );
        int n = i++%5;      // Postfix increment treats i as 10 in the expression 
        System.out.print("int n = i++%5 evaluates to: \n");
        System.out.println("Value of i is: [" + i + "], Value of n is [" + n + "]");
        System.out.println("========== Pre Increment Example ==========");
        i = 10;
        System.out.println("int i = " + i );
        n = ++i%5;          // Here prefix increment treats i as 11 in the expression
        System.out.print("int n = ++i%5 evaluates to: \n");
        System.out.println("Value of i is: [" + i + "], Value of n is [" + n + "]");
    }

    public static void main(String[] args){
        prePostDemo();
        prePostDemo2();
    }
}
