package Java.File;
import java.io.File;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
// import java.util.LinkedList;
// import java.util.Stack;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;

public class FileRenamer {
    // This will Determine what each file ID will be
    public static int ID = 0;
    // Root
    //     Folder1
    //     Folder2
    //       Folder3
    //     Folder4
    //          Folder5
    //              Folder6

    // ID     ParentID     Name
    // 0000   NULL           ROOT
    // 0001   0000           Folder1
    // 0002   0000           Folder2
    // 0003   00000002       Folder3
    // 0004   0000           Folder4
    // 0005   00000004       Folder5
    // 0006   000000040005   Folder6

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

    public static TreeMap<Integer,File> getAllDirectoriesTree(TreeMap<Integer,File> t, String pathname){
        TreeMap<Integer, File> folders = new TreeMap<>();
        File[] directories = new File(pathname).listFiles(File::isDirectory);
        for(int i = 0; i < directories.length-1; i++){
            folders.put(ID++,directories[i]);
        }
        Set<Integer> keys = folders.keySet();
        for(Integer key: keys){
            getAllDirectoriesTree(folders,folders.get(key).getPath());
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
