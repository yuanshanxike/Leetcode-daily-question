package source.`410`.分割数组的最大值

import kotlin.math.max

class Solution {
    /**
     * the k in the [max(nums), sum(nums)]
     * 所以可以直接通过二分查找在这个区间不断估值（尽可能地去找能让子区间总和小，并且满足分组数量不超过k的情况）
     * 因为即使分出的组数小于k，也可以通过继续分组来到达k。（继续分组只会使得总值变得更小）
     *
     * 分组越多，越能使得子数组和的最大值越小。所以这里计算的是“至少要分多少组，才能使得子数组和的最大值不超过XX”
     */
    fun splitArray(nums: IntArray, k: Int): Int {
        // find max(nums) & sum(nums)
        var sum = 0L
        var max = 0L
        nums.forEach {
            sum += it.toLong()
            max = max(it.toLong(), max)
        }

        var l = max
        var r = sum
        while (l < r) { //在理论上的取值范围内，根据现实给出的条件，经过不断验证，缩小实际的取值范围，直到区间变成一个点
            val mid = l + (r - l) / 2 //溢出防止
            val x = nums.needGroupNum(mid)
            if (x > k) { // 分组不够，找的值（mid）太小了
                l = mid + 1
            } else { // 至少需要的分组数小于实际分组数，说明找到的值（mid）**可能**会大了一些
                r = mid // 不能排除当前猜到的值（mid）就不是最大子数组和的情况
                /**
                 * （可以用相同袋子装不同体积水袋的模型去理解）
                 * x < k :
                 * （就比如有2个袋子[x = 2]装满了体积为每个袋子容积一半的水袋，这时候再拿来一个袋子，也不能改变3个袋子[k = 3]中有一个必须被装满的现状）
                 * x == k :
                 * （上面的例子，2个袋子的容积再扩大一点点，找到的子数组最大和现在变成了扩大后袋子的容积，那此时找到的值也不是最小值，因为他还有减小的空间（就是那一点点））
                 */
            }
        }
        return r.toInt()
    }

    /**
     * 贪心地去装数字，因为这里需要的是“至少需要多少组”，对于已知最大和的情况下
     *
     * 可以把组看成相同的袋子，而分组和的最大值看成是袋子的容量。
     * 这么大的袋子装这些数，至少需要几个？
     */
    fun IntArray.needGroupNum(limit: Long): Int {
        var subSum = 0L
        var x = 1 //需要的组数
        forEach {
            subSum += it.toLong()
            if (subSum > limit) {
                x++
                subSum = it.toLong()  // 如果加入不到之前的组里，就把它作为第一个元素加入到新的组里
            }
        }
        return x
    }
}

fun main() {
    println(Solution().splitArray(intArrayOf(7, 2, 5, 10, 8), 2))
    println(Solution().splitArray(intArrayOf(1, 2, 3, 4, 5), 2))
    println(Solution().splitArray(intArrayOf(1, 4, 4), 3))
}