package source.`1976`.到达目的地的方案数

import java.util.PriorityQueue

class Solution {
    private data class Path(
        val distance: Int, //与原点的距离
        val x: Int, // 节点号
    )

    /**
     * 时间复杂度：O(n^2)
     * 解释：对于每个(n)刚找到设为已访问的节点，都需要遍历一遍未访问节点(n)，找到剩下节点中距离源点最近节点
     * @TODO: 通过优先队列来优化 Dijkstra 算法（图为稀疏图时候才有优化作用）
     */
    fun countPaths(n: Int, roads: Array<IntArray>): Int {
        val g = Array(n) { i ->  // 邻接矩阵
            LongArray(n) { j ->
                // 对于每个顶点，到自身的距离都是0，到其它的距离初始化为 MAX_VALUE
                if (i == j) 0L else Long.MAX_VALUE / 2 // 防止溢出(timei < Int.MAX_VALUE)
            }
        }
        // 将已知边的距离更新到最短距离的数组中
        roads.forEach {
            g[it[0]][it[1]] = it[2].toLong()
            g[it[1]][it[0]] = it[2].toLong()
        }

        // 根据距离排序的优先队列
        val priorityQue = PriorityQueue<Path> { a, b -> a.distance - b.distance }
        // 根据键值进行升序排序的 TreeMap（内部实现是红黑树）
        // key: distance; value: num of cur distance
//        val treeMap = sortedMapOf<Long, Long>()

        // Dijkstra
        // dis[i] 表示从原点到 i 点的最短路径
        val dis = LongArray(n) { Long.MAX_VALUE / 2 }  // 防止溢出
        val done = BooleanArray(n) { false } // 已经确定最短距离的点
        val ways = IntArray(n) { 0 } // ways[i]， 表示从原点到节点 i 共有的最短路径条数
        dis[0] = 0L
        done[0] = true
        ways[0] = 1
        var x = 0
        while (done[n - 1].not()) {
            var next = -1
            var minDis = Long.MAX_VALUE
            for (y in 0 until n) {
                if (done[y]) continue
                val newDis = dis[x] + g[x][y]
                println("newDis: $newDis")
                if (newDis < dis[y]) {
                    dis[y] = newDis
                    ways[y] = ways[x]  // 找到更短的路径，需要把路径数更新为较短距离对应的路径数
                } else if (newDis == dis[y]) { // 与当前最短的距离相同
                    ways[y] = (ways[y] + ways[x]) % (1_000_000_000 + 7)  // 加上这个节点对应的最短路径数
                }
                if (dis[y] < minDis) {
                    minDis = dis[y]
                    next = y
                }
            }

            x = next
            done[x] = true
        }

        println(dis.toList())

        return ways[n - 1]
    }
}

fun main() {
    Solution().apply {
        countPaths(
            7,
            arrayOf(
                intArrayOf(0, 6, 7),
                intArrayOf(0, 1, 2),
                intArrayOf(1, 2, 3),
                intArrayOf(1, 3, 3),
                intArrayOf(6, 3, 3),
                intArrayOf(3, 5, 1),
                intArrayOf(6, 5, 1),
                intArrayOf(2, 5, 1),
                intArrayOf(0, 4, 5),
                intArrayOf(4, 6, 2)
            )
        ).also { println(it) }
    }
}