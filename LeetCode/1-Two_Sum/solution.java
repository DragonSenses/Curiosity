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
    int[] twoSumArray = new int[2];

    Map<Integer, Integer> map = new HashMap<Integer, Integer>();
    for (int i=0; i < nums.length; i++){
      int diff = target - nums[i];
      if (map.containsKey(diff)){
        twoSumArray[0] = map.get(diff);
        twoSumArray[1] = i;
        return twoSumArray;
      } else {
        map.put(nums[i], i);
      }
    }
    return twoSumArray;
  }
}