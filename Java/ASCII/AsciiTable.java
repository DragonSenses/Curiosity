package Java.ASCII;

/**
 * Prints out a String Representation of the ASCII Table, 2^7, values 0-127
 * 
 * Note: [0-9] is 48-57, [A-Z] is 65-90, [a-z] is 97-122
 * 
 * ======================== String formatting ========================
 * Syntax: %[parameter][flags][width][.precision][length]type
 * -n$ 	n is the number of the parameter to display using this format specifier,
 *  allowing the parameters provided to be output multiple times, using varying
 *  format specifiers or in different orders. If any single placeholder
 *  specifies a parameter, all the rest of the placeholders MUST also specify
 *  a parameter.
 *  For example, printf("%2$d %2$#x; %1$d %1$#x",16,17) produces 17 0x11; 16 0x10.
 * 
 * - Flags Field 
 * "-" (minus)  	Left-align the output of this placeholder. 
 *                  (The default is to right-align the output.)   
 * 
 * "+" (plus)       Prepends a plus for positive signed-numeric types.
 *                  positive = +, negative = -.
 *                  (The default doesn't prepend anything in front of positive numbers.)
 * 
 * " " (space)      Prepends a space for positive signed-numeric types. positive =  ,
 *                  negative = -. This flag is ignored if the + flag exists.
 *                  (The default doesn't prepend anything in front of positive numbers.)
 * 
 * "0" (zero)       When the 'width' option is specified, prepends zeros for numeric types. 
 *                  (The default prepends spaces.) 
 *                  For example, printf("%4X",3) produces    3, while printf("%04X",3) produces 0003.
 * 
 * "'"(apostrophe)  The integer or exponent of a decimal has the thousands grouping separator applied.
 * 
 * "#" (hash)       Alternate form:
 *                  For g and G types, trailing zeros are not removed.
 *                  For f, F, e, E, g, G types, the output always contains a decimal point.
 *                  For o, x, X types, the text 0, 0x, 0X, respectively, is prepended to non-zero numbers.
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
