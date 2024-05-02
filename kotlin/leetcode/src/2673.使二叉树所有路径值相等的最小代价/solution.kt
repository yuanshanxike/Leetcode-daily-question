package source.`2673`.使二叉树所有路径值相等的最小代价

import kotlin.coroutines.CoroutineContext
import kotlin.math.abs
import kotlin.math.max

class Solution {
    /**
     * 1.观察叶子节点，其中构成兄弟节点的，其祖先都是相同的，所以只能把较小的叶子节点增加到较大的叶子节点。这样才能使两条路径值相等;
     * 2.对于非叶子节点（非根节点）的兄弟关系节点，也是类似的情况，祖先节点都相同，要保证其值加上其所有子节点的和相等。
     * 那么综上，可以知道需要自底向上，每次保证最后t层的每一对兄弟节点，路径和相等。（t为自底向上遍历到的层数）。
     * （可以直接在题目提供的数组 cost 上操作）
     */
    fun minIncrements(n: Int, cost: IntArray): Int {
        fun leftChildIdx(i: Int) = (i + 1) * 2 - 1
        var ans = 0
        for (i in cost.lastIndex downTo 2 step 2) {
            cost[i] += cost.getOrElse(leftChildIdx(i)) { 0 }
            cost[i - 1] += cost.getOrElse(leftChildIdx(i - 1)) { 0 }
            ans += abs(cost[i] - cost[i - 1])
            cost[i - 1] = max(cost[i - 1], cost[i])  // 将节点及其子节点累加结果的最大值储存在左兄弟
        }
        return ans
    }
}

fun main() {
    Solution().apply {
        minIncrements(7, intArrayOf(1, 5, 2, 2, 3, 3, 1)).also(::println)
        minIncrements(3, intArrayOf(5, 3, 3)).also(::println)
    }
}