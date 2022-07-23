package Java.File;
import java.io.File;

public class FileRenamer {
    
    public static void initialize(){

    }

    /**
     * Gets the directories rooted at the incoming parameter pathname.
     * @param pathname
     */
    public static File[] getDirectories(String pathname) {
        File[] directories = new File(pathname).listFiles(File::isDirectory);
        return directories;
    }

    public static void main(String[] args) {
        System.out.println("Here are the list of directories:");
        File[] directories = getDirectories(".");

        System.out.println("Here are the list of directories:");
        for(File directory: directories){
            System.out.println(directory.getPath());
        }
    }
}
