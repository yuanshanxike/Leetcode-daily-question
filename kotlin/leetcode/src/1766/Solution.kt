package `1766`

import kotlin.math.max
import kotlin.math.min

class Solution {
    fun getCoprimes(nums: IntArray, edges: Array<IntArray>): IntArray {
        val n = nums.size
        val coprimeList = Array<MutableList<Int>>(MAX_NUM + 1) { mutableListOf() }
        for (i in 1 .. MAX_NUM) {
            for (j in 1 .. MAX_NUM) {
                if (i.isCoprimes(j)) coprimeList[i].add(j)
            }
        }
//        val tree = IntArray(n) { -1 }
//        var leafSet = mutableSetOf<Int>()
//        var forkSet = mutableSetOf<Int>()
//        edges.forEach { (from, to) ->
//            if (leafSet.contains(to).not()) {
//                leafSet.add(to)
//            }
//            if ()
//        }
//        4.isCoprimes(2).also(::println)

        val g = Array<MutableList<Int>>(n) { mutableListOf() }
        edges.forEach { (from, to) ->
            g[from].add(to)
            g[to].add(from)
        }

        val depthIdList = Array<Pair<Int, Int>>(MAX_NUM + 1) { 0 to 0 }
        val ans = IntArray(n) { -1 }

        fun dfs(x: Int, fa: Int, depth: Int) {
            val value = nums[x]
            var maxDepth = 0
            for (coprime in coprimeList[value]) {
                val (depth, id) = depthIdList[coprime]
                if (depth > maxDepth) {
                    maxDepth = depth
                    ans[x] = id
                }
            }

            val temp = depthIdList[value]  // 在递归回退节点时，需要恢复数值对应的最近互质公共祖先深度和编号
            depthIdList[value] = depth to x

            for (child in g[x]) {
                if (child != fa) {
                    dfs(child, x, depth + 1)
                }
            }

            depthIdList[value] = temp
        }

        dfs(0, -1, 1) // root == 0

        return ans
    }
    
    private fun Int.isCoprimes(another: Int): Boolean {
        var a = max(this, another);
        var b = min(this, another)
        while (b != 0) {
            val temp = a
            a = b
            b = temp % b
        }
        return a == 1
    }

    private fun IntArray.findMaxIndex(): Int {
        var maxVal = 0
        var idx = -1
        forEachIndexed { index, i ->
            if (maxVal > i) {
                maxVal = i
                idx = index
            }
        }
        return idx
    }

    companion object {
        private const val MAX_NUM = 50
    }
}

fun main() {
    Solution().getCoprimes(intArrayOf(), emptyArray())
}