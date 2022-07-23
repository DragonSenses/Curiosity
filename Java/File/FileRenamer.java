package Java.File;
import java.io.File;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
// import java.util.LinkedList;
// import java.util.Stack;
import java.util.List;

public class FileRenamer {
    
    public static void initialize(){

    }

    /**
     * Gets the directories at the incoming parameter pathname.
     * @param pathname  The name of the directory to look in
     */
    public static File[] getDirectories(String pathname) {
        File[] directories = new File(pathname).listFiles(File::isDirectory);
        return directories;
    }

    /**
     * Gets all the directories recursively, rooted at the directory pathname
     * @param pathname Name of directory to look in
     * @return A Stack of Directories
     */
    public static Deque<File> getAllDirectories(String pathname){
        Deque<File> folders = new ArrayDeque<File>(); 
        File[] directory = getDirectories(pathname);
        List<File> list = Arrays.asList(directory);
        // Arrays.stream(arr).collect(Collectors.toList())
        if(list.isEmpty()) { 
            
        }
        return folders;
    }

    public static void main(String[] args) {
        System.out.println("#####################################");
        File[] directories = getDirectories(".");

        System.out.println("Here are the list of directories:");
        for(File directory: directories){
            System.out.println(directory.getPath());
        }
    }
}
