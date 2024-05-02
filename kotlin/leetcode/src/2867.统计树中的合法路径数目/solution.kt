package source.`2867`.统计树中的合法路径数目

import kotlin.math.sqrt

class Solution {
    fun countPaths(n: Int, edges: Array<IntArray>): Long {
        // 通过 n 预处理，划分出合数和质数
        val isPrime = handleParime(n)
        println("isPrime: ${isPrime.toList()}")
        // 把边集数组转化成邻接表
        val adjacencyList = MutableList(n + 1) { mutableListOf<Int>() }
        edges.forEach { ints ->
            adjacencyList[ints[0]].add(ints[1])  // a -> b
            adjacencyList[ints[1]].add(ints[0])  // b -> a
        }
        // 对于所有质数节点，从节点自身出发 dfs 遍历合数节点并统计数量
        var sum = 0L
        memoryHash = LongArray(n + 1) { 0L }
        adjacencyList.forEachIndexed { index, ints ->
//            val numList = mutableListOf<Long>()
            var edgeSum = 0L // 一端是质数节点的路径总数
            ints.takeIf { isPrime[index] }?.forEach { node ->
                adjacencyList.dfs(index, node) { isPrime[it] }.also { // 超时注意
//                    numList.add(it)
                    // memory dfs
                    while (stack.isNotEmpty()) {
                        memoryHash[stack.removeLast()] = it
                    }
                    // 每次用新节点连通图的数量乘上左边所有连通图块的所有节点数量，并把这种结果不断累加，得到的就是各个连通块之间无向路径的数量
                    sum += edgeSum * memoryHash[node]  // edgeSum 中不包括 memoryHash[node]
                    edgeSum += memoryHash[node]
                }
            }
            sum += edgeSum
            println("memoryHash: ${memoryHash.toList()}")
            // @TODO 下面这种统计路径数的方法，在 leetcode 最后的两个测试用例上会超时
//            var dirEdgeSum = 0L // 与该质数节点相连的合数节点（因为题目说了是无向树，无环）及它们附件其他连通合数节点组成的点集之间相互的有向边数量
//            numList.forEachIndexed { i, l ->
//                sum += l  // 当前质数为其中一个端点的路径
//                numList.filterIndexed { j, _ -> i != j }.forEach {
//                    dirEdgeSum += it * l
//                }
//            }
//            sum += dirEdgeSum / 2L // 当前质数为路径（无向边）中间的一点
        }
        return sum
    }

    private fun handleParime(n: Int): BooleanArray {
        val primeArray = BooleanArray(n + 1) { true }
        primeArray[0] = false // 0
        primeArray[1] = false // 1
        val factor = sqrt(n.toFloat()).toInt()
        for (f in 2..factor) {
            for (times in f..n / f) { // 没必要从2开始，因为 < f 的数前面肯定被算过了
                primeArray[times * f] = false  // 合数
            }
        }
        return primeArray  // 没有被标记为合数的数字就是质数
    }

    // key: all the node of 合数区域, value: 此区域的合数节点数
    private lateinit var memoryHash: LongArray

    // 递归访问到的合数节点
    private val stack = mutableListOf<Int>()

    /**
     * 通过记忆化搜索，优化相同合数连通区域的搜索时间
     */
    private fun List<List<Int>>.dfs(from: Int, dst: Int, isPrime: (Int) -> Boolean): Long {
        if (memoryHash[dst] != 0L) return memoryHash[dst]
        if (isPrime(dst)) return 0
        println("dst: $dst")
        var num = 1L // 至少包含了 dst 这个可用节点
        this[dst].forEach {
            if (it != from && isPrime(it).not()) {
                num += dfs(dst, it, isPrime)
            }
        }
        stack.add(dst)
        return num
    }
}

fun main() {
    Solution().countPaths(5, arrayOf(intArrayOf(1, 2), intArrayOf(1, 3), intArrayOf(2, 4), intArrayOf(2, 5))).also(::println)
    Solution().countPaths(6, arrayOf(intArrayOf(1, 2), intArrayOf(1, 3), intArrayOf(2, 4), intArrayOf(3, 5), intArrayOf(3, 6))).also(::println)
    Solution().countPaths(6, arrayOf(intArrayOf(1, 2), intArrayOf(1, 3), intArrayOf(2, 4), intArrayOf(3, 5), intArrayOf(4, 6))).also(::println)
}