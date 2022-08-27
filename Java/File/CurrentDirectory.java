package Java.File;

/**
 * Ways to access Current Working Directory
 * 
 * System.getProperty("user.dir") returns the current working directory
 * 
 * To access the path of the current package in main method we append
 * more specifics to the pathname; The directory started with the JVM.
 * Or relative to src folder. 
 * 
 * System.getProperty("user.dir") + "\\src\\main\\java\\" + "sample.txt"
 */
public class CurrentDirectory {
    
    public static void main(String[] args){
        // Get the Current Working Directory
        String currentDirectory = System.getProperty("user.dir");
        System.out.println(currentDirectory);

        String pathname = System.getProperty("user.dir") + "\\Java\\Java8\\Streams\\"
            + "Ozymandias.txt";   
        System.out.println(pathname);
    }
}
