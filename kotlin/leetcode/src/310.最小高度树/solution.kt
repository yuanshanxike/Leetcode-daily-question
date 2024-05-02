package source.`310`.最小高度树

import kotlin.math.max

class Solution {
    /**
     * 换根 dp （对 O（n^2）的复杂度进行了剪枝）
     * [如果树的形状为高度为1的树（n-1叉树）时，效率最差]
     */
    fun findMinHeightTrees0(n: Int, edges: Array<IntArray>): List<Int> {
        // index 代表树的高度；heightRoot[index] 代表高度为 index 时，对应的可能的根节点编号数组
        val heightRoot = Array(n) { mutableListOf<Int>() }
        // edges 转为 邻接表
        val adjacencyList = Array(n) { mutableListOf<Int>() }
        edges.forEach { (a, b) ->
            adjacencyList[a].add(b)
            adjacencyList[b].add(a)
        }
        // 每个节点在当前编号的根（初始是 node 0）下的高度
        val heights = IntArray(n)
        // visited for init dfs
        var visited = BooleanArray(n) { false }

        // init dfs from node 0
        fun dfs(node: Int): Int {
            if (visited[node]) return -1
            visited[node] = true
            var maxChildHeight = -1
            adjacencyList[node].forEach { t ->
                maxChildHeight = max(maxChildHeight, dfs(t))
            }
            heights[node] = maxChildHeight + 1
            return heights[node]
        }

        val height0 = dfs(0)
        heightRoot[height0].add(0)
        // 换根 dp
        visited = BooleanArray(n) { false }
        fun rootDfs(node: Int) {
            if (visited[node]) return
            println("root: $node, ")
            visited[node] = true
            // 分别与其邻接的节点换根
            adjacencyList[node].filter { visited[it].not() }.forEach { t ->
                // root: node, clhild: t -> root: t, clhild: node
                val temp = heights[node]
                val temp1 = heights[t]
                var maxChildHeight = -1
                adjacencyList[node].forEach { child ->
                    if (t != child) {
                        // 从非交换的其他子节点中选出最大子孩子高度
                        maxChildHeight = max(maxChildHeight, heights[child])
                    }
                }
                heights[node] = maxChildHeight + 1
                heights[t] = max(heights[t], heights[node] + 1)
                println("t: $t, node: $node")
                heightRoot[heights[t]].add(t)
                rootDfs(t)
                heights[node] = temp
                heights[t] = temp1
            }
        }
        rootDfs(0)
        println(heightRoot.toList())
        heightRoot.forEach {
            if (it.isNotEmpty()) return it
        }
        return emptyList()
    }

    /**
     * 「拓扑排序」 O(n)
     *
     * 需要知道的是：
     * "设 dist[x][y] 表示从节点 x 到节点 y 的距离，假设树中距离最长的两个节点为 (x,y)，它们之间的距离为 maxdist=dist[x][y]，
     * 则可以推出以任意节点构成的树最小高度一定为 minheight=⌈maxdist/2⌉，且最小高度的树根节点一定在节点 x 到节点 y 的路径上。"
     *
     * 拓扑排序：
     * 由于树的高度由根节点到叶子节点之间的最大距离构成，假设树中距离最长的两个节点为 (x,y)，它们之间的距离为 maxdist=dist[x][y]，
     * 假设 x 到 y 的路径为 x → p(1) → p(2) → ⋯ → p(k−1) → p(k) → y ，
     * 根据方法一的证明已知最小树的根节点一定为该路径中的中间节点，我们尝试删除最外层的度为 1 的节点 x,y 后，
     * 则可以知道路径中与 x,y 相邻的节点 p(1),p(k) 此时也变为度为 1 的节点，
     * 此时我们再次删除最外层度为 1 的节点直到剩下根节点为止。
     */
    fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {
        if (n == 1) return listOf(0)
        val adjacencyList = Array(n) { mutableListOf<Int>() }
        val degree = IntArray(n) { 0 }
        edges.forEach { (a, b) ->
            adjacencyList[a].add(b)
            adjacencyList[b].add(a)
            degree[a]++
            degree[b]++
        }
        val queue = ArrayDeque<Int>()  // 每次只有度(degree)为1的节点可以入队
        for (i in 0 until n) {
            if (degree[i] == 1) queue.addLast(i)
        }
        var remain = n
        while (remain > 2) {
            remain -= queue.size
            repeat(queue.size) {
                val removeNode = queue.removeFirst()
                degree[removeNode]--  // 被删除节点的度变为 0
                adjacencyList[removeNode].forEach { node ->
                    if (degree[node] > 0) degree[node]--  // 与被删除节点相邻的节点的度都要 -1，但已经被删除的节点除外
                    if (degree[node] == 1) queue.addLast(node)
                }
            }
        }
        return queue
    }
}

fun main() {
    Solution().apply {
        findMinHeightTrees(
            6,
            arrayOf(intArrayOf(3, 0), intArrayOf(3, 1), intArrayOf(3, 2), intArrayOf(3, 4), intArrayOf(5, 4))
        ).also(::println)
        findMinHeightTrees(
            1,
            arrayOf()
        ).also(::println)
        findMinHeightTrees(
            3,
            arrayOf(intArrayOf(0, 1), intArrayOf(0, 2))
        ).also(::println)
    }
}