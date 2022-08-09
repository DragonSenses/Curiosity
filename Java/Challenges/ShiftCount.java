package Java.Challenges;

/**
 * Problem Statement: Take 3 integers, and take the minimum amount of
 * shifts required to make the sum of the first two numbers equal the
 * third number. This program will return the least amount of shifts
 * required to do so.
 */
public class ShiftCount {
    private static boolean debug = true;

    // Using Bitwise Operations
    // & operator - if two bits are 1, output is 1, else all 0's
    // ex. 0101 & 0011 = 0001 , 5 & 3 = 1

    // | operator - if two bits are 0, output is 0, else all 1's
    // ex. 1100 | 1010 = 1110 , 12 | 10 = 14

    // >> operator - Arithmetic (signed) right shift operator

    public static int countShifts(int x, int y, int z){
        int bitX, bitY, bitZ;
        int shifts = 0;
        // Loop through the range of 0-31
        for(int i = 0; i < 32; i++){
            // 1. Shift each number by right by the iteration count
            // then use & operator by 1 to only attain the least
            // significant bit (as all other values are 0 except LSB of 1)
            bitX = ((x >> i) & 1);
            bitY = ((y >> i) & 1);
            bitZ = ((z >> i) & 1);

            if(debug) {
                System.out.println(bitX);
                System.out.println(bitY);
                System.out.println(bitZ);
            }

            // 2. Check if bitX | bitY = bitC

            // 3. If true check bitC 
            // 4. If bitA and bitB are both 1 
        }

        return shifts;
    }
    
    public static void main(String[] args){
        int x = 2; // 0010
        int y = 4; // 0100
        int z = 6; // 0110

        int i = 1;

        System.out.println(Integer.toBinaryString(6));
        System.out.println(((x >> i) & 1));
        System.out.println(((y >> i) & 1));
        System.out.println(((z >> i) & 1));
        // System.out.println(countShifts(x,y,z));

    }
}
