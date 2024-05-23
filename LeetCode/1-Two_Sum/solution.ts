/**
 * Finds two numbers in the given array that add up to the specified target.
 * Assumes that each input would have exactly one solution, and you may not
 * use the same element twice.
 *
 * @param nums - An array of integers.
 * @param target - The sum that two numbers in the array should add up to.
 * @returns An array of indices of the two numbers within the array that add
 * up to the target, or an empty array if no valid pair exists.
 */
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  // No valid pair found
  return [];
}
