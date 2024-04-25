package `2809`

import java.lang.StringBuilder
import kotlin.math.max

class Solution2809 {
    private fun printQrArray(qr: Array<IntArray>) {
        val output = StringBuilder("")
        qr.forEach { arr ->
            arr.forEach {
                output.append(it)
                output.append(' ')
            }
            output.append('\n')
        }
        print(output)
    }

    fun minimumTime(nums1: List<Int>, nums2: List<Int>, x: Int): Int {
        // pair<nums1[i], nums2[i]>
        val pairList = mutableListOf<Pair<Int, Int>>()
        var s1 = 0
        var s2 = 0
        val n = nums1.size
        nums1.forEachIndexed { i, num ->
            pairList.add(Pair(num, nums2[i]))
            s1 += num
            s2 += nums2[i]
        }
        pairList.sortBy { it.second }

        // 二维数组表示对排序后的pair数组的前i个元素在经历j秒后，所能减少的最大数值
        // 0 <= j <= i <= nums1.length
        val maxReduce = Array(n + 1) { IntArray(n + 1) }
        for(i in 1 .. n)  {
            val a = pairList[i - 1].first
            val b = pairList[i - 1].second
            for (j in 1 .. i){
                // 对于前i个数，j秒所能减少的最大值。对于第i个元素，要么进行操作，要么不进行
                maxReduce[i][j] = max(maxReduce[i-1][j], maxReduce[i-1][j-1] + a + b * j)
            }
//            for (j in i downTo 1) {
//                maxReduce[i][j] = max(maxReduce[i-1][j], maxReduce[i-1][j-1] + a + b * j)
//            }
        }

        printQrArray(maxReduce)

        // 对于每个数（index i），操作一次以上完全没意义。所以对于n个数最多操作n次，最少操作0次
        repeat(n+1) {
            if (s1 + s2 * it - maxReduce[n][it] <= x) return it
        }
        return -1
    }
}

fun main() {
    val solution = Solution2809()
    val n1 = listOf(1,7,9,4,8,8,1)
    val n2 = listOf(2,2,3,2,0,1,0)
//    val n1 = listOf(1, 2, 3)
//    val n2 = listOf(1, 2, 3)
    solution.minimumTime(n1, n2, 20).let(::println)
}