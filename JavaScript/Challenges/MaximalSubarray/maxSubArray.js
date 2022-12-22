/* A maximal subarray */

/* Pseudocode 
    1. Initialize all variables to first element in array
        maxCurrent = maxGlobal = 0
        - maxCurrent is sum of current maximum sub array
        - maxGlobal tracks global maximum sum

    2. For loop from i to length(A) - 1
    
    3. Within the Loop
        maxCurrent = max(A[i], maxCurrent + A[i])

    4. If maxCurrent > maxGlobal
        maxGlobal = maxCurrent

    5. Return maxGlobal
*/

/**
 * Acquires the Maximum Sum Subarray of the passed in array using 
 * Kadane's Algorithm with a runtime of O(n).
 * @param {number[]} arr array to retrieve maximum sum subarray from
 */
function getMaxSubSum(arr){
    let n = arr.length;
    let maxGlobal = 0;      // Instead of Number.MIN_SAFE_INTEGER;
    let maxCurrent = 0;     

    for(let i = 0; i < n; i++){
        maxCurrent = Math.max(arr[i], arr[i] + maxCurrent);

        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
        }
    }

    return maxGlobal;
}
 

/* The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.

Write the function getMaxSubSum(arr) that will return that sum. 

Please try to think of a fast solution: O(n2) or even O(n) if you can.

For instance:
*/
getMaxSubSum([-1, 2, 3, -9]) == 5;          // (sum of 2 and 3)
getMaxSubSum([2, -1, 2, 3, -9]) == 6;       // (sum of 2, -1, 2, 3)
getMaxSubSum([-1, 2, 3, -9, 11]) == 11;     // (sum of 11)
getMaxSubSum([-2, -1, 1, 2]) == 3;          // (sum of 1, 2)
getMaxSubSum([100, -9, 2, -3, 5]) == 100;   // (sum of 100)
getMaxSubSum([1, 2, 3]) == 6; // (take all)    (sum of 1, 2, 3)

/* If all items are negative, it means that we take none (the subarray is empty), 
so the sum is zero: */
getMaxSubSum([-1, -2, -3]) == 0;

/* More Examples
Input: [-3, -4, 5, -1, 2, -4, 6, -1]
Output: 8
Explanation: Subarray [5, -1, 2, -4, 6] is the max sum contiguous subarray with sum 8.

Input: [-2, 3, -1, 2]
Output: 4
Explanation: Subarray [3, -1, 2] is the max sum contiguous subarray with sum 4.
*/

/* Breakdown of Problem

Let's start with the first step:
1. Fully Understand the Problem 
    * Read. Re-read. And read again until the problem statement is understood. 
    * Breakdown any special terms, and decode key vocabulary words
    * Be able to explain it differently to someone else

In this case, we can break down the term "contiguous subarray" first. 
  * Starting with the adjective "contiguous" means together in sequence. 
  * Now an array is a contiguous memory block, and in JavaScript is a 
    special kind of object, suited to storing and managing ordered data items.
  * A "subarray" is a slice of a contiguous array that maintains the order of
    the elements
    - A subarray may comprise a single element from the given array or the
    given array as a whole too

Let's consider an array, and see how many subarrays we can form:
    arr = [1,2,3,4,5]

For this array, the sub-arrays are:
    For element at      Sub-Arrays
        0th index       {1}, {1,2}, {1,2,3}, {1,2,3,4}, {1,2,3,4,5}
        1st index       {2}, {2,3}, {2,3,4}, {2,3,4,5}
        2nd index       {3}, {3,4}, {3,4,5}
        3rd index       {4}, {4,5}
        4th index       {5}

So given an array of 5 elements, one can create 15 subarrays. 

What's the correlation between n elements and ? contiguous subarrays?
    The answer is (n(n+1))/2

    A subarray is completely determined by the index of its first element and 
    the index of the element that immediately follows its last element.

Discrete Math proof that for N elements there are (N(N+1))/2 subarrays.
Source: https://math.stackexchange.com/questions/1194584/the-total-number-of-subarrays

    Consider an arbitrary array of N DISTINCT ELEMENTS.

 There exists 1 array consisting of all the elements (indexed from 0 to N-1)

 There exist 2 arrays consisting of N-1 consecutive elements (indexed from 0 to N-2)
 
 and in general there are k arrays consisting of N-k+1 consecutive elements (indexed from 0 to N-k-1)

 We can access elements 0 ... N-k-1 as the first array, then 1 ... N-k+2 is the second array, 
 and this goes on for all N-k+r until N-k+r = N-1 (ie until we have hit the end). 
 
 The r that does us is can be solved for : N − k + r = N − 1 → r − k = −1 → r = k−1
 And the list       0...k-1 contains k elements within it

Thus we note that the total count of subarrays is
1 for N elements

2 for N-1 elements

3 for N-2 elements
.
.
.
N for 1 element
And the total sum must be:  1 + 2 + 3 ... N
    if 1 + 2 + 3...N = (1/2)N(N+1)
then   1 + 2 + 3...N = (1/2)(N+1)(N+2)
we verify:
    (1/2)N(N+1) + N + 1 = (N + 1)(1/2N + 1)
    = (N+1) (N+2)/2
*/


