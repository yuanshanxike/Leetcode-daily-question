package source.`518`.`零钱兑换 II`

import kotlin.math.max

class Solution {
    /**
     * 完全背包问题的变形
     */
    fun change_hack(amount: Int, coins: IntArray): Int {
        if (amount == 0) return 1
        val dp = IntArray(amount + 1) { 0 }  // 前 0 种硬币不会产生组合
        coins.forEach { coin ->
            for (amt in 1..amount) {
                if (amt >= coin) {
                    val onlyCur = if (amt % coin == 0) 1 else 0
                    dp[amt] += max(
                        dp[amt - coin],
                        onlyCur
                    )  // （如果够减）减去新的币种所对应的组合数 和 当前是否全部由当前数构成 的最大值 加上 之前币值已经计算出来的对应目标金额的组合数
                }
            }
            dp.forEach { print("$it, ") }
            println()
        }
        return dp[amount]
    }

    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1) { 0 }  // 没有硬币、金额大于 0 时，不会产生组合
        dp[0] = 1 // 目标金额为 0 时，不需要任何硬币就存在一种组合，即 空集
        coins.forEach { coin ->
            for (amt in 1..amount) {
                if (amt >= coin) {
                    dp[amt] += dp[amt - coin] // （如果够减）减去新的币值所对应的组合数 加上 之前币值已经计算出来的对应目标金额的组合数
                }
            }
        }
        return dp[amount]
    }
}

fun main() {
    Solution().apply {
        change(5, intArrayOf(1, 2, 5)).also { println(it) }
        change(3, intArrayOf(2)).also { println(it) }
        change(10, intArrayOf(10)).also { println(it) }

        change(5, intArrayOf(2, 1, 5)).also { println(it) }
        change(5, intArrayOf(5, 1, 2)).also { println(it) }
        change(5, intArrayOf(5, 2, 1)).also { println(it) }
    }
}