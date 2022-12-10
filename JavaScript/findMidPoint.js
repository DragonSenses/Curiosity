
/**
 * Finds the midpoint between the lowest and highest numbers.
 * In binary search we have to partition between two indexes and find
 * the midpoint. Usually we have two indicies of an array that represent
 * the lowest and the highest index respectively. 

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
