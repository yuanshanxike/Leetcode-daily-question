package source.`514`.自由之路

import kotlin.math.abs
import kotlin.math.min

class Solution {
    /**
     * dp[i][j]
     * i in [0, key.lastIndex], 表示查找的目标字符串的下标，从左向右随着查找依次前进
     * j in [0, ring.lastIndex], 表示当前i对应着的字母在ring中可能出现的位置
     * 空间复杂度: O(m*n)
     */
    fun findRotateSteps(ring: String, key: String): Int {
        val dp = Array(key.length) { IntArray(ring.length) { 0 } }
        var lastIndexes: MutableList<Int>? = null
        key.forEachIndexed { i, des ->
            val indexes = mutableListOf<Int>()
            ring.mapIndexedNotNull { j, c ->
                j.takeIf { c == des }?.also { indexes.add(it) }
            }.forEach { j ->
                dp[i][j] = 1 // push button
                var minTimes = Int.MAX_VALUE
                lastIndexes?.forEach {
                    val distance = min(abs(j - it), ring.length - abs(j - it))
                    minTimes = min(minTimes, dp[i - 1][it] + distance)
                } ?: apply {
                    dp[i][j] += min(j, ring.length - j)
                    return@forEach
                }
                dp[i][j] += minTimes
            }
            lastIndexes = indexes
        }

        var minTimes = Int.MAX_VALUE
        lastIndexes?.forEach {
            minTimes = min(minTimes, dp[key.lastIndex][it])
        }
        return minTimes
    }
}