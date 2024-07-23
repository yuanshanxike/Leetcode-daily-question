package `3011`.判断一个数组是否可以变为有序

import kotlin.math.max

class Solution3011 {
    /**
     * 将原数组中，连续的且 bit_count 相同的数归到一个分组中，
     * 这些分组内的数字之间相互可以进行冒泡排序而变得有序。
     * 只需要满足后面分组中所有数字比前一个分组中的最大值大就可以使得整个数组有序。
     * (实际实现时不需要真的分组，只需要记录关键的几个变量即可)
     */
    fun canSortArray(nums: IntArray): Boolean {
        var lastMax = 0
        var curMax = nums.first()
        var curBitCnt = nums.first().countOneBits()
        for (i in 1 until nums.size) {
            val num = nums[i]
            if (num.countOneBits() == curBitCnt) { // 同一组
                if (num < lastMax) return false
                curMax = max(curMax, num)
            } else if (num >= curMax) { // 组别变更
                curBitCnt = num.countOneBits()
                lastMax = curMax
                curMax = num
            } else return false
        }
        return true
    }
}

fun main() {
    Solution3011().apply {
        println(canSortArray(intArrayOf(8,4,2,30,15)))
        println(canSortArray(intArrayOf(1,2,3,4,5)))
        println(canSortArray(intArrayOf(3,16,8,4,2)))
    }
}