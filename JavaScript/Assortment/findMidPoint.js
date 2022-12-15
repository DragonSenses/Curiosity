
/**
 * Finds the midpoint between the lowest and highest numbers.
 * In binary search we have to partition between two indexes and find
 * the midpoint. Usually we have two indicies of an array that represent
 * the lowest and the highest index respectively. 
 * 
 * Normally it would be mid = (hi + lo)/2
 * Another way is the (hi + lo) >> 1.
 * 
 * Here we use the (high + low) >>> 1 which uses the unsigned bit to perform
 * a correct average of non-negative numbers. 
 * 
 * ASSUMPTION: high and low are both non-negative, such that the upper-most
 * bit (the sign-bit) is zero. For a signed 32-bit integer, it is overflow and 
 * flips negative. Therefore (high + low)/2 is wrong because (high + low) could
 * be negative. For Unsigned 32-bit integers, the (high + low) is correct, and
 * all that's needed is to divide by 2. 
 *  Some languages do not support unsigned integers, so the next best thing is
 * to divide by 2 (as an unsigned integer) is the logical right-shift >>>
 *  In languages with unsigned integers (such as C/C++), it gets trickier
 * since your input can be full 32-bit integers. So the solution is to do:
 * low + ((high - low) / 2) 
 * 
 * >>> is logical right-shift. It fills the upper bits with zero.
 * >> is arithmetic right-shift. It fills the upper its with copies of the original top bit.
 * / is division.
 *  
 * >>> helps compute the mid point of an array in binary search safely
 * without overflow as (low + high) >> 1 does. In (low + high) >>> 1, 
 * the >>> operator is zero filling right shift operator, which is devoid
 * of overflow bug. 
 * 
 * @param {number} lo lowest
 * @param {number} hi highest
 * @returns the middle point between lo and hi
 */
function findMidPoint(lo, hi){
    // here in binary search, we test if(lo > hi) return false;
    return (lo + hi) >>> 1;
}


console.log(findMidPoint(0,10));
console.log(findMidPoint(0,4));

console.log(findMidPoint(2,8));
console.log(findMidPoint(1,7));

console.log(findMidPoint(0,2048));
console.log(findMidPoint(31,73));
