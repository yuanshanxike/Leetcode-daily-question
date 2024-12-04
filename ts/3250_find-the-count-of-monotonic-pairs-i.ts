/**
 * 动态规划：
 * dp[i][s] 表示前 i 项，其中 arr1[i - 1] = s, arr2[i - 1] = nums[i - 1] - s 时，单调数组对的数目。
 * 状态转移方程：dp[i][s] = Σ dp[i - 1][j = 0 ... s], 其中 0 <= s <= nums[i - 2], 当且仅当 nums[i - 2] >= arr2[i - 2] >= 0。
 * @param nums 
 */
function countOfPairs(nums: number[]): number {
    
};