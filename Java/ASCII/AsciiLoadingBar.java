package Java.ASCII;

/**
 * A fun loading bar taking advantage of the difference between \n and \r,
 * \n - goes to the start of a new line
 * \r - goes to the start of the same line, a carriage return
 */
public class AsciiLoadingBar {
    
    /**
     * Makes an ASCII spinner by writing bytes to output buffer.
     * Goes through a set of characters in the loading String, then
     * outputs Done! after completion.
     * @throws Exception
     */
    public static void loadingBarOne() throws Exception {
        int n = 75;    // How many loops?
        int ms = 50;   // How fast should each thread be in milliseconds
        String loading = "|/-\\";
        for (int k =0 ; k < n ; k++) {
            String data = "\r" + loading.charAt(k % loading.length()) + " " + k;
            System.out.write(data.getBytes());
            Thread.sleep(ms);
        }
        System.out.println("\rDone!");
    }

    public static void main(String[] arg) throws Exception {
        loadingBarOne();
    }
}
