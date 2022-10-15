package Java.Java8.Lambdas;

/**
 * Prefer Lambdas to Anonymous Classes. 
 */
public class LambdasOverAnonymous {
    
    private LambdasOverAnonymous() {} // prevent instantiation

    /* Sort a list of Strings in order of length */

    public static sortWithAnonymousClass(List<String> words){
        // Anonymous class instance as a function object - obsolete!
        Collections.sort(words, new Comparator<String>() {
            public int compare(String s1, String s2) {
                return Integer.compare(s1.length(), s2.length());
            }
        });
    } 
    
    public static void main(String[] args){

    }
}
