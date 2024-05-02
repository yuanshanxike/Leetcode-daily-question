package source.`LCP 30`.魔塔游戏

import java.util.PriorityQueue

/**
 * 通过不要第 0 项的前缀和来保存顺序访问时小扣的额外生命值；
 * 遇到 nums[i] 为负数时，就加入到 优先队列中(小根堆)；
 * 留意顺序访问时遇到的生命值的局部负数最低点；
 * 此时将优先队列的堆顶元素不断出队，记录他们的绝对值累加和；
 * 在后续遇到局部最小前缀和时，先把其加上累加和看是否大于0，要是依然小于零，则需要再次执行堆顶元素出栈的操作，直到结果大于0。出栈元素同样需要将其绝对值加入到累加和中;
 * 每次栈顶元素出栈时，都需要进行计数；
 * 如果最后前N项的和小于0，则返回 -1；否则返回计数的值
 *
 */
class Solution {
//    fun magicTower(nums: IntArray): Int {
//        var times = 0
//        var pollSum = 0L
//        val sums = LongArray(nums.size) { 0 } // 每次只会用到 i 和 i - 1 所以可以优化空间，不需要整个前缀和数组
//        val queue = PriorityQueue<Int>()
//        sums[0] = nums[0].toLong()
//        if (nums[0] < 0) queue.offer(nums[0])
//        for (i in 1 until nums.size) {
//            sums[i] = sums[i - 1] + nums[i]
//            if (nums[i] < 0) {
//                queue.offer(nums[i])
//            } else if (nums[i] > 0 && sums[i - 1] < 0) { // 局部最小值
//                while (pollSum + sums[i - 1] < 0) {
//                    pollSum -= queue.poll()
//                    times++
//                }
//            }
//        }
//        return if (sums.last() < 0) -1 else times
//    }

    fun magicTower(nums: IntArray): Int {
        var times = 0
        var pollSum = 0L
        var prefixSum = 0L
        val queue = PriorityQueue<Int>()
        prefixSum = nums[0].toLong()
        if (nums[0] < 0) queue.offer(nums[0])
        for (i in 1 until nums.size) {
            val lastSum = prefixSum
            prefixSum += nums[i]
            if (nums[i] < 0) {
                queue.offer(nums[i])
            } else if (nums[i] > 0 && lastSum < 0) { // 局部最小值
                while (pollSum + lastSum < 0) {
                    pollSum -= queue.poll()
                    times++
                }
            }
        }
        return if (prefixSum < 0) -1 else times
    }
}

fun main() {
    Solution().apply {
        magicTower(intArrayOf(100, 100, 100, -250, -60, -140, -50, -50, 100, 150)).also(::println)
        magicTower(intArrayOf(-200, -300, 400, 0)).also(::println)
    }
}