package `1553`.` 吃掉 N 个橘子的最少天数`

import java.lang.Integer.min

class Solution {
    // 方法一：记忆化搜索
    private val memory = HashMap<Int, Int>()

    /**
     * dfs(n) = dfs(n - 1) + 1 没必要成为一个递归分支，因为除法比减法能让当前的 n 更快地减小，
     * 一个数能被 2 或 3 整除时，一定会选择去除 2 或 3 使其更快地变为更小的数，而不是通过减法。（局部的贪心优化）
     * 所以对于一个数 n，可以使当前数先进行最多 1 到 2 次的 -1 操作，使其满足是 2 或 3 的倍数，
     * 然后直接使用除法即可。得到的数和原问题是相似的子问题，可以直接重复上述步骤，n == 1, n == 0 为递归出口。
     * 这样就相当于在时间和空间上，都对(时空复杂度都为) O(n) 进行了剪枝。
     *
     * 详细证明参考：https://leetcode.cn/problems/minimum-number-of-days-to-eat-n-oranges/solutions/2773476/liang-chong-fang-fa-ji-yi-hua-sou-suo-zu-18jv/
     *
     * 时空复杂度的证明类似于“因数分解”，为: O((log n)^2)
     */
    fun minDays(n: Int): Int {
        memory[n].takeIf { it != -1 }?.also { return it }
        if (n == 0 || n == 1) return n
        val cost = min(minDays(n / 3) + n % 3, minDays(n / 2) + n % 2) + 1 // 最后的 +1 表示：将 n 变为 n/3 或 n/2 所花费的那一天
        memory[n] = cost
        return cost
    }
}

fun main() {
    val s = Solution()
    println(s.minDays(6))  // 3
    println(s.minDays(10)) // 4
    println(s.minDays(1))  // 1
    println(s.minDays(56)) // 6
    println(s.minDays(820592)) // 22
}