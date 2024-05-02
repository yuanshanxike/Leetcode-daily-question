package source.`1686`.`石子游戏 VI`

class Solution {
    /**
     * 对于同一颗石子，双方的价值总和越大，代表着如果拿了这颗石子之后，
     * 就越能和对方拉开更大的差距（自己获得的分数 + 对方失去的分数）
     *
     * 将对应下标的元素组成 Pair，用两个元素的和为比较项进行排序（降序），
     * 然后计算下标为奇数项的和为 Alice 的分数，下表为偶数项的和为 Bob 的分数，再进行比较
     */
    fun stoneGameVI(aliceValues: IntArray, bobValues: IntArray): Int {
        aliceValues.mapIndexed { index, i -> i to bobValues[index] }
                .sortedByDescending { (a, b) -> a + b }
                .also {
                    var aliceScore = 0
                    var bobScore = 0

                    for (i in 0 until it.size step 2) {
                        aliceScore += it[i].first
                    }
                    for (i in 1 until it.size step 2) {
                        bobScore += it[i].second
                    }
                    return if (aliceScore > bobScore)
                        1
                    else if (aliceScore == bobScore)
                        0
                    else
                        -1
                }
    }
}

/**
 * 8 9 // 3
 * 7 2 // 12
 *
 * 8 6 1  10
 * 7 9 14 5
 *
 * 10+8=18  1+6=7
 * 14+9=23  7+5=12
 */

fun main() {
    Solution().apply {
        stoneGameVI(intArrayOf(1, 3), intArrayOf(2, 1)).also(::println)
        stoneGameVI(intArrayOf(1, 2), intArrayOf(3, 1)).also(::println)
        stoneGameVI(intArrayOf(2, 4, 3), intArrayOf(1, 6, 7)).also(::println)
    }
}