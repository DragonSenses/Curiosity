package Java.Java8.DateAndTime;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.OffsetDateTime;
import java.time.ZoneId;        // new
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.Chronology;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.chrono.JapaneseDate;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAdjusters;
import java.util.EnumSet;
import java.util.Locale;
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
 * which represent points in time relative to the specified time zone. 
 * 
 * ZonedDateTime has LocalDate, LocalTime, and ZoneId as its components. 
 * 
 * ZoneOffset class, a subclass of ZoneId that represents the difference 
 * between a time and the zero meridian of Greenwich, London. 
 * 
 * Another common way to express a time zone is to use a fixed offset from 
 * UTC/Greenwich. Be aware that ZoneOffset does not have any Daylight Saving
 * Time management, and for this reason, isn't suggested in the majority of
 * cases. Because ZoneOffset is also a ZoneId, one can apply it to a point in
 * time. Can also create OffsetDateTime, which represents a date-time with an
 * offset from UTC/Greenwich in the ISO-8601 calendar system. 
 * 
 * ------- Calendar Systems --------
 * The ISO-8601 calendar system is the de facto world civil calendar system.
 * 
 * Java 8 includes four additional calendar systems. Each of these calendar systems
 * has a dedicated date class: ThaiBuddhistDate, MinguoDate, JapaneseDate,
 * and Hijrah-Date. All these classes, together with LocalDate, implement the
 * ChronoLocalDate interface, which is intended to model a date in an
 * arbitrary chronology. You can create an instance of one of these classes
 * out of a LocalDate. More generally, you can create any other Temporal
 * instance by using their from static factory methods.
 * 
 * Alternatively, can explicitly create a calendar system for a specific Locale
 * and create an instance of a date for that Locale. Using the Chronology 
 * interface models a calendar system, and you can obtain an instance of it by
 * using ofLocale() static factory method. However, designers of Date & Time
 * API advise using LocalDate instead of ChronoLocalDate for most cases, because
 * a developer could make assumptions in his code that unfortunately aren't
 * true in a multicalendar system. Such assumptions might include believing
 * that a value of a day or month will never be higheer than 31, or that a 
 * year contains 12 months, or even that a year has a fixed number of months. 
 * 
 * Recommended to use LocalDate throughout your application, including all 
 * storage, manipulation, and interpretation of business rules, whereas you 
 * should employ ChronoLocalDate only when you need to localize the input or
 * output of your program. 
 * ================================= Summary =================================
 * (1) Get the ZoneId of a particular timezone
 * (2) Convert an old TimeZone object to a ZoneId
 * (3) Applying Time Zone to a Point in Time, creating ZonedDateTime
 * (4) Using ZoneOffset class and OffsetDateTime.
 * (5) Using alternative Calendar Systems
 * ================================= Methods ==================================
 * - ZoneId.of("{area}/{city}") - static factory method that returns the ZoneId
 * of the passed in area and city
 * - getRules() - used on a ZoneId to obtain rules for that time zone
 * - toZoneId() - Converts an old TimeZone object to a ZoneId 
 * 
 * ZoneOffSet
 * -ZoneOffSet.of() - static factory method that creates a ZoneOffset object.
 * Passing in "-05:00" offset corresponds to U.S. Eastern Standard Time
 * 
 * Calendar Systems (i.e. JapaneseDate)
 * -from() - static factory method that creates an  Temporal instance of a
 * particular calendar system out of a LocalDate passed in as a parameter
 * 
 * Chronology Interface
 * -Chronology.ofLocale() - creates an instance of a calendar system of the 
 * Locale passed in as a parameter
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
        // Get the Set of Zone Ids, Stream and select only US TimeZones 
        ZoneId.getAvailableZoneIds()
              .stream()
              .filter(s -> s.contains("US"))
              .forEach(System.out::println);
    }

    /**
     * (2) Convert an old TimeZone object to a ZoneId
     */
    public static void convertTimeZoneToZoneId(){
        System.out.println("\n------- Converting an Old TimeZone-Object to ZoneId-Object -------");
        ZoneId zoneId = TimeZone.getDefault().toZoneId(); 

        System.out.println("TimeZone.getDefault().toZoneId yields:\t" + zoneId);
    }

    /**
     * (3) Applying Time Zone to a Point in Time, creating ZonedDateTime
     */
    public static void applyZoneIdToPointInTime(){
        ZoneId seoulZone = ZoneId.of("Asia/Seoul");

        LocalDate date = LocalDate.now();
        ZonedDateTime zdt1 = date.atStartOfDay(seoulZone);

        LocalDateTime dateTime = LocalDateTime.of(2014, Month.MARCH, 18, 13, 45);
        ZonedDateTime zdt2 = dateTime.atZone(seoulZone);
        
        Instant instant = Instant.now();
        ZonedDateTime zdt3 = instant.atZone(seoulZone);

        System.out.println("Local Date:\t" + date);
        System.out.println("ZonedDateTime:\t" + zdt1);

        System.out.println("\nLocalDateTime:\t" + dateTime);
        System.out.println("ZonedDateTime:\t" + zdt2);

        System.out.println("\nInstant:\t" + instant);
        System.out.println("ZonedDateTime:\t" + zdt3);

        System.out.println("\n------- Converting LocalDate to Instant using ZonedDateTime -------");
        Instant instantFromDateTime = date.atStartOfDay(seoulZone).toInstant();
        System.out.println("Date: " + date + "\nZonedDateTime: " + date.atStartOfDay(seoulZone) 
            +"\nInstant: " + instantFromDateTime);

        System.out.println("\n------- Converting Instant to LocalDateTime using ZoneId -------");
        instant = Instant.now();
        LocalDateTime timeFromInstant = LocalDateTime.ofInstant(instant, seoulZone);
        System.out.println("Instant: " + instant + ",\t" + "LocalDateTime:\t" + timeFromInstant);   
    }

    /**
     * (4) Using ZoneOffset class and OffsetDateTime.
     */
    public static void useZoneOffSet(){
        // To express a time zone by a fixed offset from UTC/Greenwich 
        System.out.println("New York is five hours behind London");
        ZoneOffset newYorkOffset = ZoneOffset.of("-05:00");

        System.out.println("New York Offset is " + newYorkOffset);

        System.out.println("\n------- Creating OffsetDateTime -------");
        LocalDateTime dateTime = LocalDateTime.of(2014, Month.MARCH, 18, 13, 45);
        OffsetDateTime dateTimeInNewYork = OffsetDateTime.of(dateTime, newYorkOffset);

        System.out.println("Date Time:\t\t" + dateTime);
        System.out.println("Offset Date Time:\t" + dateTimeInNewYork);

    }

    /**
     * (5) Using alternative Calendar Systems
     * Can create an instance of one of these classes out of LocalDate, and 
     * using the from() static factory method.
     * Alternatively, can explicitly create a calendar system for a specific
     * Locale and create an instance of a date for that Locale. In Date & Time
     * API, the Chronology interface models a calendary system, can obtain an
     * instance of it by using its ofLocale() static factory method
     */
    public static void useAlternativeCalendarSystem(){
        System.out.println("\n------- Creating a LocalDate instance of an Alternative Calendar System -------");
        LocalDate date = LocalDate.of(2014, Month.MARCH, 18);
        JapaneseDate japaneseDate = JapaneseDate.from(date);

        System.out.println("Date:\t\t" + date);
        System.out.println("Japanese Date:\t" + japaneseDate);

        System.out.println("\n------- Explicitly creating a calendar system for a specific Locale -------");
        // Create Calendar System from Locale through factory method ofLocale()
        // Then Obtain an instance of a date for that Locale
        Chronology japaneseChronology = Chronology.ofLocale(Locale.JAPAN);
        ChronoLocalDate now = japaneseChronology.dateNow();

        System.out.println("Chronology.ofLocale(Locale.JAPAN)");
        System.out.println("ChronoLocalDate: " + now);
    }

    /**
     * HijarahDate (Islamic calendar) seems to be the most complex as it can
     * have variants. The Hijrah calendar system is based on lunar months. There
     * are a variety of methods to determine a new month, such as a new moon that
     * could be visible anywhere in the world or that must be visible first in
     * Saudi Arabia. The withVariant method is used to choose the desired variant.
     * Java 8 includes the Umm Al-Qura variant for HijrahDate as standard.
     * 
     * The following code illustrates an example of displaying the start and end
     * dates of Ramadan for the current Islamic year in ISO date.
     */
    public static void usingIslamicCalendar(){
        System.out.println("\n------- Islamic Calendar -------");
        // Get the current Hijrah date; then change it to have the first day
        // of Ramadan, which is the ninth month
        HijrahDate ramadanDate =
            HijrahDate.now().with(ChronoField.DAY_OF_MONTH, 1)
                            .with(ChronoField.MONTH_OF_YEAR, 9);

        // Ramadan  1438 started on 2017-05-26 and ended on 2017-06-24.
        // IsoChronology.INSTANCE is a static instance of the IsoChronology class.
        System.out.println("Ramadan starts on " +
                            IsoChronology.INSTANCE.date(ramadanDate) +
                            " and ends on " +
                            IsoChronology.INSTANCE.date(
                                ramadanDate.with(
                                    TemporalAdjusters.lastDayOfMonth())));
    }

    enum Options {
        ZoneId, ZonedDateTime, ZoneOffSet, AlternativeCalendarSystem
    }

    // Controls the Output in main
    public static void execute(EnumSet<Options> options){
        if(options.contains(Options.ZoneId)) {
            System.out.println("\t========= ZoneId =========\t");
            getZoneId();
            convertTimeZoneToZoneId();
        }
        if(options.contains(Options.ZonedDateTime)) {
            System.out.println("\n\t====== Applying ZoneId to Point in Time ======\t"); 
            applyZoneIdToPointInTime();
        }
        if(options.contains(Options.ZoneOffSet)) {
            System.out.println("\n\t==== Representing Timezones through ZoneOffset ====\t"); 
            useZoneOffSet();
        }
        if(options.contains(Options.AlternativeCalendarSystem)) {
            System.out.println("\n\t====== Using Alternative Calendar Systems ======\t"); 
            useAlternativeCalendarSystem();
            usingIslamicCalendar();
        }
    }

    public static void main(String[] args) {
        EnumSet<Options> allOptions = EnumSet.allOf(Options.class); 
        execute(allOptions);
    } 
} // end of Class