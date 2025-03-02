namespace L3065;

public class Solution {
    public int MinOperations(int[] nums, int k) {
        return nums.Count((num) => num < k);
    }
}