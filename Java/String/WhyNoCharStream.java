package Java.String;

/**
 * Discovered that Java does not support a char stream. Here we find ways to be
 * able to use the API in spite of this. 
 * 
 * AS we know, the method String.chars() returns a stream of ints or IntStream
 * that represent character codes. 
 */
public class WhyNoCharStream {
    
    private static void printJava7Way(String s){
        for(int i = 0; i < s.length(); i++){
            System.out.println(s.charAt(i));
        }
    }

    private static void printJava8Way(String s){

    }

    public static void main(String[] args){
        String s = "hello";

        System.out.printf("\t----- Printing %s in Java 7 -----\n", s);
        printJava7Way(s);
        
        System.out.printf("\n\t----- Printing %s in Java 8 -----\n", s);
        printJava8Way(s);
    }
}
