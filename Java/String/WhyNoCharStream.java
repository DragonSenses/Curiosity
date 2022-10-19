package Java.String;

/**
 * Discovered that Java does not support a char stream. Here we find ways to be
 * able to use the API in spite of this. 
 * 
 * AS we know, the method String.chars() returns a stream of ints or IntStream
 * that represent character codes. 
 * 
 * To be able to process chars using Streams in Java 8, such as printing, first
 * convert the String into an IntStream through the String.chars() method. Next
 * map it into an object via the lambda (i -> (char)i), automatically boxing it
 * into a Stream<Character>, then we can process it. 
 * 
 * Must use mapToObj() to convert the Stream, if using only map() it will return
 * an IntStream, which will print integer values instead of characters.
 */
public class WhyNoCharStream {
    
    private static void printJava7Way(String s){
        for(int i = 0; i < s.length(); i++){
            System.out.println(s.charAt(i));
        }
    }

    private static void printJava8Way(String s){
        s.chars()
         .mapToObj(i -> (char)i)
         .forEach(System.out::println);
    }

    private static void printJava8WrongWay(String s){
        s.chars()
         .map(i -> (char) i)
         .forEach((s) -> System.out.print(s + " "));
    }

    public static void main(String[] args){
        String s = "hello";

        System.out.printf("\t----- Printing %s in Java 7 -----\n", s);
        printJava7Way(s);

        System.out.printf("\n\t----- Printing %s in Java 8 -----\n", s);
        printJava8Way(s);
    }
}
