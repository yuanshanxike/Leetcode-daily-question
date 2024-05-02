package source.`198`.打家劫舍

import kotlin.math.max

class Solution {
    /**
     * f[i]:表示打劫前i家房子可以获得的最大金额和。
     * 状态转移方程：f[i] = max(f[i - 1], f[i - 2] + nums[i - 1])
     */
    fun rob(nums: IntArray): Int {
        val f = IntArray(nums.size + 1) { 0 }
        f[0] = 0
        f[1] = nums[0]
        for (i in 2..nums.size) {
            f[i] = max(f[i - 1], f[i - 2] + nums[i - 1])
        }
        return f[nums.size]
    }
}