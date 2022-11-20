package Java.Challenges;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
 *      - There is a list of participants' names. 
 *      - A person cannot be their own "Secret Santa" (paired with oneself)
 * 
 * Additional Specifications:
 * 
 * Part 2) Read the list of names from a text file ("names.txt") where each name
 * is separated by a newline
 * 
 * Part 3) After second year of having Secret Santa gift exchange, participants
 * have complained of having the same "Secret Santa" every year. Modify the
 * program so that a participant can only have the same Secret Santa once every
 * 2 years. 
 * 
 * It's an interesting problem to solve! My diffuse mode thinking was able to 
 * approach this problem through various ways. 
 * 
 * https://stackoverflow.com/questions/273567/secret-santa-algorithm
 * 
 * First Approach (Using Arrays, Streams, groupingBy, partitioning): 
 * 1. Store the names in the array. Shuffle.
 * 2. Create and populate the partition map by iterating through the
 * array. If the index is even, then set to true. If index is odd, then false.
 */ 
public class SecretSanta {
    private String[] participants;
    private Map<Boolean, List<String>> partitionedNames;

    // private static void storeAndShuffle(String[] arr){
    //     Collections.shuffle(Arrays.asList(arr));
    // }

    public static void main(String[] args){
        String[] arr = {"a","b","c","d","e","f","g","h"};
        System.out.println(arr.length);
        System.out.println(Arrays.toString(arr));

        Collections.shuffle(Arrays.asList(arr));
        System.out.println(Arrays.toString(arr));


        Map<Boolean, List<String>> map = new HashMap<Boolean, List<String>>();
        for(int i=0; i < arr.length; i++){
            if((i & 1) == 0){ // even index?
                // map.put(true,arr[i]);    // to do
            } else {

            }
        }
    }

}