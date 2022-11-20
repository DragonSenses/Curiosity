package Java.Challenges;

import java.util.Arrays;
import java.util.Collections;

/**
 * A relevant problem cropped up where one is asked to organize a "Secret Santa"
 * or a gift exchange. Within this gift exchange, each person draws another 
 * person's name at random and then gets a gift for them. The person who draws
 * the name is the "Secret Santa" who has to furtively attain a gift to give to
 * the person whose name they've drawn. This social gathering happens yearly so
 * you wish to abstractify the problem in order to facilitate the gift exchange.
 * 
 * Write a program that, given a list of names of each participant, pairs each
 * participant's name with another participant at random. 
 * 
 * It does not matter whether the number of participants are even or odd because
 * each participant will point to one person. 
 * 
 *  1 -> 2 -> 3 -> 1
 *  1 -> 2 -> 3 -> 4 -> 1
 * 
 * Preconditions:
 * - There is a list of participants' names. 
 * - A person cannot be their own "Secret Santa" (paired with themselves)
 * 
 * Additional Specifications:
 * 
 * Part 2) Read the list of names from a text file ("names.txt") where each name
 * is separated by a newline
 * 
 * Part 3) Disallowed Pairs: After the 2nd year of having Secret Santa,
 * participants have complained of having the same "Secret Santa" every year. 
 * Modify the program so that a participant can only have the same Secret Santa
 * once every 2 years. 
 * 
 * First Approach (Using Circular Array): 
 * 1. Store the names in the array. Shuffle.
 * 2. Pair each String to its neighbor (index + 1), except for the last
 * 3. Pair the last String to the first String (wrap around the Array)
 * 4. Match Complete
 * 
 * Second Approach (Circularly Linked List)
 * 
 * Third Approach (Graph - each node has one outgoing edge to another node)
 * a directed graph where every vertex has indegree = outdegree = 1.
 */ 
public class SecretSanta {

    /**
     * Shuffles the array of String names. Randomizes the order.
     * @param arr array of String names
     */
    private static void shuffle(String[] arr){
        Collections.shuffle(Arrays.asList(arr));
    }

    /**
     * Prints out the Secret Santa for each name
     * @param arr array of String names
     */
    private static void print(String[] arr){
        StringBuilder sb = new StringBuilder();
        int len = arr.length;

        // next index uses modular arithmetic to wrap around the array
        int next = (0 + 1) % len;  

        for(int k = 0; k < len; k++){
            // format: Pair#)   name -> nextName
            sb.append(k+1 + ")\t" + arr[k]  + " -> " + arr[next] + "\n");
            next = (next+1) % len;
        }
        System.out.println(sb.toString());
    }

    /**
     * Combines all the steps to produce the list of "Secret Santa" for each
     * name in the array of String names.
     * @param arr array of String names
     */
    private static void make(String[] arr){
        shuffle(arr);
        print(arr);
    }

    public static void main(String[] args){
        String[] arr = {"a","b","c","d","e","f","g","h"};
        System.out.println("Names before Shuffle:\t" + Arrays.toString(arr));

        shuffle(arr);
        System.out.println("Names after Shuffle:\t" + Arrays.toString(arr));

        print(arr);

        String[] oddArr = {"Apple", "Mango", "Banana", "Orange", "Blueberry"};
        make(oddArr);
    }

}