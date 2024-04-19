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

