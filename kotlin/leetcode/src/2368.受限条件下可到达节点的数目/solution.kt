package source.`2368`.`受限条件下可到达节点的数目`

class Solution {
    private lateinit var g: Array<out List<Int>>

    private lateinit var restrictedSet: BooleanArray

    fun reachableNodes(n: Int, edges: Array<IntArray>, restricted: IntArray): Int {
        val g = Array(n) { mutableListOf<Int>() }
        edges.forEach { ints ->
            g[ints[0]].add(ints[1])
            g[ints[1]].add(ints[0])
        }
        this.g = g
        restrictedSet = BooleanArray(n) { false }
        restricted.forEach {
            restrictedSet[it] = true
        }
        var sum = 1 // 0
        g[0].forEach {
            if (restrictedSet[it].not()) {
                sum += dfs(0, it)
            }
        }
        return sum
    }

    private fun dfs(from: Int, dst: Int): Int {
        var sum = 1  // dst
        g[dst].forEach {
            if (it != from && restrictedSet[it].not()) {
                sum += dfs(dst, it)
            }
        }
        return sum
    }
}

/**********通过 并查集 实现**********/
class SolutionByDisjointSet {

    private class DisjointSet(n: Int) {
        private val forest = IntArray(n) { it }

        private val rank = IntArray(n) { 0 }

        fun merge(x: Int, y: Int): Int {
            val xRoot = find(x)
            val yRoot = find(y)
            if (xRoot == yRoot) return xRoot
            return if (rank[xRoot] <= rank[yRoot]) {
                forest[xRoot] = yRoot
                rank[yRoot]++
                yRoot
            } else { // rank[xRoot] > rank[yRoot]
                forest[yRoot] = xRoot
                rank[xRoot]++
                xRoot
            }
        }

        fun find(x: Int): Int = if (forest[x] != x) find(forest[x]) else x

        fun count(): Int {
            println("${forest.toList()}")
            val root = find(0)
            var count = 0
            forest.forEach {
                if (find(it) == root) {
                    count++
                }
            }

            return count
        }
    }

    fun reachableNodes(n: Int, edges: Array<IntArray>, restricted: IntArray): Int {
        val restrictedSet = BooleanArray(n) { false }
        restricted.forEach {
            restrictedSet[it] = true
        }
        val unionFindSet = DisjointSet(n)
        edges.filter { restrictedSet[it[0]].not() && restrictedSet[it[1]].not() }.forEach { ints ->
            unionFindSet.merge(ints[0], ints[1])
        }
        return unionFindSet.count()
    }
}

fun main() {
    SolutionByDisjointSet().apply {
        reachableNodes(
            7,
            arrayOf(
                intArrayOf(0, 1),
                intArrayOf(1, 2),
                intArrayOf(3, 1),
                intArrayOf(4, 0),
                intArrayOf(0, 5),
                intArrayOf(5, 6)
            ),
            intArrayOf(4, 5)
        ).also(::println)
        reachableNodes(
            7,
            arrayOf(
                intArrayOf(0, 1),
                intArrayOf(0, 2),
                intArrayOf(0, 5),
                intArrayOf(0, 4),
                intArrayOf(3, 2),
                intArrayOf(6, 5)
            ),
            intArrayOf(4, 2, 1)
        ).also(::println)
    }
}