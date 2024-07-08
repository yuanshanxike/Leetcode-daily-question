namespace L724;

public class Solution {
    /// <summary>
    /// 可以将前缀和的计算结果保存到 nums 中
    /// </summary>
    /// <param name="nums"></param>
    /// <returns></returns>
    public int PivotIndex(int[] nums) {
        for (int i = 1; i < nums.Length; i++) {
            nums[i] += nums[i - 1];
        }
        for (int i = 0; i < nums.Length; i++) {
            int leftSum = i > 0 ? nums[i - 1] : 0;
            int rightSum = nums[^1] - nums[i];
            if (leftSum == rightSum) return i;
        }
        return -1;
    }
}