package source.`2834`.找出美丽数组的最小和

class Solution {
    /**
     * nums 中放入的数字要尽可能小（在保证是正整数的前提下）；
     * 因为要求两两互不相同，最理想的情况是从最小开始连续放入n个非零自然数；
     * 由于限制任意两个数的和不等于 target，那么对于小于 target 的数，
     * 我们就把 1 .. min(⌊target/2⌋, n) 放入数组,
     * 如果数组元素没放够，则继续把 target .. n + (n - ⌊target/2⌋) 放入数组。
     * 实际计算不需要数组，直接循环累加即可。
     *
     * 优化：直接利用等差数列求和公式（时间复杂度O(1)）
     */
    fun minimumPossibleSum(n: Int, target: Int): Int {
//        var sum = 0
        val edge = target / 2
//        var idx = 1
        // TLE
//        repeat(n) {
//            if (idx <= edge) {
//                sum += idx++
//            } else if (idx >= target) {
//                sum += idx++
//            } else { // edge < idx < target
//                idx = target // 跳过不可能选入数组的数字
//                sum += idx++
//            }
//            sum %= 1_000_000_007
//        }

        var sum = if (n <= edge) {
            (1L + n) * n / 2
        } else { // n > edge
            val right = n - edge + target - 1
            (1L + edge) * edge / 2 + (right.toLong() + target) * (right - target + 1L) / 2
        }
        sum %= 1_000_000_007
        return sum.toInt()
    }
}

fun main() {
//    var sum = 0
//    var idx = 1
//    sum += idx++
//    println("sum: $sum, idx: $idx")
    Solution().apply {
        minimumPossibleSum(2, 3).also { println(it) }
        minimumPossibleSum(3, 3).also { println(it) }
        minimumPossibleSum(3, 4).also { println(it) }
        minimumPossibleSum(39636, 49035).also { println(it) }
        minimumPossibleSum(1000000000, 1000000000).also { println(it) }
    }
}