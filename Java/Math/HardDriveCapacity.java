package Java.Math;
// Work In progress
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
 * Kilobyte (KB) = 1,024 Bytes
 * MegaByte (MB) = 1,024 Kilobytes or 1,048,576 Bytes
 * Gigabyte (GB) = 1,024 Megabytes or 1,073,741,824 Bytes
 * Terabyte (TB) = 1,024 Gigabytes or 1,099,511,627,776 Bytes
 * 
 * Algorithm:
 * 1) Convert the value into bytes using base 10 by multiplying
 * the value by 1000, a certain number of times (based on the prefix)
 * 2) Divide the bytes by 1024 a certain number of times (based on the prefix)
 * 
 * Better Algorithm:
 * 1) Convert number from base 10 to base 2
 */
public class HardDriveCapacity {

    static String convertBase(String n, int sourceBase, int destinationBase){
        return Integer.toString(Integer.parseInt(n, sourceBase), destinationBase);
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
     * @return
     */
    public static double convert(double bytes, char prefix){
        return 0;
    }

    public static void main(String[] args){
        // 64 GB should turn out to be 59.6 GB 
        System.out.println(convertGB(64) +" GB");
        System.out.println(convertBase("64",10,2));
        // Example 120 GB = 120,000MB, = 120,000,000KB = 120,000,000,000 bytes
        // 120,000,000,000 bytes / 1024 = 117,187,500 KB
        // 117,187,500 KB / 1024 = 114,440.91796875 MB
        // 114,440.91796875 MB / 1024 = 111.7587089538574 GB
        // 111.8 GB

    }
}
