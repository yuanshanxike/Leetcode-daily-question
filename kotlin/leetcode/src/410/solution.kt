package source

import kotlin.math.abs
import kotlin.math.max
import kotlin.math.roundToInt

/**
 * 前缀和、均分原理、数学期望、方差最小
 * [7, 2, 5, 10, 8]
 * sum of prefix[7, 9, 14, 24, 32]
 */
class Solution {
    /**
     * @return index of finded num
     */
    private fun IntArray.binarySearch(p: Int, l: Int, r: Int): Int {
        if (abs(r - l) <= 1) {
            if (abs(this[l] - p) <= abs(this[r] - p))
                return l
            else
                return r
        }


        val m = (l + r) / 2
        println("m: $m; l: $l; r: $r; p: $p")
        return when {
            this[m] < p -> binarySearch(p, m + 1, r)
            p < this[m] -> binarySearch(p, l, m - 1)
            else -> m
        }
    }

    fun splitArray(nums: IntArray, k: Int): Int {
        var sum = 0
        val prefixSums = IntArray(nums.size + 1) { index ->
            if (index - 1 in nums.indices) {
                sum += nums[index - 1]
                sum
            } else 0
        }

        // delete
        println(prefixSums.toList())

        var left = 0
        var maxSum = 0
        repeat(k) { i ->
            val lastPrefixSum = prefixSums[left]
            val findNum = (sum.toFloat() / k.toFloat() * (i + 1).toFloat()).roundToInt()
            left = prefixSums.binarySearch(findNum, left, prefixSums.size - 1)
            println("index: $left")
            maxSum = max(maxSum, prefixSums[left] - lastPrefixSum)
        }
        return maxSum
    }
}

fun main() {
    println(Solution().splitArray(intArrayOf(7, 2, 5, 10, 8), 3))
//    println(Solution().splitArray(intArrayOf(1, 2, 3, 4, 5), 2))
//    println(Solution().splitArray(intArrayOf(1, 4, 4), 3))
}
