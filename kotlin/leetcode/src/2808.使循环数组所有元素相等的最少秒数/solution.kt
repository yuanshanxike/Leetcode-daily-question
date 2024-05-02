package source.`2808`.使循环数组所有元素相等的最少秒数

import kotlin.math.max
import kotlin.math.min

class Solution {
    /**
     * 在数组中，分布越广泛和均匀的数字。
     * 使得全部变成其的速度越快。
     * 所以需要找寻的是相邻两个元素之间间距的最大值最小的数字
     * （跨越数组头尾的间距也需要考虑）
     */
    fun minimumSeconds(nums: List<Int>): Int {
        val lastIndexHash = hashMapOf<Int, Int>() // 记录数字上次出现的位置
        val maxSpaceHash = hashMapOf<Int, Int>() // 记录每个数字在数组nums中的最大间距
        val firstIndexHash = hashMapOf<Int, Int>() // 记录数字第一次出现的位置（与最后一次出现的位置一起计算距离）
//        val lastIndexHash = IntArray(Int.MAX_VALUE) { -1 } // 记录数字上次出现的位置
//        val maxSpaceHash = IntArray(Int.MAX_VALUE) { 0 } // 记录每个数字在数组nums中的最大间距
//        val firstIndexHash = IntArray(Int.MAX_VALUE) { -1 } // 记录数字第一次出现的位置（与最后一次出现的位置一起计算距离）
        nums.forEachIndexed { index, i ->
            lastIndexHash[i]?.also {
                maxSpaceHash[i] = max(maxSpaceHash[i] ?: 0, index - it)
            } ?: apply {
                firstIndexHash[i] = index
            }
//            if (lastIndexHash[i] != null) {
//                maxSpaceHash[i] = max(maxSpaceHash[i], index - lastIndexHash[i])
//            } else {
//                firstIndexHash[i] = index
//            }
            lastIndexHash[i] = index
        }

        var minSpace = Int.MAX_VALUE
//        maxSpaceHash.forEachIndexed { index, i ->
//            val maxSpace = max(i, nums.size - (lastIndexHash[index] - firstIndexHash[index]))
//            minSpace = min(maxSpace, maxSpace)
//        }
        maxSpaceHash.entries.takeIf { it.size > 0 }?.forEach { (index, i) ->
            val maxSpace = max(i, nums.size - (lastIndexHash[index]!! - firstIndexHash[index]!!))
            minSpace = min(minSpace, maxSpace)
        } ?: return nums.size / 2 // 全部数字各只有一个

        return minSpace / 2
    }
}

fun main() {
    Solution().minimumSeconds(listOf(1, 2, 1, 2)).also(::println)
    Solution().minimumSeconds(listOf(2, 1, 3, 3, 2)).also(::println)
    Solution().minimumSeconds(listOf(5, 5, 5, 5)).also(::println)
    Solution().minimumSeconds(listOf(4, 18)).also(::println)
}