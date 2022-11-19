/* Logical Operators - { OR, AND, NOT } 

There are 4 Logical Operators
1. OR   ||
2. AND  &&
3. NOT  !
4. Nullish Coalescing ??

Despite the logical (which implies boolean), these operators can be applied to
values of any type (not just boolean). Their result can also be of any type. 
Already JavaScript's deviation from logical operators of classical programming.

• "truthy value" defines an operand (variable or expression) that, when 
   converted to Boolean, becomes true
• "falsy values" are values that evaluate to false in a boolean context

                [Summary of JavaScript's Logical Operators]
OR ||     
Syntax: 
        result = value1 || value 2 || value3;
i. Gets the first truthy value from a list of variables or expressions
	• If result is true, stops and returns the original value of that operand
	• If all operands are have been evaluated (i.e. all were false), returns 
      the last operand
	• Values are returned in its original form, without the conversion
ii. Short-Circuit Evaluation - processes arguments until the first truthy value
    is reached, value is returned immediately, and skips the remaining arguments
    • Useful when executing commands only if the condition on the left is falsy

AND &&
Syntax: 
        result = value1 && value2 && value 3;
i. Gets the first falsy value from a list of variables or expressions
	• If result is false, stops and returns the original value of that operand
	• If all operands are have been evaluated (i.e. all were true), returns the 
      last operand
	• Values are returned in its original form, without the conversion
ii. && has higher precedence than ||
    • (a && b || c && d) is the same as (a && b) || (c && d)

NOT ! 
Syntax:
        result = !value;
i. Converts the operand to boolean type: {true, false}
	• Returns the inverse value of the converted boolean
ii. A double NOT !! is sometimes used for converted a value to a boolean type,
    more verbose way of doing the same thing as Boolean(value) function
    • Precedence of NOT ! is the highest of all logical operators, so it always
     executes first before && or ||
*/

/*      Boolean Conversion Rules
    Values that are intuitively "empty":
        0               ->  false
        empty string    ->  false
        null            ->  false
        undefined       ->  false
        NaN             ->  false
    Non-Empty Values
        "0"             ->  true
        " "             ->  true
         1              ->  true
        everything else ->  true 
*/

