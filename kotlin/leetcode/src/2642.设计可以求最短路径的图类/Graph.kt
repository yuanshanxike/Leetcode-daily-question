package source.`2642`.设计可以求最短路径的图类

import kotlin.math.min

/**
 * 最短路：
 * Dijkstra 算法 （addEdge 时间复杂度为 O(1)，适用于调用 addEdge 比较多的场景）
 * 分为 朴素 Dijkstra 和 堆优化 Dijkstra (主要是优化稀疏图)
 * 
 * 这里使用朴素的算法实现
 */
class Graph(private val n: Int, edges: Array<IntArray>) {

    private data class Vec(
        val to: Int,
        val cost: Int
    )

    private val adj = Array(n) { mutableListOf<Vec>() }

    private val distMap = mutableMapOf<Pair<Int, Int>, Int>()

    init {
        edges.forEach { (from, to, cost) ->
            adj[from].add(Vec(to, cost))
        }
        initDistMap()
    }

    /**
     * 单源最短路径
     */
    private fun dijkstra(source: Int) {
        val visited = BooleanArray(n) { false }
        val dists = IntArray(n) { idx -> if (idx == source) 0 else Int.MAX_VALUE }
        var next = source
        while (true) {
            // find the unvisited min dist target node and visited
            var minDist = Int.MAX_VALUE
            dists.forEachIndexed { idx, dist ->
                if (visited[idx].not() && dist < minDist) {
                    minDist = dist
                    next = idx
                }
            }
            if (minDist == Int.MAX_VALUE) break  // 走投无路
            visited[next] = true  // visited

            // update distance
            adj[next].forEach { (to, cost) ->
                dists[to] = min(dists[next] + cost, dists[to])
            }
        }
        // memory
        dists.forEachIndexed { target, dist ->
            if (target != source) {
                distMap[source to target] = dist
            }
        }
    }

    private fun initDistMap() {
        repeat(n) {
            distMap[it to it] = 0
        }
    }

    /**
     * 等会看一下是否需要清空？
     */
    private fun clear() {
        distMap.clear()
        initDistMap()
    }

    fun addEdge(edge: IntArray) {
        clear()
        val (from, to, cost) = edge
        adj[from].add(Vec(to, cost))
    }

    fun shortestPath(node1: Int, node2: Int): Int {
        val path = node1 to node2
        if (distMap.containsKey(path).not()) {
            dijkstra(node1)
        }
        return distMap[path]?.takeIf { it != Int.MAX_VALUE } ?: -1
    }

}