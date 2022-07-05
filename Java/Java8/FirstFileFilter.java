package Java.Java8;
import java.io.File;
import java.io.FileFilter;

public class FirstFileFilter {
    /*
     * Method references
     * method reference::syntax  (meaning "use this method as a value")
     * 
     * Problem: Filter all the hidden files in a directory
     */
    // Pre-Java 8 Way
    File[] hiddenFiles = new File(".").listFiles(new FileFilter() {
        public boolean accept(File file) {
            return file.isHidden();
        }
    });

    // Java 8 Way
    File[] hiddenFiles2 = new File(".").listFiles(File::isHidden);

}
