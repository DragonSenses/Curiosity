package Java.File;

import java.io.File;

/**
 * Computes the total size on disk within a file system
 */
public class FileSpace {
    
    /**
     * Calculates the total disk space (in bytes) of the portion of the file 
     * system rooted at the given path
     * @param root The starting directory in the file system to calculate at
     * @return total number of bytes used by the portion of the file system
     */
    public static long computeSpace(File root) {
        long space = root.length();     // Start with the disk space used by root
        // 1. Check if root is Directory
        if(root.isDirectory()) {
            // 2. For each path name within the directory
            for (String name : root.list()) {
                // 3. Count up the total space usage of each child
                File child = new File(root, name); // Create full path to child
                space += computeSpace(child);      // Recur child and add space usage
            }
        }

        System.out.println(space + "\t" + root);    // Output
        return space;                               // Return total space used
    }

    public static void main(String[] args){
        
    }
}
