package Java.Challenges;

/**
 * Problem Statement: Take 3 integers, and take the minimum amount of
 * shifts required to make the sum of the first two numbers equal the
 * third number. This program will return the least amount of shifts
 * required to do so.
 */
public class ShiftCount {
    // Using Bitwise Operations

    public static int countShifts(int x, int y, int z){
        int shifts = 0;
        // Loop through the range of 0-31
        for(int i = 0; i < 32; i++){
            // & operator - if two bits are 1, output is 1, else all 0's
            // ex. 0101 & 0011 = 0001 , 5 & 3 = 1
            // | operator - if two bits are 0, output is 0, else all 1's
            // ex. 1100 | 1010 = 1110 , 12 | 10 = 14
        }

        return shifts;
    }
}
