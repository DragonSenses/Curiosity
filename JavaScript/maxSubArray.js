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

/* Answer: 
Simple Approach is to run two for loops O(n^2), and for every subarray
check if it is the maximum sum possible. 

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

/* Efficient Approach 
    *
*/
function getMaxSubSum(arr){
    // TODO
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