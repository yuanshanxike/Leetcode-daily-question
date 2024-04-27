package `2639`

import kotlin.math.max

class Solution {
    fun findColumnWidth(grid: Array<IntArray>): IntArray {
        val m = grid.size
        val n = grid[0].size
        val ans = IntArray(n) { -1 }
        for (j in 0 until n) {
            var maxWidth = 0
            for (i in 0 until m) {
                maxWidth = max(maxWidth, grid[i][j].toString().length)
            }
            ans[j] = maxWidth
        }
        return ans
    }
}

fun main() {
    val s = Solution()
    println(s.findColumnWidth(arrayOf(intArrayOf(1), intArrayOf(22), intArrayOf(333))).toList())
    println(s.findColumnWidth(arrayOf(intArrayOf(-15,1,3), intArrayOf(15,7,12), intArrayOf(5,6,-2))).toList())
    println(s.findColumnWidth(arrayOf(intArrayOf(Int.MAX_VALUE,1,Int.MAX_VALUE), intArrayOf(15,Int.MIN_VALUE,12), intArrayOf(5,6,Int.MIN_VALUE))).toList())
}