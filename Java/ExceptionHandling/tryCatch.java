package Java.ExceptionHandling;

public class tryCatch {
    /**
     * Flow Control of a Try-Cattch
     * 1. If Try Block Succeeds, no exception is thrown, then
     * control goes to the finally block if it is present. 
     * Catch Blocks are skipped. In absence of finally block, 
     * any code below catch block is executed
     * 
     * 2. If Try Block Fails (Exception occurs), control transfers
     * to the catch block where the exception is handled. The 
     * remaining code in try-block is never executed. When a finally
     * block is present, then that is run after the catch block's 
     * execution completes
     * 
     * 3. If try/catch blocks have a return statement, even then the
     * finally block still executes! Flow control jumps to the finally
     * block and then goes back to the return statement
     * @return
     */
    public static String flowControl(){

        try{
            System.out.println("Executing Try Block");
            return "Returning from Try Block";
        } catch(Exception e){
            return "Returning from Catch Block";
        } finally {
            System.out.println("Print from finally");
        }
    }

    /** This time with error **/
    public static String flowControl2(){

        try{
            System.out.println("Executing Try Block");
            int x = 10/0;  // Error
            // Remaining Code in Try-Block is not executed
            System.out.println(x);
            return "Returning from Try Block";
        } catch(Exception e){
            System.out.println("Executing Catch Block");
            return "Returning from Catch Block";
        } finally {
            System.out.println("Print from finally");
        }
    }

    public static void main(String[] args){
        System.out.println(flowControl());
        System.out.println("================= ");
        System.out.println(flowControl2());
    }

    /** BELOW IS BAD PRACTICE, NEVER PUT A RETURN STATEMENT IN FINALLY */

    String somethingThatThrewAnException(){
        return "";
    }

    void cleanUp(){
    }

    /**
     * ISSUE: Exception is not being propagated passed this method,
     * because of the return statement in finally. The exception 
     * was thrown down into another method, caught, logged, and 
     * rethrown in somethingThatThrewAnException(). Return in 
     * finally stops the exception that happens in the try block
     * from propagating up even though it was not caught. 
     * 
     * Remember a try statement with a finally block is executed by
     * first executing the try block. Then there is a choice depending
     * on whether 1. execution of try block completes normally, 2. if
     * execution of try block completes abruptly because of a throw, 
     * 3. or if exeuction of try block completes abruptly for any other
     * reason R then the finally block is executed and makes a choice
     * on whether it completes normally or abruptly. In the latter case,
     * if it completes abruptly due to reason S, then try statement 
     * completes abruptly for reason S whereas reason R is discarded.
     * 
     * To put it simply, a return statement within the finally block 
     * could hide any Throwable. AS a return statement in finally 
     * block will trump any other reason from the regular block
     * 
     * @return
     */
    public String neverPutReturnInFinally(){
        Object obj = null;
        try{
            return somethingThatThrewAnException();
        } catch(Exception e){
            obj = (char)'c';
            obj.toString();
            return "Returning from Catch Block";
        } finally {
            System.out.println("Print from finally");
            cleanUp();
            // return obj.toString();
        }

        // Just put your return here, after then finally
        // Anything that affects return of function should lie in try block
        // Finally block only should be where one cleans up after oneself
        // Such as releasing file pointers, database connections, etc.
    }
}
