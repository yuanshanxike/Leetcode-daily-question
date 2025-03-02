/**
 * 动态规划：
 * dp[i][j] 表示 nums 中的前 i + 1 个元素(0 ~ i)，当 arr1[i] == j 时，单调数组对的数目。
 * 需要满足 0 <= arr1[i] <= nums[i]，arr2[i] = nums[i] - arr1[i] = nums[i] - j.
 * 状态转移方程：dp[i][j] = Σ dp[i - 1][k], 其中 k <= j (也就是 arr1[i - 1] <= arr1[i]), nums[i] - j <= nums[i - 1] - k (也就是 arr2[i] <= arr2[i - 1]).
 * 初始值 dp[0][j] (0 <= j <= nums[0]) 都置为 1, 表示都满足题目约束.
 * 答案是数组 dp[n - 1] 的和。
 * @param nums
 */
function countOfPairs(nums: number[]): number {
    const MOD = 1e9 + 7
    const n = nums.length
    const dp: number[][] = Array.from({ length: nums.length }, () => Array(51).fill(0))
    for (let j = 0; j <= nums[0]; j++) {
        dp[0][j] = 1
    }
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= nums[i]; j++) {
            for (let k = 0; k <= j; k++) {
                if (nums[i] - j <= nums[i - 1] - k) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD
                }
            }
        }
    }

    return dp[n - 1].reduce((sum, cur) => (sum + cur) % MOD, 0)
};

console.log(countOfPairs([2,3,2]))
console.log(countOfPairs([5,5,5,5]))


namespace L3251 {
    /**
     * dp + 优化前缀和
     * 观察 L3250 的做法，其实还有以下一些可优化的空间：
     * ① 首先，在空间上，每次计算只会用到 dp[i - 1] 中的值来计算 dp[i]，可以使用滚动数组；
     * ② dp[i - 1] 中能被加的第 k 项需要满足的条件：nums[i] - j <= nums[i - 1] - k，移项后可得到 num[i] - nums[i - 1] <= j - k,
     * 也就是 k <= j - (nums[i] - nums[i - 1]), 不要忘了题目还要求 k <= j, 所以综合起来就是 k <= j - max(0, num[i] - nums[i - 1]).
     * 那么可以将 dp[i] 的定义改成一个前缀和数组，得到状态转移方程：
     * dp[i][j] = dp[i][j - 1] + dp[i - 1][k], 其中 k = j - min(0, | num[i] - nums[i - 1] |).
     * 初始值: dp[0][j] 对 [1, 1, 1, ..., 1] 计算前缀和数组。
     * 答案就是 dp[n - 1][nums[n - 1]]. 
     * @param nums 
     */
    function countOfPairs(nums: number[]): number {
        const MOD = 1e9 + 7
        const n = nums.length
        let dp1 = Array(1001).fill(0)
        let dp2 = Array(1001).fill(0)
        dp1[0] = 1
        for (let j = 1; j <= nums[0]; j++) {
            dp1[j] += dp1[j - 1] + 1
        }

        for (let i = 1; i < n; i++) {
            for (let j = 0; j <= nums[i]; j++) {
                const k = j - Math.max(0, nums[i] - nums[i - 1])
                dp2[j] = ((dp2[j - 1] ?? 0) + (dp1[k] ?? 0)) % MOD
            }

            [dp1, dp2] = [dp2, dp1]
        }

        return dp1[nums[n - 1]]
    }

    console.log(countOfPairs([2,3,2]))
    console.log(countOfPairs([5,5,5,5]))
}