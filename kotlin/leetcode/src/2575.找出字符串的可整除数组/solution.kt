package source.`2575`.找出字符串的可整除数组

import kotlin.math.max
import kotlin.math.min

class Solution {
    /**
     * 1 <= word.length <= 10^5
     * 1 <= m <= 10^9 <≈ Int.MAX_VALUE
     *
     * 首先，如果将 word 装到一个 Number 里面是不切实际的，没有什么基本类型能够承接这个规模的数字；
     * 所以我们需要实现对整数的取模运算：
     * 一个十进制数 word 对 m 取模，等效于每一位分别对 m 取模后，按照十进制拼接，结果再对 m 取模。
     * 对于长度小于 "$m".length 的十进制数，其对 m 取模肯定等于 它本身。
     * 所以直接从 "$m".length - 1 的下标开始，将前缀转为 int 后对 m 取模，
     * 检查取模结果的10进制位数长度，假设为 "$mod".length，
     * 然后下标向后移动到 min(curIndex + "$m".length - "$mod".length， lastIndex)。
     * 重复上述步骤，直到 lastIndex。（在移动下标时，中间跳过的部分直接填 0，能整除时填 1 ，否则也是 0）
     *
     * *注意在拼接模值和新数字的时候，尽量避免重复遍历数字（降低单次的复杂度）
     * *取模后的十进制拼接有可能会超过 Int 的可表示范围（也超过了 UInt 的范围），需要用 Long
     *
     */
    fun divisibilityArray(word: String, m: Int): IntArray {
        fun String.subModSplice(start: Int, end: Int, remain: Long): Long {
            var times = 1L
            var value = 0L
            for (i in end - 1 downTo start) {
                value += times * this[i].digitToInt()
                times *= 10
            }
            value += remain * times
            return value
        }

        fun Long.length(): Int {
            var length = 0
            var num = this
            while (num > 0) {
                length++
                num /= 10
            }
            return length
        }

        val ans = IntArray(word.length) { 0 }

        val mSize = m.toString().length
        var start = 0
        var end = start + mSize
        var remain = 0L
        while (start != end) {
            // 当前前缀的余数已经为0的情况下，要是这时候后面紧接着有一串 0。不能直接跳过这些0，因为包括它们的前缀也能够被整除
            while (remain == 0L && start < word.length && word[start].digitToInt() == 0) {
                ans[start++] = 1
            }
            if (start == word.length) break
            if (remain == 0L) end = min(start + mSize, word.length)
            val num = word.subModSplice(start, end, remain)
            remain = num % m
            start = end
            end = min(start + max(mSize - remain.length(), 1), word.length)
            if (remain == 0L) ans[start - 1] = 1
        }
        return ans
    }
    /**
     * 好像直接每次往后取一个元素，余数*10 + 它 后再取模...直到最后一个元素会快一些，代码也简单
     */
}