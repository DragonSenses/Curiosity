package Java.ASCII;

public class AsciiTable {

    public static void main(String[] args) {
        for (int c = 32; c < 128; c++) {
            System.out.println(c + ": " + (char) c);
        }
    }
}
