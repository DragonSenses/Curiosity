package Java.Challenges;

/**
 * A Bit flip is when changing one single bit to the opposite value.
 * Flipping a 1 --> 0 and 0 --> 1
 * 
 * Problem Statement: Take 3 integers, and take the minimum amount of
 * flips required to make the sum of the first two numbers equal the
 * third number. This program will return the least amount of shifts
 * required to do so.
 */
public class FlipCount {
    private static boolean debug = true;

    // Using Bitwise Operations
    // & operator - if two bits are 1, output is 1, else all 0's
    // ex. 0101 & 0011 = 0001 , 5 & 3 = 1

    // | operator - if two bits are 0, output is 0, else all 1's
    // ex. 1100 | 1010 = 1110 , 12 | 10 = 14

    // >> operator - Arithmetic (signed) right shift operator

    public static int countFlips(int x, int y, int z){
        int bitX, bitY, bitZ;
        int flips = 0;

        // Loop through the range of 0-31
        for(int i = 0; i < 32; i++){
            // 1. Shift each number by right by the iteration count
            // then use bitwise & by 1 to only attain the least
            // significant bit (as all other values are 0 except LSB of 1)
            bitX = ((x >> i) & 1);
            bitY = ((y >> i) & 1);
            bitZ = ((z >> i) & 1);

            if(debug) {
                System.out.println(bitX);
                System.out.println(bitY);
                System.out.println(bitZ);
            }

            // 2. Check if either bit of x or y equal to bit of Z
            // bitX | bitY = bitZ
            if((bitX|bitY) == bitZ){
                // 3. Further check if bitZ is 0
                if(bitZ == 0){
                    // 4. If bitX and bitY are both 1 
                    if(bitX == 1 && bitY ==1){
                        flips += 2;
                    } else {
                        flips += 1;
                    }
                } else{ // bitZ is 1
                    flips += 1;
                }
            }
            
        }

        return flips;
    }
    
    public static void main(String[] args){
        int x = 2; // 0010
        int y = 4; // 0100
        int z = 6; // 0110

        int i = 1; // Iteration

        System.out.println(Integer.toBinaryString(6));
        System.out.println(((x >> i) & 1));
        System.out.println(((y >> i) & 1));
        System.out.println(((z >> i) & 1));
        // System.out.println(countShifts(x,y,z));
        System.out.println("Flips required to make "
            + x + " and " + y + " equal to " + z + " is: " + countFlips(x,y,z));
    }
}
