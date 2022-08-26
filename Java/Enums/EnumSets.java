package Java.Enums;

import java.util.Arrays;
import java.util.EnumSet;

/**
 * EnumSets are another way to represent bit flags, in a more concise and
 * type safe manner. See BitFlags.java to see a traditional way. 
 */
public class EnumSets {
    public enum Flag { 
        UPPERCASE, REVERSE, PREFIX, SUFFIX;

        // Must defined EnumSet<> consisting of all constants in Flag type
        public static final EnumSet<Flag> ALL_OPTIONS = EnumSet.allOf(Flag.class);
    }
    
     private static final String prefix = "The ";
     private static final String suffix = " ====";
 
     public static String format(String val, EnumSet<Flag> flags){
         if(flags.contains(Flag.UPPERCASE)) val = val.toUpperCase();
 
         if(flags.contains(Flag.REVERSE)) {
             val = new StringBuffer(val).reverse().toString();
         }
 
         if(flags.contains(Flag.PREFIX)) { 
             val = prefix.concat(val);
         }
 
         if(flags.contains(Flag.SUFFIX)) { 
             val = val.concat(suffix);
         }
 
         return val;
     }
 
     // applies the EnumSet flags and returns an array of Strings
     public static String[] apply(String val){
         String[] arr = new String[6]; 
         arr[0] = val;
         arr[1] = format(val, EnumSet.of(Flag.UPPERCASE));
         arr[2] = format(val, EnumSet.of(Flag.REVERSE));
         arr[3] = format(val, EnumSet.of(Flag.PREFIX));
         arr[4] = format(val, EnumSet.of(Flag.SUFFIX));
         arr[5] = format(val, Flag.ALL_OPTIONS);
         return arr;
     }
 
     // Prints all values of a string array for more cleaner output
     public static void print(String[] arr){
        Arrays.stream(arr).forEach(System.out::println);
        System.out.println();
     }

     public static void main(String[] args){
         String index = "Index Librorum Prohibitorum";
         String codeName = "Dedicatus545";
 
         String[] indexes = apply(index);
         String[] codeNames = apply(codeName);
 
         print(indexes);
         print(codeNames);
     }
}