/* Answer: Brute Force - simple approach - O(n^2) 
run two for loops, and for every subarray check if it is the maximum sum possible. 

1. Check all possible subarrays
2. Pick one with maximum sum

Pseudo-Code
    * Run a loop for i from 0 to n-1, where n is the size of array
    * Run a nested loop for j from i to n-1 and add the value of the element
      at index j to a variable currentMax
    * For every subarray, check if currentMax is the maximum sum of all 
      contiguous subarrays.

The issue with this current implementation is that not all possible subarrays
are summed, only the subarrays at the end. 
    e.g, arr = [1,2,3,4] only gets subarrays: {1,2,3,4}, {2,3,4}, {3,4}, {4}
*/
function getMaxSubSumSimple(arr){
    let len = arr.length;
    let maxSum = 0;     // Instead of Number.MIN_SAFE_INTEGER; 
    let currSum = 0;

    // For every element at each index
    for(let i = 0; i < len; i ++){
        currSum = 0;
        // Create all possible subarrays for element at index i
        for(let j = i; j < len; j++){  
            currSum += arr[j];

            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
    }

    return maxSum;
}

getMaxSubSumSimple([-1, -2, -3]) == 0;

/**
 * Proper Brute Force gets maximum sum of every subarray within an array.
 * @param {*} arr 
 */
function getMaxSubSumBruteForce(arr){
    let n = arr.length;
    let maxCurrent = 0; 
    let maxGlobal = 0;

    for(let i = 0; i < n; i++){ // Start Element

        for (let j = i; j < n; j++){    // End element

            for (let k = i; k <= j; k++) {  
                maxCurrent += arr[k];
            } // by the end of this loop, the subarray is formed
            
            // Check if the sum of the subarray is greater than maxGlobal
            if (maxCurrent > maxGlobal) {
                maxGlobal = maxCurrent;
            }

            // Reset maxCurrent;
            maxCurrent = 0;
        }
        
    }

    return maxGlobal;
}

console.log( getMaxSubSumBruteForce([-1, 2, 3, -9, 11]) );

/* Efficient Approach - Kadane's Algorithm - O(n) linear time
Idea is that the Local Maximum Subarray is either the
    1. Current Element
    2. Current Element combined with previous maximum subarray
Compare (1) and (2) and ignore all other possible subarrays. Do this for all
indicies. 

    Proof, why Kadane's Algorithm Work?
Given an array, we are at nth index, with element x. 
We also know the subarray ending at the previous index, called M.
[..[  M  ]|x| ...]
           n        index

The maximum subarray ending at the nth index is either the current element 
    1. [x]      // current element x
Or  2. [M, x]   // current element x combined with M

M could be any number of elements. Let's try proof by contradiction. 
    Let's assume that maximum subarray ending at this element x, at index n, is
actually [T,x]. T is a non-empty subarray that may have more elements or less 
elements than subarray M. 
So we have:
    Sum([T,X]) <= Sum[M,x]
Sum( [T,X] ) = sum(T) + x
Sum( [M,x] ) = sum(M) + x.

since we know that M is maximum sum ending at the previous index, it's at least
larger than or equal to sum of T. 
    Sum(T) <= Sum(M)

Looking at these equations, Sum of [T,x] is less than/equal to Sum of [M,x].
    Which shows that maximum subarray ending at current index (i.e. nth index)
    needs to be either x (current element) or [M, x] current element x combined
    with M (maximum subarray ending at previous index)
*/



/**
 * Prints all possible subarrays of an array. For debugging purposes.
 * 
 * Uses 3 for loops. The first for loop tracks the start element, the
 * second for loop tracks the ending element of the subarray, the third
 * for loop builds the subarray using the starting and ending index.
 * 
 * Let's consider an array, and see how many subarrays we can form:
 *      arr = [1,2,3,4,5]
 * 
 * For this array, the sub-arrays are:
 *  For element at      Sub-Arrays
 *      0th index       {1}, {1,2}, {1,2,3}, {1,2,3,4}, {1,2,3,4,5}
 *      1st index       {2}, {2,3}, {2,3,4}, {2,3,4,5}
 *      2nd index       {3}, {3,4}, {3,4,5}
 *      3rd index       {4}, {4,5}
 *      4th index       {5}
 * 
 * @param {array} arr to extract all sub arrays from
 */
function printAllSubArrays(arr){
    let n = arr.length;

    for(let i = 0; i < n; i++){ // Start Element
        let str = '';

        for (let j = i; j < n; j++){    // End element

            for (let k = i; k <= j; k++) {   // Prints every element from start to end
                str += arr[k];
            } // by the end of this loop, the subarray is formed
            str += '\n';

        }

        console.log(str);   // print every subarray created at index i
    }
}

let arr = [1,2,3,4,5];
printAllSubArrays(arr);

/*  Final Attempt successfuly prints all subarrays, kept here for documentation
with comments and debugging print statements
function printAllSubArrays(arr){
    let n = arr.length;

    for(let i = 0; i < n; i++){ // Start Element
        // console.log(`index: ${i} the starting element: ${arr[i]}`);
        let str = '';
        for (let j = i; j < n; j++){    // End element
            // console.log(`index: ${i} the ending element: ${arr[j]}`);
            for (let k = i; k <= j; k++) {   // Prints every element from start to end
                // console.log(arr[k]);
                str += arr[k];
            } // by the end of this loop, the subarray is formed
            str += '\n';
        }
        console.log(str);   // print every subarray created at index i
    }
}

attempt 1
Only prints {1,2,3,4,5}  at index 0
            {2,3,4,5}    at index 1
            {3,4,5}      at index 2
            {4,5}        at index 3
            {5}          at index 4

function printAllSubArrays(arr){
    let n = arr.length;

    for(let i = 0; i < n; i++){
        console.log(`index: ${i}`);
        for (let j = i; j < n; j++){
            console.log(`elements: ${arr[j]}`);
        }
    }
}

attempt 1 - prettier output
function printAllSubArrays(arr){
    let n = arr.length;

    for(let i = 0; i < n; i++){
        console.log(`index: ${i}`);
        let str = '{';
        for (let j = i; j < n; j++){
            // console.log(`elements: ${arr[j]}`);
            str += arr[j];
            
            // add comma for every element except the last
            if(j != n-1){
                str += ', ';
            }
        }
        str += '}';
        console.log(str);
    }
}
*/