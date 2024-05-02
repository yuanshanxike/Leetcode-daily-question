package source.`213`.`打家劫舍 II`

import kotlin.math.max

class Solution {
    /**
     * size: 0 -> 3 为边界条件
     * 对于新遍历到的房间：
     * ① 打劫，则不能打劫之前的第一间和最后一间；
     * ② 不打劫，则可以打劫之前的第一间和最后一间。
     *
     * dp1[i]表示用“打家劫舍1”的方法计算出的打劫前i家非环房屋得到的最大收益；
     * dp2[i - 2]表示用“打家劫舍1”的方法计算出的打劫前i家去掉第0家及第i家后非环房屋得到的最大收益。
     * 得到状态转移方程：
     * dp1,dp2: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
     * ans = max(dp1[n], dp1[n-2] + nums[n-1])
     *
     * 对于 max(dp[i - 1], dp[i - 2] + nums[i]) 的理解：
     * dp[i - 1] 和 dp[i - 2]本来就是有很多交集的，前者包含后者的所有正确 case 的枚举，
     * 其实 dp[i - 1] 只是多了一个 nums[i - 1] 是否加入到和中去的所有 case；
     * 根据题目规则：有 nums[i] 的时候不能有 nums[i - 1]。
     * 所以对于 nums[i] 加入到和中去的 case，不能使用 dp[i - 1] （包含 nums[i - 1] 计算可以得到的最大值），
     * 而使用 dp[i - 2] （不包含 nums[i - 1] ，计算可以得到的最大值）。
     * 而对于 dp[i] 表示的最大值，既可能是包含了 nums[i] 也可能不包含 nums[i]。
     * max(dp[i - 1], dp[i - 2] + nums[i]) 相当于就是枚举了这两种可能，留下最大的
     */
    fun rob(nums: IntArray): Int {
        if (nums.size == 1) return nums[0]
        if (nums.size == 2) return max(nums[0], nums[1])
        if (nums.size == 3) return max(max(nums[0], nums[1]), nums[2])
        // 不包含最后一个元素
        val dp1 = IntArray(nums.size - 1)
        dp1[0] = nums[0]
        dp1[1] = max(nums[0], nums[1])
        for (i in 2..<nums.lastIndex) {
            dp1[i] = max(dp1[i - 1], dp1[i - 2] + nums[i])
        }

        // 在dp1的基础上再去掉头、尾
        val dp2 = IntArray(dp1.size - 2)
        dp2[0] = nums[1]
        if (dp1.size > 3) {
            dp2[1] = max(nums[1], nums[2])
            var idx = 2
            for (j in 3..nums.lastIndex - 2) {
                dp2[idx] = max(dp2[idx - 1], dp2[idx - 2] + nums[j])
                idx++
            }
        }
        println("dp1: ${dp1.toList()}")
        println("dp2: ${dp2.toList()}")
        return max(dp1.last(), dp2.last() + nums.last())
    }
}

fun main() {

}