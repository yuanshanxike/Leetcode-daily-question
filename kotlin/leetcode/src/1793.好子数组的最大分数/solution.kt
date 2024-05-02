package source.`1793`.好子数组的最大分数

import kotlin.math.max
import kotlin.math.min

class Solution {
    /**
     * 区间 dp
     * 定义 dp[l][r]: 子区间 [l, r] 中可能获得的最大分数
     * dp[l - 1][r] = max(min{l-1 -> r} * (r - (l-1) + 1), dp[l][r])  ①
     * dp[l][r + 1] = max(min{l -> r+1} * (r+1 - l + 1), dp[l][r])    ②
     * ① 和 ② 的选取需要看目前 nums[l] 和 nums[r] 中较大的方向进行 dp
     *
     * 在这个状态转移方程中，最难办的是求 min{l -> r}。
     * 但只要我们从 l == r 时就开始记录 min{l -> r}，它的复杂度就是 O(n)，跟随着区间一起变化
     *
     * 实际操作时，不需要 dp 数组，只需要记录一个当前最大分数就行
     * (其实就是一题双指针的问题)
     */
    fun maximumScore(nums: IntArray, k: Int): Int {
//        val dp = Array(k + 1) { IntArray(nums.size - k) }
        var maxScore = nums[k]
        var l = k
        var r = k
        // 第二维是0 == r - k，这样可以节省内存开销
//        dp[k][0] = nums[k]
        var minNum = nums[k]
        fun moveLeft() {
            minNum = min(minNum, nums[--l])
//            dp[l][r - k] = max(minNum * (r - l + 1), dp[l + 1][r - k])
            maxScore = max(minNum * (r - l + 1), maxScore)
        }

        fun moveRight() {
            minNum = min(minNum, nums[++r])
//            dp[l][r - k] = max(minNum * (r - l + 1), dp[l][r - 1 - k])
            maxScore = max(minNum * (r - l + 1), maxScore)
        }
        while (r - l + 1 < nums.size) {
            if (nums.size * minNum < maxScore) break  // 小优化：如果当前最小值与数组长度的乘积已经小于最大分数，就可以中断循环计算。因为继续算下去也不能得到更大的结果了
            if (0 < l && r < nums.lastIndex) {
                if (nums[l - 1] <= nums[r + 1]) {
                    moveRight()
                } else {
                    moveLeft()
                }
            } else if (l == 0) {
                moveRight()
            } else { // r == nums.lastIndex
                moveLeft()
            }
        }
//        dp.forEach { ints ->
//            ints.forEach {
//                print("$it, ")
//            }
//            println()
//        }
//        return dp[0][nums.lastIndex - k]
        return maxScore
    }

//    fun maximumScore(nums: IntArray, k: Int): Int {
//        var subSize = 1
//        var left = k
//        var right = k
//        var score = nums[k]
//        var minNum = score
////        var remainLeft = k
////        var remainRight = nums.lastIndex - k
//        
//        while (left > 0) {
//            left--
//            var temp = minNum
//            minNum = min(minNum, nums[left])
//            if (minNum * (subSize + 1) >= score) {
//                subSize++
//                score = minNum * subSize
//            } else {
//                
//            }
//        }
//    }
}


fun main() {
    Solution().apply {
        maximumScore(intArrayOf(1, 4, 3, 7, 4, 5, 5, 5, 5, 7, 8), 3).also { println(it) }
        maximumScore(intArrayOf(1, 4, 3, 7, 4, 5, 5, 5, 5, 7, 8).reversed().toIntArray(), 7).also { println(it) }
    }
}