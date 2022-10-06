package Java.Enums;

import java.util.EnumSet;

/**
 * 
 * This file serves as a Template for future classes that will implement EnumSet
 * which is designed specifically to replace bit flags. 
 * 
 */
public class EnumSetFlagsTemplate {

    enum Flags {
        Left, Top, Right, Bottom
    }

    public static void execute(EnumSet<Flags> flags){
        if(flags.contains(Flags.Left)) {
            System.out.println("Left");
        }
        if(flags.contains(Flags.Right)) {
            System.out.println("Right");
        }
        if(flags.contains(Flags.Top)) {
            System.out.println("Top");
        }
        if(flags.contains(Flags.Bottom)) {
            System.out.println("Bottom");
        }
    }

    public static void main(String[] args) {
        EnumSet<Flags> allOptions = EnumSet.allOf(Flags.class); 
        execute(allOptions);

        EnumSet<Flags> currentOpt = EnumSet.of(Flags.Right);
        execute(currentOpt);
    }
}
