package Java.Java8.DateAndTime;

import java.util.EnumSet;

/**
 * The new java.time.ZoneId class, part of the new Date and Time API, aims to
 * better shield you from the complexities related to time zones, such as 
 * dealing with Daylight Saving Time (DST). Just like other Date-Time classes
 * ZoneId class is immutable. 
 * 
 * A time zone is a set of rules corresponding to a region in which the
 * standard time is the same. About 40 time zones are held in instances of the
 * ZoneRules class. You can call getRules() on a ZoneId to obtain the rules
 * for that time zone.
 * 
 * A specific ZoneId is identified by a region ID. All the region IDs are in
 * the format "{area}/{city}", and the set of available locations is the one
 * supplied by the Internet Assigned Numbers Authority (IANA) Time Zone
 * Database (see https://www.iana.org/time-zones).
 * 
 * You can also convert an old TimeZone object to a ZoneId by using the new
 * method toZoneId:
 * ================================= Summary =================================
 * (1) Get the ZoneId of a particular timezone
 * (2) Convert an old TimeZone object to a ZoneId
 * (3) 
 * (4) 
 * ================================= Methods ==================================
 * - ZoneId.of("{area}/{city}") - static factory method that returns the ZoneId
 * of the passed in area and city
 * - toZoneId() - Converts an old TimeZone object to a ZoneId 
 */
public class TimeZonesAndCalendars {
    
    /**
     * 
     */
    public static void getZoneId() {
        System.out.println("\n------- Getting ZoneId -------");
        ZoneId romeZone = ZoneId.of("Europe/Rome");

        
    }

    enum Options {
        Left, Top, Right, Bottom
    }

    // Controls the Output in main
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
        // EnumSet<Options> allOptions = EnumSet.allOf(Options.class); 
        // execute(allOptions);

        EnumSet<Options> currentOpt = EnumSet.of(Options.Right);
        execute(currentOpt);
    }
