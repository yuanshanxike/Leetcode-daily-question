package source.`2581`.统计可能的树根数目

class Solution {
    private lateinit var adjacencyList: List<List<Int>>

    fun rootCount(edges: Array<IntArray>, guesses: Array<IntArray>, k: Int): Int {
        val n = edges.size
        val adjacencyList = MutableList(n + 1) { mutableListOf<Int>() }
        edges.forEach { ints ->
            adjacencyList[ints[0]].add(ints[1])
            adjacencyList[ints[1]].add(ints[0])
        }
        this.adjacencyList = adjacencyList
        // <parent, the set saved possible children>
        val hash = HashMap<Int, MutableSet<Int>>()
        guesses.forEach { ints ->
            hash[ints[0]]?.add(ints[1])
                    ?: apply {
                        hash[ints[0]] = mutableSetOf(ints[1])
                    }
        }
        // 枚举每个节点作为根节点时，统计猜测正确的数量
        var ans = 0
        adjacencyList.forEachIndexed { index, nodes ->
            println("root_$index")
            var sum = 0
            nodes.forEach { node ->
                sum += dfs(index, node, hash)
            }
            if (k <= sum) {
                ans++
            }
        }
        return ans
    }

    // <Pair(from, dst), num of exsiting guesses>
    private val memorySearch = HashMap<Pair<Int, Int>, Int>()

    /**
     * 注意到：对于邻接的两个节点，交换父子节点关系时，树中只有这两个节点的父子关系会发生变化，而其余节点与这两个节点之间以及它们则自之间的父子关系并没有发生变化。
     * 所以，不同节点作为根节点，进行 dfs 的过程中，一定存在大量重复的搜索。
     * （更换根节点的操作，可以看作二叉树的旋转）
     * 注意到：对于 [from, dst], 以 dst 为根节点的子树，在子树上的节点没有成为根节点时，是不会被改变父子关系的；
     * 所以可以以 Pair(from, dst) 为 key，记忆化 dfs 过程中的结果。
     */
    private fun dfs(from: Int, dst: Int, hash: HashMap<Int, out Set<Int>>): Int {
        memorySearch[from to dst]?.also {
            return it
        }
        println("from: $from, to: $dst")
        var existingGuesses = if (hash[from]?.contains(dst) == true) 1 else 0
        adjacencyList[dst].forEach { node ->
            if (node != from) {
                existingGuesses += dfs(dst, node, hash)
            }
        }
        memorySearch[from to dst] = existingGuesses
        return existingGuesses
    }
}

fun main() {
    Solution().apply {
        rootCount(arrayOf(intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(1, 3), intArrayOf(4, 2)), arrayOf(intArrayOf(1, 3), intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(2, 4)), 3)
                .also(::println)
        rootCount(arrayOf(intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(2, 3), intArrayOf(3, 4)), arrayOf(intArrayOf(1, 0), intArrayOf(3, 4), intArrayOf(2, 1), intArrayOf(3, 2)), 1)
                .also(::println)
    }
}