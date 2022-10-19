package Java.String;

import java.util.stream.IntStream;
import java.util.stream.Stream;

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
 * 
 * ================================= Summary =================================
 * (1) Use mapToObj(i -> (char)i) rather than map() to obtain Stream<Character>
 * (2) Converting String to Stream, and Stream to String
 * (3) 
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
         .map(i -> (char) i)            // map() will still end off with IntStream       
         .forEach(System.out::println);
    }

    private static IntStream stringToIntStream(String string){
        return  string.chars().mapToObj(i -> (char)i);
    }

    private static String intStreamToString(Stream<Object> stream){
        stream.reduce(StringBuilder::new, (sb, c) -> sb.append((char)c)),
                      StringBuilder::append).toString();
    }

    public static void main(String[] args){
        String s = "hello";

        System.out.printf("\t----- Printing %s in Java 7 -----\n", s);
        printJava7Way(s);

        System.out.printf("\n\t----- Printing %s in Java 8 -----\n", s);
        printJava8Way(s);

        System.out.printf("\n\t----- Printing %s the Wrong Way in Java 8 -----\n", s);
        printJava8WrongWay(s);
    }
}
