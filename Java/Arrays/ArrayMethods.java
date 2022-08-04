package Java.Arrays;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * A cluster of top methods used for Arrays.
 * 
 * Notes:
 *  2. Arrays with primitive types won't work with .asList(), instead they
 *  must be a wrapper Class (ex. Integer instead of int) since autoboxing
 *  does not happen. When you pass in int a[] -> List<int a[]> is returned 
 *  rather than List<Integer>. int a[] is identified as an object and List of 
 *  int array is returned instead of list of integers, which gives errors
 */
public class ArrayMethods {
    
    public static void main(String[] args){
        /* 1. Printing an Array */
        int[] intArray = {1,2,3,4,5,6,7};
        System.out.println(Arrays.toString(intArray));

        /* 2. Convert Array to list */
        String[] strArray = {"A","B","C","D"};
        List<String> arrayList = Arrays.asList(strArray);
        System.out.println(arrayList);

        /* 3. Convert Array to ArrayList */
        arrayList = new ArrayList<String>(Arrays.asList(strArray));

        /* 4. Convert ArrayList to Array */
        String[] stringArray = new String[arrayList.size()];
        arrayList.toArray(stringArray);

        for(String s: stringArray){
            System.out.println(s);
        }
    }
}
