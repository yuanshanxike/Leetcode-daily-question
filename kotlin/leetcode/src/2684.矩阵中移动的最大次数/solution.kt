package source.`2684`.矩阵中移动的最大次数

import kotlin.math.max

class Solution {
    fun maxMoves(grid: Array<IntArray>): Int {
        // dp
        val m = grid.size
        val n = grid[0].size
        // dp 二维数组中，初始让每个元素的值等于列号，代表能走到这里的话，所移动的次数
        val dp = Array(m) { IntArray(n) { col -> col } }
        var maxStep = 0
        // 从倒数第二列开始向前面的列遍历计算
        // 对于每个位置，向后一列最多有三种走法（上下边界只有两种走法）
        // 如果任意一种走法能成功（严格小于后一步到达位置的值），更新值为后一步的次数
        // 注意三种走法要取最大值来更新
        for (col in n - 2 downTo 0) {
            for (row in 0 until m) {
                if (row - 1 >= 0 && grid[row][col] < grid[row - 1][col + 1]) {
                    dp[row][col] = max(dp[row][col], dp[row - 1][col + 1])
                }
                if (grid[row][col] < grid[row][col + 1]) {
                    dp[row][col] = max(dp[row][col], dp[row][col + 1])
                }
                if (row + 1 < m && grid[row][col] < grid[row + 1][col + 1]) {
                    dp[row][col] = max(dp[row][col], dp[row + 1][col + 1])
                }

                // 当计算到第一列时，记录下这一列的最大值就是我们需要的结果
                if (col == 0) maxStep = max(maxStep, dp[row][col])
            }
        }
        return maxStep

        // 暴力
//        return bruteForce(grid)
    }


    /********* 暴力模拟 ***********/
    private fun bruteForce(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        var max = 0
        for (i in grid.indices) {
            max = max(dfs(grid, m, n, i to 0), max)
        }
        return max(max - 1, 0)
    }

    private fun dfs(grid: Array<IntArray>, m: Int, n: Int, curPos: Pair<Int, Int>): Int {
        val (row, col) = curPos
        val curVal = grid[row][col]
        if (col >= n) return 0
        if (col == n - 1) return 1
        var step = 0
        if (row - 1 >= 0 && grid[row - 1][col + 1] > curVal) {
            step = max(dfs(grid, m, n, row - 1 to col + 1) + 1, step)
        }
        if (grid[row][col + 1] > curVal) {
            step = max(dfs(grid, m, n, row to col + 1) + 1, step)
        }
        if (row + 1 < m && grid[row + 1][col + 1] > curVal) {
            step = max(dfs(grid, m, n, row + 1 to col + 1) + 1, step)
        }
        return step
    }
}