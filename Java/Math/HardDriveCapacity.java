package Java.Math;

/**
 * Calculates the true hard drive capacity given its advertised space.
 * 
 * One of the things that always seemed vexing to me was the real capacity of a
 * hard drive was always different from how it was advertised. This deviation
 * would only increase greatly when dealing with larger hard drives. Take for
 * example a WD Book 10TB (advertised but misleading to most) would later only
 * have a true capacity of 9.09TB. A total 0.91TB is missing, almost a full 1TB
 * which certainly makes the cost/GB a bit tedious to calculate.
 * 
 * Why Real Hard Drive Capacity is less than Claimed Capcity?
 * The capacity discrepancy is not a form of collusion between the hard drive
 * manufacturers (a folly I surmised in my youth), but rather a difference
 * between which number systems are used. Operating Systems, like Windows, are
 * based on binary math which means storage is counted using base 2 whereas
 * the storage is advertised as base 10. 
 * 
 * To a computer system, a KB is 1024 bytes.
 * To a hard disk manufacturer, a KB is 1000 bytes.
 * 
 * Kilobyte (KB)  =  1024 Bytes
 * MegaByte (MB)  =  1024^2     =   1,048,576               Bytes = 1,024 Kilobytes
 * Gigabyte (GB)  =  1024^3     =   1,073,741,824           Bytes = 1,024 Megabytes
 * Terabyte (TB)  =  1024^4     =   1,099,511,627,776       Bytes = 1,024 Gigabytes
 * Petabyte (PB)  =  1024^5	    =   1,125,899,906,842,624
 * Exabyte  (EB)  =  1024^6	    =   1,152,921,504,606,846,976
 * Zettabyte (ZB) =  1024^7     =   1,180,591,620,717,411,303,424
 * Yottabyte (YB) =  1024^8 	=   1,208,925,819,614,629,174,706,176
 * 
 * Algorithm:
 * 1) Convert the value into bytes using base 10 by multiplying
 * the value by 1000, a certain number of times (based on the prefix)
 * 2) Divide the bytes by 1024 a certain number of times (based on the prefix)
 * 
 * // To do: 
 * - could reduce a for loop within calculate()
 * - Rounding to two decimal places
 */
public class HardDriveCapacity {

    static String convertBase(String n, int sourceBase, int destinationBase){
        return Integer.toString(Integer.parseInt(n, sourceBase), destinationBase);
    }

    /**
     * Here we round the value to return a more readable result.
     * Decided to round to two decimal places.
     * @param val value to round
     * @return  the value rounded to two decimal places
     */
    private static double round(double val){
        return Math.round(val*100.0)/100.0;   // Rounds to 2 decimal places
    }

    // Round value to 4 decimal places
    private static double round4(double val) {
        return Math.round(val*10000.0)/10000.0;
    }

    // Moves the value up two decimal places to represent percentage
    private static double percent(double val){
        return val*100.0;
    }

    /**
     * Calculates the true Hard Drive Capacity. A general method that repeats
     * the loop based on number of times parameter is passed in. 
     * @param bytes number of bytes in claimed capacity
     * @param times number of times to multiply by 10^3 and divide by 10^3
     */
    private static double calculate(double bytes, int times){
        for(int i = 0; i < times; i++){
            bytes *= 1000;
        }
        for(int i = 0; i < times; i++){
            bytes /= 1024;
        }
        return bytes;   
    }

    public static double convertGB(double bytes){
        for(int i = 0; i < 3; i++){
            bytes *= 1000;
        }

        for(int i = 0; i < 3; i++){
            bytes /= 1024;
        }

        return bytes;
    }

    /**
     * Returns the true hard drive capacity using the claimed capacity. 
     * @param bytes the number of bytes
     * @param prefix character before bytes, K for kilo, M for Mega, G for Giga
     * and T for Tera (soon support Petabyte); not-case sensitive
     * @return the true hard drive capacity converted form the claimed/advertised capacity
     */
    public static double convert(double bytes, char prefix) throws IllegalArgumentException {
        switch(prefix) {
            case 'K': case 'k': // Kilobyte, 1024 ^ 1
                return calculate(bytes, 1);
            case 'M': case 'm': // Megabyte, 1024 ^ 2
                return calculate(bytes,2);
            case 'G': case 'g': // Gigabyte, 1024 ^ 3
                return calculate(bytes,3);
            case 'T': case't': // Terabyte, 1024 ^ 4
                return calculate(bytes, 4);
            case 'P': case 'p': // Petabyte, 1024 ^ 5
                return calculate(bytes, 5);
            case 'E': case 'e': // Exabyte, 1024 ^ 6
                return calculate(bytes, 6);
            case 'Z': case 'z': // Zettabyte, 1024 ^ 7
                return calculate(bytes, 7);
            case 'Y': case 'y': // Yottabyte, 1024 ^ 8
                return calculate(bytes, 8); 
            case 'B': case 'b': // Brontobyte, 1024 ^ 9, theoretical, non-standardized
                return calculate(bytes, 9);
            default:
                throw new IllegalArgumentException("Not a viable prefix to bytes");
        }
    }

    /**
     * Find the deviation between claimed capacity and true hard drive capacity.
     * Formula: 2^n / 10^n = % deviation
     * @param bytes     number of bytes 
     * @param prefix    the prefix character before bytes, that determines what
     *                  power of 1024
     * @return  the percent deviation between claimed capacity and true capacity
     */
    static double deviation(double bytes, char prefix){
        double actualSpace = convert(bytes,prefix);
        return bytes/actualSpace;
    }

    /**
     * Outputs to the terminal the true hard drive capacity and deviation from  
     * @param bytes   In bytes, with prefix
     * @param prefix  The prefix character before bytes that determines what power of 1024
     */
    static void print(double bytes, char prefix){
        prefix = Character.toUpperCase(prefix);
        System.out.println("True Hard Drive capacity of [" 
            + bytes + " " + prefix +"B] is [" + round(convert(bytes,prefix)) 
            + " "+ prefix + "B]");

        double d = deviation(bytes,prefix);
        System.out.println("The deviation is " + d + " or " 
            + round(percent(round4(d-1))) + "%\n" );
    }

    public static void main(String[] args){
        // 64 GB should turn out to be 59.6 GB 
        print(64,'g');

        // Example 120 GB = 120,000MB, = 120,000,000KB = 120,000,000,000 bytes
        // 120,000,000,000 bytes / 1024 = 117,187,500 KB
        // 117,187,500 KB / 1024 = 114,440.91796875 MB
        // 114,440.91796875 MB / 1024 = 111.7587089538574 GB
        // 111.8 GB

        print(120,'g');
        print(500,'G');
        print(6,'t');
        print(10,'T');
    }
}
