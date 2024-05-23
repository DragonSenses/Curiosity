# Two Sum

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to* `target`.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

Example 1:

```sh
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

Example 2:

```sh
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```sh
Input: nums = [3,3], target = 6
Output: [0,1]
```

Constraints:

* 2 <= nums.length <= 10^4
* -10^9 <= nums[i] <= 10^9
* -10^9 <= target <= 10^9
**Only one valid answer exists.**

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

# Solution

Let's breakdown the problem. Analyze the key points:

- Output: indices / indexes of the two numbers in `nums` that sum to target
  - Exactly one solution, no need to worry whether solution does not exist
- Same element not used twice

In short, we are looking for the two addends that sum up to target.

Next, we ask ourselves what do we need? Usually we think of a data structure or algorithm here.

In this case it needs to store two types: `number`, `number`.

Immediately we can think of entries, or a pair of values. What takes in entries? Well a `Map` abstract data type. We can narrow this down for further performance with amortized `O(1)` get runtime with a `HashMap`.

Here's the algorithm:
1. Create a `HashMap<int, int>`
2. Iterate through array
3. At that index, find the difference between the `target` number and number at index
4. Check if map has the difference
   1. If it has the difference, return an array containing the index where the difference is found and `i` the current index
   2. Otherwise, set the entry for the value of the number and its current index `[nums[i], i]` in the map

Now for the implementations and key explanations:

## **Java**

```java
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
```

## TypeScript

```ts
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
```

Key points:

**Where are the HashMaps in TypeScript?**

- In **TypeScript**, the built-in `Map` is an interface that defines how key-value pairs can be used. The `Map` class serves as a hashmap by providing methods to insert, retrieve, and delete items based on keys.
- The JavaScript specification has requirements for the `Map` interface such that it could be represented internally as a **hash table** (with O(1) lookup). See [Map - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)


[**Non-Null Assertion Operator**](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)

The exclamation mark (`!`) in `map.get(complement)!` is called the **non-null assertion operator**. It's used to tell TypeScript that we are certain that the value returned by `map.get(complement)` will not be `null` or `undefined`.

Here's why we need it in this context:

1. **TypeScript and Nullability:**
   - TypeScript is a statically typed language that helps catch potential runtime errors during development.
   - When we call `map.get(complement)`, TypeScript infers that the return type could be either the value associated with the key or `undefined` (if the key is not found in the map).

2. **Guaranteed Non-Null Value:**
   - In our specific scenario, we know that the key `complement` exists in the map because we've already checked it using `map.has(complement)`.
   - Therefore, we can safely assert that the value returned by `map.get(complement)` will not be `null` or `undefined`.

3. **Using the Non-Null Assertion Operator:**
   - By adding `!` after `map.get(complement)`, we tell TypeScript to treat the value as non-nullable.
   - If, by any chance, the key was not found (which shouldn't happen in our case), TypeScript would throw a runtime error.

In summary, the non-null assertion operator allows us to express our confidence that the value will indeed be present, avoiding unnecessary null checks in the code.

