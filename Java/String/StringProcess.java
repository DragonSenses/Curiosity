package Java.String;

public class StringProcess {
    
    
    public static void rename(String s, String toReplace){
        if(s.contains(toReplace)){
            s.replace(toReplace, "");
        }
    }

    public static void lowercase(String s) {
        s.toLowerCase();
    }

    public static void uppercase(String s) {
        s.toUpperCase();
    }

    public static void main(String[] args){
        String s = "Overlord";
        rename(s,"Over");
        System.out.println(s);
    }
}
