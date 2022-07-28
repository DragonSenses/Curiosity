package Java.String;

public class StringProcess {
    
    
    public static void rename(String s, String toReplace){
        if(s.contains(toReplace)){
            s.replace(toReplace, "");
        }
    }

    
}
