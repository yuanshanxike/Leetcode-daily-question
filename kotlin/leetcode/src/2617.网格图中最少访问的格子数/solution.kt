package source.`2617`.网格图中最少访问的格子数

import java.util.PriorityQueue
import kotlin.math.min

class Solution {
    /**
     * brute force (TLE)
     * O(mn(m+n))
     */
    @OptIn(ExperimentalUnsignedTypes::class)
    fun minimumVisitedCells0(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        val visit = Array(m) { UIntArray(n) { UInt.MAX_VALUE } } // UInt.MAX_VALUE = -1 (Int)value
        visit[0][0] = 1u
        grid.forEachIndexed { i, ints ->
            ints.forEachIndexed forEach@{ j, num ->
                if (visit[i][j] == UInt.MAX_VALUE) return@forEach
                for (row in min(num + i, m - 1) downTo i + 1) {
                    visit[row][j] = min(visit[row][j], visit[i][j] + 1u)
                }
                for (col in min(num + j, n - 1) downTo j + 1) {
                    visit[i][col] = min(visit[i][col], visit[i][j] + 1u)
                }
            }
        }
        return visit[m - 1][n - 1].toInt()
    }

//    /**
//     * 先不看格子中的数值（假设可以任意指定），根据移动规则:
//     * 如果能够到达，从左上移动到右下的格子数的下限为 3，上限为 m + n - 1，所以取值范围在 [3, m+n-1]。
//     * 如果移动格子数最少（恰好为 3），那么必然是第一次可以右移 m - 1 (或下移 n - 1)，第二次下移 n - 1 (或右移 m - 1)；
//     * 如果移动的格子数达到上限（为 m+n-1），那么除最后一格外，grid 的值都是 1。
//     *
//     * 总的距离，或者说跨越过的格子(包含未访问到的)总数为 m + n - 1 ,是不会变的，
//     * 所以我们可以知道对于每个格子 grid[i][j]，其距离可以表示为 i + j + 1 (与坐标之和成正比)。
//     * 如果各网格（节点）间的路径是稠密图，那么每次我们要尽量走远一些，才能尽可能地通过最少的格子到达右下角。
//     * 按照这个思路，我们我已通过设计一个优先队列(按距离降序)，从最远能访问到的格子开始检查是否能到达最右下的格子；
//     * 对于每个递归搜索到的格子(i, j)，将横向的 min(m - 1 - i, grid[i][j]) 个格子 和 纵向的 min(n - 1 - j, grid[i][j]) 个格子入队，
//     * 然后从大到小循环出队这 min(m - 1 - i, grid[i][j]) + min(n - 1 - j, grid[i][j]) 个格子进行递归。
//     * 递归函数的返回值类型是 Int，表示当前路径的 dfs 是否能到达最右下的格子(不能则放回 -1)，能则返回访问的格子数；
//     * 一旦有返回值是非 -1 时，结束循环，并开始递归的返回；
//     * 每层递归都将当前的访问格子数 +1, 传递给下一层，在下一层递归中表示当前已经访问的格子数；
//     * 递归出口是 i == m - 1 && j == n - 1 和 grid[i][j] == 0，前者返回当前已经访问到的格子数，后者返回 -1，且前者的优先级更高。
//     *
//     * 递归要记忆化：对于一个坐标，第一次访问后(如果到达不了最右下)要进行标记，下次就不对标记过的格子进行搜索。
//     */
//    fun minimumVisitedCells(grid: Array<IntArray>): Int {
//        m = grid.size
//        n = grid[0].size
//        heap.add(0 to 0)
//        return grid.dfs(0, 0, 1)
//    }
//
//    private val heap = PriorityQueue<Pair<Int, Int>>() { (i0, j0), (i1, j1) -> i1 + j1 - (i0 + j0) }
//
//    private var m = 1
//    private var n = 1
//
//    private val memorySet = mutableSetOf<Pair<Int, Int>>()
//
//    private fun Array<IntArray>.dfs(i: Int, j: Int, times: Int): Int {
//        if (memorySet.contains(i to j)) return -1
//        if (i == m - 1 && j == n - 1) return times
//        val num = this[i][j]
//        if (num == 0) return -1
////        var minDist = UInt.MAX_VALUE
//        for (row in min(num + i, m - 1) downTo i + 1) {
////            minDist = min(this.dfs(row, j, times + 1u), minDist)
//            heap.offer(row to j)
//        }
//        for (col in min(num + j, n - 1) downTo j + 1) {
////            minDist = min(this.dfs(i, col, times + 1u), minDist)
//            heap.offer(i to col)
//        }
//        repeat(min(m - 1 - i, num) + min(n - 1 - j, num)) {
//            val (x, y) = heap.poll()
//            val ret = this.dfs(x, y, times + 1)
//            if (ret != -1) {
//                return ret
//            }
//        }
//        memorySet.add(i to j)
//        return -1
//    }

