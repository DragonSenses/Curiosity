package Java.Enums;

import java.util.EnumSet;

/**
 * 
 * This file serves as a Template for future classes that will implement EnumSet
 * which is designed specifically to replace bit flags. 
 * 
 */
public class EnumSetTemplate {
    
    enum Options {
        Left, Top, Right, Bottom
    }

    public static void execute(EnumSet<Options> options){
        if(options.contains(Options.Left)) {
            System.out.println("Left");
        }
        if(options.contains(Options.Right)) {
            System.out.println("Right");
        }
        if(options.contains(Options.Top)) {
            System.out.println("Top");
        }
        if(options.contains(Options.Bottom)) {
            System.out.println("Bottom");
        }
    }

    public static void main(String[] args) {
        EnumSet<Options> allOptions = EnumSet.allOf(Options.class); 
        execute(allOptions);

        EnumSet<Options> currentOpt = EnumSet.of(Options.Right);
        execute(currentOpt);
    }
}
