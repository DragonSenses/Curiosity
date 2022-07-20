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
 * 6            ^           Bitwise exclusive OR            Left to right
 * ----------------------------------------------------------------------
 * 5            |           Bitwise inclusive OR            Left to right
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
 * ----------------------------------------------------------------------
 */
public class OperationPrecedence {
    
}
