package Java.Java8.DateAndTime;

import java.util.EnumSet;

/**
 * The new java.time.ZoneId class, part of the new Date and Time API, aims to
 * better shield you from the complexities related to time zones, such as 
 * dealing with Daylight Saving Time (DST). Just like other Date-Time classes
 * ZoneId class is immutable. 
 * 
 * ================================= Summary =================================
 * (1) 
 * (2) 
 * (3) 
 * (4) 
 * ================================= Methods ==================================
 * - 
 */
public class TimeZonesAndCalendars {
    
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
