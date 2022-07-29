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

    /**
     * Extracts and Prints out every word split by space within a
     * String s
     * @param s the String to extract from
     * @return string array containing every word split by space within s
     */
    public String[] extractWordsSplitBySpace(String s){
        String[] result = s.split(" ");
        for(int i = 0; i!=s.length(); i++) {
            System.out.println(result[i]);
        }
        return result;
    }

    public static void main(String[] args){
        String s = "Overlord";
        rename(s,"Over");
        System.out.println(s);
        System.out.println(s.replace("Over",""));
        System.out.println(s);

        String st = "       Overlord        ";
        System.out.println(st);
        System.out.println(st.trim());
    }
}
