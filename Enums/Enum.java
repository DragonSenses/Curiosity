package Enums;


/**
 * Enum Types, an elegant approach to representing choices from a finite set by 
 * defining what is known as an enumerated type (enum). These are types that are 
 * only allowed to take on values that come from a specified set of names
 * 
 * Declaration:
 *  modifier enum name {valueName1, valueName2, ..., valueNameN-1};
 * -modifier : blank, public, protected, private
 * -Java Convention is the valueNames should usually be capitalized words
 * 
 * @author kendr
 */
public class Enum {
    // Once defined, Day can be an official type and we may declare variables or parameters
    // with type Day
    public enum Day { 
        MON, TUE, WED, THU, FRI, SAT, SUN
    }

    // Day today = Day.TUE; // assignment of a value to the variable of type Day
    Day day;
    
    public Enum(Day day) {
        this.day = day;
    }

    // We can use a switch statement to go through a finite set of choices
    public void whatDayIsItToday() {
        switch (day) {
            case MON:
                System.out.println("Mondays are the start.");
                break;
                    
            case FRI:
                System.out.println("Fridays are good.");
                break;
                         
            case SAT: case SUN:
                System.out.println("Weekends are great.");
                break;
                        
            default:
                System.out.println("Midweek days are ok");
                break;
        }
    }

    public enum Fruit { 
        APPLE, BANANA, STRAWBERRY, BLUEBERRY, WATERMELON, MANGO, TOMATO
    }

    Fruit fruit;

    public Enum(Fruit fruit){
        this.fruit = fruit;
    }

    public void thatImEating() {
        switch (fruit) {
            case APPLE:
            System.out.println("Apples are the most user-friendly fruit");
            break;
                
        case BANANA:
            System.out.println("Bananas are my go-to fruit");
            break;
                     
        case STRAWBERRY: case BLUEBERRY:
            System.out.println("Berries are such a treat");
            break; 
        
        case TOMATO:
            System.out.println("Tomatoes on salads are great");
            break;
                    
        default:
            System.out.println("Tropical Fruits are tasty!");
            break;
        }
    }

    public static void main(String[] args) {
        Enum firstDay = new Enum(Day.MON);
        firstDay.whatDayIsItToday();
        Enum thirdDay = new Enum(Day.WED);
        thirdDay.whatDayIsItToday();
        Enum fifthDay = new Enum(Day.FRI);
        fifthDay.whatDayIsItToday();
        Enum sixthDay = new Enum(Day.SAT);
        sixthDay.whatDayIsItToday();
        Enum seventhDay = new Enum(Day.SUN);
        seventhDay.whatDayIsItToday();

        System.out.println();

        Enum apple = new Enum(Fruit.APPLE);
        apple.thatImEating();
        Enum banana = new Enum(Fruit.BANANA);
        banana.thatImEating();
        Enum berry = new Enum(Fruit.BLUEBERRY);
        berry.thatImEating();
        Enum tomato = new Enum(Fruit.TOMATO);
        tomato.thatImEating();
        Enum mango = new Enum(Fruit.MANGO);
        mango.thatImEating();
    }


} // end of Class Enum