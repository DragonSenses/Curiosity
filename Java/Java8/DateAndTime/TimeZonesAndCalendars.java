package Java.Java8.DateAndTime;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;        // new
import java.util.EnumSet;
import java.util.Set;
import java.util.TimeZone;      // old

/**
 * The new java.time.ZoneId class, part of the new Date and Time API, aims to
 * better shield you from the complexities related to time zones, such as 
 * dealing with Daylight Saving Time (DST). Just like other Date-Time classes
 * ZoneId class is immutable.
 * 
 * java.time.ZoneId replaces java.util.TimeZone class
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
 * When you have a ZoneId object, you can combine it with a LocalDate, a 
 * LocalDateTime, or an Instant to transform it into ZonedDateTime instances,
 * which represent points in time relative to the specified time zone
 * ================================= Summary =================================
 * (1) Get the ZoneId of a particular timezone
 * (2) Convert an old TimeZone object to a ZoneId
 * (3) Applying Time Zone to a Point in Time, creating ZonedDateTime
 * (4) 
 * ================================= Methods ==================================
 * - ZoneId.of("{area}/{city}") - static factory method that returns the ZoneId
 * of the passed in area and city
 * - getRules() - used on a ZoneId to obtain rules for that time zone
 * - toZoneId() - Converts an old TimeZone object to a ZoneId 
 */
public class TimeZonesAndCalendars {
    
    /**
     * (1) Get the ZoneId of a particular timezone
     */
    public static void getZoneId() {
        System.out.println("------- Getting ZoneId -------");
        ZoneId romeZone = ZoneId.of("Europe/Rome");
        System.out.println("ZoneId of Europe/Rome is " + romeZone);
        
        System.out.println("ZoneId of Europe/Paris is " 
            + ZoneId.of("Europe/Paris"));

        System.out.println("\n------- Get Rules of ZoneId -------");   
        // System.out.println(ZoneId.getAvailableZoneIds());
        // System.out.println("ZoneId of Europe/Paris is " + ZoneId.of("Europe/Paris"));
        System.out.println(romeZone.getRules());

        System.out.println("\n------- List of US ZoneIds -------");
        // Get the Set of ZoneIds   
        Set<String> zones = ZoneId.getAvailableZoneIds();
        // Stream and select only US 
        zones.stream().filter(s -> s.contains("US")).forEach(System.out::println);
       
    }

    /**
     * (2) Convert an old TimeZone object to a ZoneId
     */
    public static void convertTimeZoneToZoneId(){
        System.out.println("\n------- Converting TimeZone to ZoneId -------");
        ZoneId zoneId = TimeZone.getDefault().toZoneId(); 

        System.out.println("TimeZone.getDefault().toZoneId yields:\t" + zoneId);
    }

    /**
     * (3) Applying Time Zone to a Point in Time, creating ZonedDateTime
     */
    public static void applyZoneIdToPointInTime(){
        LocalDate date = LocalDate.of(2014, Month.MARCH, 18);
       
    }

    enum Options {
        ZoneId, Top, Right, Bottom
    }

    // Controls the Output in main
    public static void execute(EnumSet<Options> options){
        if(options.contains(Options.ZoneId)) {
            System.out.println("\t========= ZoneId =========\t");
            getZoneId();
            convertTimeZoneToZoneId();
        }
        if(options.contains(Options.Right)) {
            System.out.println("\t========= Applying ZoneId to Point in Time =========\t"); 
            applyZoneIdToPointInTime();
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
} // end of Class