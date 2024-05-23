import java.util.HashMap;
import java.util.Map;

class Solution {
  /**
   * Given an array of integers nums and an integer target, return indices of 
   * the two numbers such that they add up to target.
   * 
   * Assumes: that each input would have exactly one solution, and you may not
   * use the same element twice.
   * 
   * You can return the answer in any order.
   * @param nums - array of integers
   * @param target - the sum that two numbers in the array should add up to
   * @return An array of indices of the two numbers within the array that add
   * up to target
   */
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
          return new int[]{map.get(complement), i};
      }
      map.put(nums[i], i);
    }

    // No valid pair found
    return new int[0];
  }
}
