package source.`2971`.找到最大周长的多边形

import java.util.PriorityQueue

class Solution {
    fun largestPerimeter(nums: IntArray): Long {
        val queue = PriorityQueue<Int> { a, b -> b - a }
        var sum = 0L
        nums.forEach {
            sum += it
            queue.offer(it)
        }
        while (queue.isNotEmpty()) {
            val curMax = queue.poll()
            if (curMax < sum - curMax) {
                return sum
            } else {
                sum -= curMax
            }
        }
        return -1
    }
}