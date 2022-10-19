package Java.String;

/**
 * Discovered that Java does not support a char stream. Java is an "impure" 
 * Object-Oriented language, since the primitives are not objects. Primitives
 * was a pragmatic decision to improve performance at the expense of object
 * -oriented purity. When Streams API was introduced, only some primitives 
 * were supported (int, long, double ...) to reduce the amount of clutter to
 * the API. The designers did not want to support all of the primitives, 
 * "All" or "none" are comfortable places for a design to be, yet neither was
 * acceptable. So they had to find a reasonable value of "some", which ended up
 * with primitive specializations for int, long, and double. 
 * 
 * A CharStream primitive specialization was considered but rejected since its
 * use would be quite narrow compared to the amount of builk it added to the API.
 * 
 * So the designers chose the pragmatic choice of providing a subset of primitive
 * specializations, giving a moderately sized, high performing API that imposes a
 * relatively small burden on callers in a fairly narrow range of use cases (char processing).
 * 
 * Source: https://stackoverflow.com/questions/22435833/why-is-string-chars-a-stream-of-ints-in-java-8
 * 
 * Here we explore a way to be able to use the API in spite of this. 
 * 
 * As we know, the method String.chars() returns a stream of ints or IntStream
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

    public static void main(String[] args){
        String s = "hello";

        System.out.printf("\t----- Printing %s in Java 7 -----\n", s);
        printJava7Way(s);

        System.out.printf("\n\t----- Printing %s in Java 8 -----\n", s);
        printJava8Way(s);

        System.out.printf("\n\t----- Printing %s the Wrong Way in Java 8 -----\n", s);
        printJava8WrongWay(s);
 
    } // end of Main
} // end of Class