    /**
     * 贪心+最小堆
     *
     * brute force 算法中，每个格子在计算可移动访问到的格子时，可移动的格子有很大概率会被重复计算，
     * 而把后面计算得到的值和先前计算得到的值取最小值的做法其实没有意义，
     * 因为后面重复访问时，因为新计算出来的值是中间又经由其他格子过来的，所以访问次数肯定只会更大。
     *
     * 假设从 (0, 0) 到 (i, j) 至少要经过 dist 个格子，
     * 我们在遍历每个格子的时候，都可以通过取出前面访问过的格子中，能通过一次移动(包括右移和下移)就到达当前格子的格子中，
     * 到达它时，移动次数（dist）最小的格子，取到这个格子的 dist，将其 +1 就是现在的 dist.....这样计算直到最右下的格子。
     *
     * 这样，我们就可以通过优先队列来维护每一行和每一列中的格子的 dist 和 坐标，
     * 因为要找最小经过格子数，需要的就是一个小根堆，
     * 堆顶对应格子如果是不能到达当前的格子，则出队，直到可以到达或者队列为空，
     * 因为一个堆只和一行或一列对应，所以堆中的坐标只需要保留对应维度的坐标即可，而且可以直接保存为能到达的边界，即 i+grid[i][j] 或 j+grid[i][j],
     * 从列最小堆和行最小堆中取出的最小经过格子数中取出两者的最小值就是这个格子的最小经过格子数。
     * 这样就把单个格子的处理时间，从 O(m+n) 降低到 O(log m + log n)。
     */
    fun minimumVisitedCells(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        // 因为遍历的二重循环的最外层是 行，所以行不会重复，每次内层循环结束后清空了可以继续复用
        // 记录着列坐标
        val rowHeap = PriorityQueue<Pair<Int, Int>> { (dist0, _), (dist1, _) -> dist0 - dist1 }
        // 分别记录着各列的行坐标
        val colHeaps = Array(n) { PriorityQueue<Pair<Int, Int>> { (dist0, _), (dist1, _) -> dist0 - dist1 } }
        var dist = -1
        grid.forEachIndexed { i, ints ->
            rowHeap.clear()
            ints.forEachIndexed col@{ j, num ->
                if (i == 0 && j == 0) {
                    // start
                    dist = 1
                    rowHeap.offer(1 to 0 + grid[0][0])
                    colHeaps[0].offer(1 to 0 + grid[0][0])
                    return@col
                }
                while (rowHeap.isNotEmpty() && rowHeap.peek().second < j) { // 从堆顶的格子到达不了现在的格子 (i, j)
                    rowHeap.poll() // 到不了当前的列，更到不了后面的列，所以之后都无用，出队
                }
                val colHeap = colHeaps[j] // 选出当前列对应的最小堆
                while (colHeap.isNotEmpty() && colHeap.peek().second < i) {// 从堆顶的格子到达不了现在的格子 (i, j)
                    colHeap.poll() // 到不了当前的行，更到不了后面的行，所以之后都无用，出队
                }
                // 能到达当前格子的堆顶格子不出队的原因：从它除了能到当前格子，还有可能能直接到达后续格子
                dist = -1
                if (rowHeap.isNotEmpty()) {
                    dist = rowHeap.peek().first + 1
                }
                if (colHeap.isNotEmpty()) {
                    if (dist == -1) dist = Int.MAX_VALUE //m + n - 1
                    dist = min(dist, colHeap.peek().first + 1)
                }
                // 当前格子计算完成后，把结果入队，供后续格子使用
                if (num > 0 && dist != -1) { // 不可到达和不能再移动的格子不能进入优先队列
                    rowHeap.offer(dist to j + num)
                    colHeap.offer(dist to i + num)
                }
            }
        }
        return dist
    }
}