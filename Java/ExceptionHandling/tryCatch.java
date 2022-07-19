package Java.ExceptionHandling;

public class tryCatch {
    /**
     * Flow Control of a Try-Cattch
     * 1. If Try Block Succeeds, no exception is thrown, then
     * control goes to the finally block if it is present. 
     * Catch Blocks are skipped. In absence of finally block, 
     * any code below catch block is executed
     * 
     * 2. If Try Block Fails
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

    public static void main(String[] args){
        System.out.println(flowControl());
    }
}
