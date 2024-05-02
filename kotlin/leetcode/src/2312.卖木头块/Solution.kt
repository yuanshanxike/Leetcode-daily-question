package source.`2312`.卖木头块

import kotlin.math.max

class Solution {
    // hash<height to width, price>
    private val priceHash = hashMapOf<Pair<Int, Int>, Int>()

    private val memoryHash = hashMapOf<Pair<Int, Int>, Long>()

    fun sellingWood(m: Int, n: Int, prices: Array<IntArray>): Long {
        memoryHash.clear()
        priceHash.clear()

        prices.forEach { ints ->
            priceHash[ints[0] to ints[1]] = ints[2]
        }
        return dfs(m, n)
    }

    /**
     * @return max salable price of current size
     */
    private fun dfs(height: Int, width: Int): Long {
        if (height == 0 || width == 0) return 0L
        memoryHash[height to width]?.also { return it }

        var maxPrice = priceHash[height to width]?.toLong() ?: 0L
        // 因为长方形是上下、左右都分别对称的图形，所以只需要遍历高和宽的一半，计算出价格。根据对称性，上边（左边）剩余长度的情况已经被计算出来了
        // 循环的下限要从 1 开始，才能把原问题切割为更小规模的子问题（0开始的话就进入到重复原问题的子问题中去了）
//        for (i in 0..height / 2) {
//            for (j in 1..width / 2) {
//                val leftTop = max(dfs(i, j), priceHash[i to j]?.toLong() ?: 0L)
//                val rightTop = max(dfs(i, width - j), priceHash[i to width - j]?.toLong() ?: 0L)
//                val rightBottom = max(dfs(height - i, width - j), priceHash[height - i to width - j]?.toLong() ?: 0L)
//                val leftBottom = max(dfs(i, width - j), priceHash[i to width - j]?.toLong() ?: 0L)
//                maxPrice = max(leftTop + rightTop + rightBottom + leftBottom, maxPrice)
//            }
//        }
        // top -- bottom
        for (i in 1..height / 2) {
            val top = max(dfs(i, width), priceHash[i to width]?.toLong() ?: 0L)
            val bottom = max(dfs(height - i, width), priceHash[height - i to width]?.toLong() ?: 0L)
            maxPrice = max(top + bottom, maxPrice)
        }
        // left -- right
        for (j in 1..width / 2) {
            val left = max(dfs(height, j), priceHash[height to j]?.toLong() ?: 0L)
            val right = max(dfs(height, width - j), priceHash[height to width - j]?.toLong() ?: 0L)
            maxPrice = max(left + right, maxPrice)
        }

        memoryHash[height to width] = maxPrice
        return maxPrice
    }

    private fun calculatByDp(m: Int, n: Int, prices: Array<IntArray>): Long {
        // f[i][j]：(切割)高 i、宽 j 的长方形木块能卖出的最大价格
        val f = Array(m + 1) { LongArray(n + 1) { 0L } }
        for ((i, j, price) in prices) {
            f[i][j] = price.toLong()  // 对应大小的木块直接卖出至少能达到的价格
        }
        // 二重循环：从小到大，枚举木块可切割出的大小
        for (i in 1..m) {
            for (j in 1..n) {
                // 在高和宽分别为 i 和 j 的前提下
                // 横向切割 (因为上下是对称的，只需要切到一半的长度就枚举了当前大小木块的所有 case)
                for (k in 1..i / 2) {
                    f[i][j] = max(f[i][j], f[k][j] + f[i - k][j])
                }
                // 纵向切割 (因为左右是对称的，只需要切到一半的长度就枚举了当前大小木块的所有 case)
                for (k in 1..j / 2) {
                    f[i][j] = max(f[i][j], f[i][k] + f[i][j - k])
                }
            }
        }
        return f[m][n]
    }

    /** 再写记忆化递归（对一些数据类型进行优化） **/

    private val prices = hashMapOf<Int, Int>()
    private lateinit var memory: Array<LongArray>

    fun sellingWood2(m: Int, n: Int, prices: Array<IntArray>): Long {
        for ((h, w, price) in prices) {
            this.prices[hashKey(h, w)] = price
        }
        memory = Array(m + 1) { LongArray(n + 1) { -1L } }
        return dfs2(m, n)
    }

    // 1 <= m, n <= 200 ; 2^8 = 256
    private fun hashKey(x: Int, y: Int): Int = x.shl(8) xor y

    private fun dfs2(h: Int, w: Int): Long {
        if (memory[h][w] != -1L) return memory[h][w]

        val key = hashKey(h, w)
        var maxPrice = prices.getOrDefault(key, 0).toLong()

        // top -- bottom
        for (i in 1..h / 2) {
            val top = dfs(i, w)
            val bottom = dfs(h - i, w)
            maxPrice = max(top + bottom, maxPrice)
        }
        // left -- right
        for (j in 1..w / 2) {
            val left = dfs(h, j)
            val right = dfs(h, w - j)
            maxPrice = max(left + right, maxPrice)
        }

        memory[h][w] = maxPrice
        return maxPrice
    }
}

fun main() {
    Solution().apply {
        sellingWood(3, 5, arrayOf(intArrayOf(1, 4, 2), intArrayOf(2, 2, 7), intArrayOf(2, 1, 3))).also(::println)
//        sellingWood(1, 4, arrayOf(intArrayOf(1, 4, 2), intArrayOf(2, 2, 7), intArrayOf(2, 1, 3))).also(::println)
        sellingWood(4, 6, arrayOf(intArrayOf(3, 2, 10), intArrayOf(1, 4, 2), intArrayOf(4, 1, 3))).also(::println)
    }
}