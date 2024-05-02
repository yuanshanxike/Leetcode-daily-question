package source.`LCP 24`.数字游戏

import java.util.PriorityQueue

private const val MOD = 1_000_000_007L

class Solution {
    fun numsGame(nums: IntArray): IntArray {
        val optArr = IntArray(nums.size) { 0 } // ans
        val left = PriorityQueue<Int> { o1, o2 -> o2 - o1 } // 大根堆，维护较小的一半数据
        val right = PriorityQueue<Int>() // 小根堆，维护较大的一半数据
        var leftSum = 0L
        var rightSum = 0L
        nums.forEachIndexed { index, i ->
            val c = i - (index + 1) // 算点所在直线的纵截距，来代表直线（降维）
            var top = c
            if (index % 2 == 0) { // 前缀长度是奇数, 两个对顶堆在插入新数据前大小相等
                if (left.isNotEmpty() && c < left.peek()) {
                    leftSum -= left.peek() - c
                    left.offer(c)
                    top = left.poll()
                }
                rightSum += top
                right.offer(top)
                // 中位数是小根堆的栈顶元素
                optArr[index] = ((rightSum - leftSum - right.peek()) % MOD).toInt()
            } else { // 前缀长度是偶数, left.size = right.size - 1
                if (right.peek() < c) {
                    rightSum += c - right.peek()
                    right.offer(c)
                    top = right.poll()
                }
                leftSum += top
                left.offer(top)
                // 中位数是两个堆的堆顶元素
                optArr[index] = ((rightSum - leftSum) % MOD).toInt()
            }
        }
        return optArr
    }
}

fun main() {
    Solution().apply {
        numsGame(intArrayOf(3, 4, 5, 1, 6, 7)).toList().also(::println)
        numsGame(intArrayOf(1, 2, 3, 4, 5)).toList().also(::println)
        numsGame(intArrayOf(1, 1, 1, 2, 3, 4)).toList().also(::println)
    }
}