package Java.Java8.Collections;

// import java.util.concurrent.ConcurrentHashMap;

/**
 * ConcurrentHashMap class provides a more modern HashMap which is also 
 * concurrency friendly. Allows concurrent add and update operations that lock
 * only certain parts of the internal data structure. Thus, read and write 
 * operations have improved performance compared with the synchronized HashTable
 * 
 * Note that these operations don't lock the state of the ConcurrentHashMap; 
 * they operate on the elements as they go along. The functions supplied to 
 * these operations shouldn't depend on any ordering or on any other objects
 * or values that may change while computation is in progress.
 * 
 * Need to specify a parallelism threshold for all these operations. 
 * - The operations execute sequentially if the current size of the map is less
 * than the given threshold
 * - A value of 1 enables maximal parallelism using the common thread pool
 * - A threshold value of Long.MAX_VALUE runs the operation on a single thread
 * ================================= Methods =================================
 * ConcurrentHashMap supports three new kinds of operations, with each supporting
 * four forms: accepting functions with keys, values, Map.entry, and (key,value)
 * arguments. 
 * 1. Operations with Keys and Values (forEach, reduce, search)
 * 2. Operations with Keys (forEachKey, reduceKeys, searchKeys)
 * 3. Operations with Values (forEachValue, reduceValues, searchValues)
 * 4. Operations with Map.Entry objects (forEachEntry, reduceEntries, searchEntries)
 * 
 * -forEach() - Performs a given action for each (key, value)
 * 
 * -reduce() - Combines all (key,value) given a reduction function into a result
 * 
 * -search() - Applies a function on each (key,value) until the function produces
 * a non-null result
 */
public class ConcurrentHashMap {
    
    
    public static void main(String[] args){

    }
}
