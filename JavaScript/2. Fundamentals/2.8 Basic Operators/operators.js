/* Summary of Basic Operators and Mathematical Operations in JavaScript 

• Operands are what operators are applied to.
    e.g., in 5 * 2 the left operand is 5, the right operand is 2, operator is * (multiply)
• An operator is "Unary" if it has a single operand 
    e.g., in x = -x the "-" is unary negation and reverses the sign of a singled operand number
• An operator is "Binary" if it has two operands
    e.g., y - x the "-" is subtraction in this expression

• Operations are add, subtract, multiply, divide, remainder(%), and exponentiation (**)
	○ a % b returns remainder of integer division of a/b
	○ a**b raise a to the power of b (ab)

• Binary "+" applied to strings concatenates (i.e. merges) them together
• Unary "+" applied to non-numbers converts it into a number (same as Number(val) function)

• Operator Precedence is the execution order is defined by their precedence, 
or the default priority order of operators. The order of how to evaluate an expression.

• Assignment Operator "=" has a low precedence of "2" so that calculations are 
done first and then "=" is evaluated storing the result
	○ Since "=" is an Assignment Operator , where all operators in JavaScript 
      return a value, then any value assigned will also be returned 
	○ e.g., x = value , writes value into x and then returns it
• Modify-In-Place operators both assign and operate (e.g., +=, -=, *=, /=)
• Increment/Decrement 
    ○ ++ increments (i.e. increases a variable by 1) 
    ○ -- decrements (i.e. decreases a variable by 1)
	○ prefix form:      ++counter
	○ postfix form:     counter++ 
    ○ Difference between prefix and postfix forms is when we use the return value
    of ++ or --
	○ ++ or -- only be applied to variables. If used on a value it will give an error.
• Bitwise Operations are supported
• Comma Operator evaluates several expressions dividing them by a comma "," 
    ○ Each of the expressions are evaluated but only the result of the last one is returned
*/

