package Java.Java8.Fundamentals;

import java.util.Comparator;

/**
 * A lambda expression is a concise representation of an anonymous function
 * that can be passed around. Has no name, but has a list of paremeters, a
 * body, a return type, and possibly a list of exceptions to be throw
 * 
 * A function because a lambda isn't associated with a particular class like
 * a method is. But like a method, has parameters, return type, and possibly 
 * exceptions that can be thrown
 * 
 * It can be passed as argument to a method or stored in a variable
 */
public class Lambda {
    // Expression-Style Lambda
    //(parameters) -> expression

    //Block-Style Lambda
    //(parameters) -> { statements; }

    /**
     * 1. List of Parameters - it mirrors the parameters of the compare method of a
     *                         Comparator
     * 2. Arrow - The arrow "->" separates the list of parameters form the body of a
     *            lambda
     * 3. The body of the Lambda - This expression is considered the lambda's return
     *                             value. Compares two Apples using their weights.
     */
    Comparator<Apple> byWeight =
        (Apple a1, Apple a2) -> ((Integer)a1.getWeight()).compareTo(a2.getWeight());
        // Note had to typecast a1.getWeight() and wrap as Integer object to call method

    public void main(String[] args){
        

        /** Examples of Lambdas **/
        // Boolean Expression
        // Predicate p =
        //     (List<String> list) -> list.isEmpty();

        //Creating Objects
        // () -> new Apple(10)

        //Consuming from an object
        // (Apple a) -> {
        //     System.out.println(a.getWeight());
        // }

        // Select/Extract from an object
        // String s -> s.length();

        //Combine two values
        // (int a, int b) -> a * b

        //Compare two objects
        // Comparator<Apple> byWeight =
        //     (Apple a1, Apple a2) -> ((Integer)a1.getWeight()).compareTo(a2.getWeight());
    }

}
