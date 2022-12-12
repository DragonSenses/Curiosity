/* A maximal subarray */
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
*/
function getMaxSubSumSimple(arr){
    let len = arr.length;
    let maxSum = Number.MIN_SAFE_INTEGER;
    let currSum = 0;

    for(let i = 0; i <= len-1; i ++){
        currSum = 0;

        for(let j = 0; j <= len-1; j++){
            currSum += arr[j];

            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
    }
}

getMaxSubSumSimple([-1, -2, -3]) == 0;

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

/* Pseudocode 
    1. Initialize all variables to first element in array
        maxCurrent = maxGlobal = A[0]
        - maxCurrent is sum of current maximum sub array
        - maxGlobal tracks global maximum sum

    2. For loop from i to length(A) - 1
    
    3. Within the Loop
        maxCurrent = max(A[i], maxCurrent + A[i])

    4. If maxCurrent > maxGlobal
        maxGlobal = maxCurrent

    5. Return maxGlobal
*/

// TODO
/**
 * Retrives the Maximum Sum Subarray of the passed in array.
 * @param {*} arr array to retrieve maximum sum subarray from
 */
function getMaxSubSum(arr){
    
    let len = arr.length;
    let maxSum = Number.MIN_SAFE_INTEGER;
    let currSum = 0;

    for(let i = 0; i <= len-1; i ++){
        currSum = 0;

        for(let j = 0; j <= len-1; j++){
            currSum += arr[j];

            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
    }
}