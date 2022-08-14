package Java.ASCII;

/**
 * Prints out a String Representation of the ASCII Table, 2^7, values 0-127
 * 
 * Note: [0-9] is 48-57, [A-Z] is 65-90, [a-z] is 97-122
 * 

 */
public class AsciiTable {

    StringBuilder table = new StringBuilder(
            String.format("%1$-8s %2$-10s %3$s\n", "Decimal", "ASCII", "Hex"));

    public StringBuilder getTable(){
        return table;
    }



    public static void buildTable(StringBuilder table){
        char c;
        // Loop from 0 to 127
        for (int i = 0; i < 128; i++){
            // Typecast i into char
            c = (char) i;

        }
    }

    public static void main(String[] args) {
        // for (int c = 32; c < 128; c++) {
        //     System.out.println(c + ": " + (char) c);
        // }
        
        AsciiTable a = new AsciiTable();
        StringBuilder table = a.getTable();
        buildTable(table);
        System.out.println(table.toString());
    }
}
