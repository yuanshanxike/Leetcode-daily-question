package source.`1696`.`跳跃游戏 VI`

import java.util.ArrayDeque
import java.util.PriorityQueue

class Solution {
    /**
     * 双端队列中的元素严格递减（从左往右不会出现递增，队头元素即是最大值），
     * 并且保证从左往右，对应的下标离当前可达的最远终点越来越近。
     * 且当前队列中的每一个数在这次跳跃的可达范围之内。
     */
    fun maxResult(nums: IntArray, k: Int): Int {
        val maxSums = IntArray(nums.size) { 0 }
        val queue = ArrayDeque<Int>(k)
        nums.forEachIndexed { index, i ->
            if (index == 0) {
                maxSums[0] = nums[0]
                queue.offerLast(0)
                return@forEachIndexed
            }

            // 对于每次右移一位，处理新的位置时，需要移除掉双端队列中，已经超出当前范围的位置
            while (queue.peekFirst() < index - k) {
                queue.pollFirst()
            }
            // 新位置的最大值，等于队头元素（可访问范围内的最大值）与新位置对应元素的和
            maxSums[index] = maxSums[queue.peekFirst()] + i
            // 如果新加入队列的元素足够大，后面更新的位置求最大值时，就不需要考虑范围内比它小的元素，所以队列中较小的元素从后往前出队
            while (queue.isNotEmpty() && maxSums[index] >= maxSums[queue.peekLast()]) {
                queue.pollLast()
            }
            queue.offerLast(index)
        }
        return maxSums.last()
    }

    /**
     * 用优先队列
     * O(n*logn)
     * 同时将 dp 结果也存储到 nums 中
     */
    fun maxResultAnthor(nums: IntArray, k: Int): Int {
        val queue = PriorityQueue<Pair<Int, Int>>(k) { (_ , a), (_, b) -> b - a }
        nums.forEachIndexed { index, i ->
            if (index == 0) {
                queue.offer(0 to nums[0])
                return@forEachIndexed
            }

            // 对于每次右移一位，处理新的位置时，需要移除掉优先队列中，已经超出当前范围的位置（不断操作堆的根）
            while (queue.peek().first < index - k) {
                queue.poll()
            }
            // 新位置的最大值，等于堆顶元素（可访问范围内的最大值）与新位置对应元素的和
            nums[index] = nums[queue.peek().first] + i
            
            queue.offer(index to nums[index])
        }
        return nums.last()
    }
}

fun main() {
//    Solution().apply {
//        maxResult(intArrayOf(1, -1, -2, 4, -7, 3), 2).also(::println)
//        maxResult(intArrayOf(10, -5, -2, 4, 0, 3), 3).also(::println)
//        maxResult(intArrayOf(1, -5, -20, 4, -1, 3, -6, -3), 2).also(::println)
//    }
    Solution().apply {
        maxResultAnthor(intArrayOf(1, -1, -2, 4, -7, 3), 2).also(::println)
        maxResultAnthor(intArrayOf(10, -5, -2, 4, 0, 3), 3).also(::println)
        maxResultAnthor(intArrayOf(1, -5, -20, 4, -1, 3, -6, -3), 2).also(::println)
    }
}