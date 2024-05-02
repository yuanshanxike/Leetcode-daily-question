package source.`2583`.`二叉树中的第 K 大层和`

import java.util.PriorityQueue

class Solution {
    val aa = 5

    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun kthLargestLevelSum(root: TreeNode?, k: Int): Long {
        // 对顶堆
//        val minHeap = PriorityQueue(Comparator.comparingLong(Long::unaryMinus)) // 大顶堆
        val maxHeap = PriorityQueue<Long>(k)  // 小顶堆
        val levelQueue = ArrayDeque<TreeNode>()
        root?.also(levelQueue::add)
        while (levelQueue.isNotEmpty()) {
            var sum = 0L
            repeat(levelQueue.size) {
                levelQueue.removeFirst().apply {
                    sum += `val`
                    left?.also(levelQueue::add)
                    right?.also(levelQueue::add)
                }
            }
            if (maxHeap.size < k) {
                maxHeap.offer(sum)
            } else if (sum >= maxHeap.peek()) {
                maxHeap.poll()
                maxHeap.offer(sum)
            }
        }
        return if (maxHeap.size < k) -1 else maxHeap.peek()
    }
}

fun main() {
//    val a = Solution::aa
//    val b = a.get()
//    Solution<Long>().kthLargestLevelSum(null, 0, 30L)
//    println(20.inv())
}