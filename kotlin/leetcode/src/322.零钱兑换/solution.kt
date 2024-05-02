package source.`322`.零钱兑换

import kotlin.math.min

class Solution {
    /**
     * 完全背包问题的变形
     *
     * 《Hello 算法》中有介绍到：
     * https://www.hello-algo.com/chapter_dynamic_programming/unbounded_knapsack_problem/#1_1
     *
     * 这里直接写空间优化过的算法
     */
    fun coinChange(coins: IntArray, amount: Int): Int {
        val infinityMax = amount + 1  // 所需硬币数不会大于 amount，因为硬币的最小面值是1
        val dp = IntArray(amount + 1) { infinityMax }
        dp[0] = 0
        coins.forEach { coin ->  // 只使用前 i 种硬币时，
            for (amt in 1..amount) {  // 枚举计算小于等于 amount 的各种目标金额，所需要的最少硬币数
                if (amt >= coin) {
                    dp[amt] = min(dp[amt], dp[amt - coin] + 1)
                }
            }
        }
        return dp[amount].takeIf { it != infinityMax } ?: -1
    }
}

fun main() {
    Solution().apply {
        coinChange(intArrayOf(2), 3).also(::println)
    }
}