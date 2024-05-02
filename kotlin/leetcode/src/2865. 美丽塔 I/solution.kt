package source.`2865`.` 美丽塔 I`

import kotlin.math.max
import kotlin.math.min

class Solution {
    fun maximumSumOfHeights(maxHeights: List<Int>): Long {
        var maxSum = 0L
        maxHeights.forEachIndexed { index, i ->
            // 每次以i处作为塔群的最高点
            var sum = i.toLong()
            var p = index
            var curH = i

            fun buildTower(idx: Int) =
                    min(maxHeights[idx], curH).also {
                        sum += it
                        curH = it
                    }

            while (--p >= 0) {
                buildTower(p)
            }


            p = index
            curH = i
            while (++p < maxHeights.size) {
                buildTower(p)
            }

            maxSum = max(sum, maxSum)
        }
        return maxSum
    }
}

fun main() {
    Solution().apply {
        maximumSumOfHeights(listOf(5, 3, 4, 1, 1)).also(::println)
        maximumSumOfHeights(listOf(6, 5, 3, 9, 2, 7)).also(::println)
        maximumSumOfHeights(listOf(3, 2, 5, 5, 2, 3)).also(::println)
    }
}