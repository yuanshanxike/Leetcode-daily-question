package source.`2580`.统计将重叠区间合并成组的方案

import kotlin.math.max

class Solution {
    /**
     * 首先，将区间按照 start 进行排序（O(nlog(n))）,
     * 然后就可以从前往后开始顺序合并有交集的区间：
     * 合并区间的 start 肯定是每次遍历到的没有交集的区间 start；
     * 合并区间的 end 需要在每次遍历到有交集的区间时动态计算，即：取 end 的最大值。
     *
     * 这样就可以把所有有交集的区间都合并为一个区间(O(n))。
     * 遍历到新区间的 start 大于 合并区间的 end 时，合并区间数+1，然后开始计算新的合并区间。
     *
     * 设最终的到合并区间数为 k，那么总划分方案数就是 C(k 0) + C(k 1) + C(k 2) + .. + C(k k)；
     * 根据二项式定理，上述所有组合数相加的结果其实就等于 2^k
     *
     * 注意: k 可能非常大，需要使用 快速幂 来实现（注意 mod 10e9 + 7）
     * 注：乘法的 mod 定理：x * y = z -> z % MOD = (x % MOD) * (y % MOD) % MOD
     *
     * 考虑到结果就是2^(合并区间数)，我们可以在合并区间的同时对结果 * 2 % MOD，
     * 这样，合并遍历完成就可以得到结果
     */
    fun countWays(ranges: Array<IntArray>): Int {
        // var divide = 0
        // var curEnd = -1
        // ranges.sortedBy { (start, _) -> start }.forEach { (start, end) ->
        //     if (start > curEnd) {
        //         divide++
        //     }
        //     curEnd = max(end, curEnd)
        // }
        // var base = 2L
        // var ans = 1L
        // while (divide > 0) {
        //     if (divide and 1 == 1) {
        //         ans = (ans % MOD) * (base % MOD) % MOD
        //     }
        //     divide = divide.shr(1)
        //     base = (base % MOD) * (base % MOD) % MOD
        // }
        // return (ans % MOD).toInt()

        var curEnd = -1
        var ans = 1
        ranges.sortedBy { (start, _) -> start }.forEach { (start, end) ->
            if (start > curEnd) {
                ans = ans * 2 % MOD
            }
            curEnd = max(end, curEnd)
        }
        return ans
    }
}

// private const val MOD = (1e9 + 7).toLong()
private const val MOD = (1e9 + 7).toInt()

fun main() {
    Solution().countWays(arrayOf(intArrayOf(1, 2), intArrayOf(3, 4))).also(::println)
    Solution().countWays(arrayOf(intArrayOf(1, 2), intArrayOf(2, 4))).also(::println)
}