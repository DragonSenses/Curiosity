package Java.PassByValue;

/**
 * Class demonstrates the difference between passing a Mutable object reference
 * and an Immutable object reference, StringBuilder and String respectively.
 */
public class DragonWarrior {
   
    /**
     * This method does 3 things to observe the differences between object references,
     * whether they are mutable or immutable.
     * 
     * 1. We append "Knight" to the warriorProfession, mutable StringBuilder reference
     * 2. We concatenate "Dragon " to the weapon, immutable String reference
     * 3. Set both references to null; this only changes the local references (within the method)
     * 
     * @param warriorProfession - A Mutable StringBuilder reference
     * @param weapon - A Immutable String Reference
     */
    static void changeWarriorClass(StringBuilder warriorProfession, String weapon) {
        // mutable object StringBuilder so underlying object will be changed
        warriorProfession.append("Knight"); 

        // immutable local String variable "weapon" will refer to "Dragon Sword"
        // But real object will never be changed, since String is immutable and its
        // attributes are final
        weapon = "Dragon " + weapon;

        // Local Variables (within method instance) now point to null
        // Pass null to variables but not to objects
        // Objects will remain the same as long as they are still accessible
        // externally, ex. via main method
        weapon = null;
        warriorProfession = null;
    }

    // Multiple Choice, which will it Print out?
    // A: Warrior=null              Weapon=null
    // B: Warrior=Dragon            Weapon=Dragon
    // C: Warrior=Dragon Knight     Weapon=Dragon Sword
    // D: Warrior=Dragon Knight     Weapon=Sword
    public static void main(String[] args) {
        StringBuilder warriorProfession = new StringBuilder("Dragon ");
        String warriorWeapon = "Sword";
        // We pass in "Dragon " , "Sword "
        changeWarriorClass(warriorProfession, warriorWeapon);

        System.out.print("Warrior = " + warriorProfession);
        System.out.println("\t\tWeapon  = " + warriorWeapon);


        // Answer: warriorProfession changes as it StringBuilder is mutable,
        //         but warriorWeapon does not as it String is Immutable so
        // Output: 
        // warriorProfession = Dragon Knight
        // warriorWeapon = Sword

    }// end of Main

}// end of Class
