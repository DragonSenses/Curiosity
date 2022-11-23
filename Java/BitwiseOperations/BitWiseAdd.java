package Java.BitwiseOperations;

/**
 * Adds two numbers using bitwise operations. 
 */
public class BitWiseAdd{

    public static int sum(int x, int y){
        int carry; 

        // Until there is no carry
        while (y != 0){
            // carry contains common set bits of x and y
            carry = x & y;

            // Sum of bits of x and y where at least one of the bits is not set
             x ^= y;     // x = x ^ y  (x = x XOR y)

            // Carry is shifted by one so adding it to x gives the sum
            y = carry << 1;
        }
        return x; 
    }

    public static int add(int x, int y){

        return x; 
    }

    public static void main(String[] args){
        System.out.println(sum(3,4));
    }
}