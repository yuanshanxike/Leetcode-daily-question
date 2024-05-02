package source.`2642`.设计可以求最短路径的图类

import kotlin.math.min

/**
 * 最短路：
 * Floyd 算法 （shortestPath 时间复杂度为 O(1)，适用于调用 shortestPath 比较多的场景）
 * 时间复杂度：
 * 初始化: O(n^3)
 * addEdge: O(n^2)  *设：新添加边的数据为(x, y, edgeCost)。如果 edgeCost >= f[x][y], 则不需要更新任何数据；否则，通过 f[i][j] = min(f[i][j], f[i][x] + edgeCost + f[y][j])，来更新可能的最小值
 */
class GraphFloyd(n: Int, edges: Array<IntArray>) {
    private val inf = Int.MAX_VALUE / 3 // 除于3是为了保证 Floyd 算法在进行数字相加时不溢出，同时也保证了比题目给的数值上限大

    private val f = Array(n) { i -> IntArray(n) { j -> if (i == j) 0 else inf } }

    private val indices = 0 until n

    init {
        edges.forEach { (from, to, cost) ->
            f[from][to] = cost
        }

        floyd(n)
    }

    /**
     * 初始化用
     * O(n^3)
     */
    private fun floyd(n: Int) {
        for (k in indices) { // 可经过的中间节点 [0,1,..,k]
            singleFloyd(k, k)
        }
    }

    /**
     * 新增边调用
     * O(n^2)
     *
     * @param from 有向边的起点
     * @param to 有向边的终点
     * @param cost 有向边的权值
     *
     * 特别地，from == to 表示为一个点而非传统意义上的有向边，主要用于初始化
     */
    private fun singleFloyd(from: Int, to: Int, cost: Int = 0) {
        val internalCost = if (from == to) 0 else cost
        for (i in indices) { // from
            for (j in indices) { // to
                f[i][j] = min(f[i][j], f[i][from] + internalCost + f[to][j])
            }
        }
    }

    fun addEdge(edge: IntArray) {
        val (from, to, cost) = edge
        if (f[from][to] > cost) { // 只有新的有向边的 cost 小于 当前的 from 到 to 的距离，才需要计算
            singleFloyd(from, to, cost)
        }
    }

    fun shortestPath(node1: Int, node2: Int): Int = f[node1][node2].takeIf { it < inf } ?: -1
}