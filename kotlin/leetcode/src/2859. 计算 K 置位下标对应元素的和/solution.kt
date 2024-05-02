package source.`2859`.` 计算 K 置位下标对应元素的和`

class Solution {
    fun sumIndicesWithKSetBits(nums: List<Int>, k: Int): Int {
        var sum = 0
        nums.forEachIndexed { index, i ->
            var idx = index
            var ichi = 0
            while (idx > 0) {
                ichi += idx % 2
                idx = idx.shr(1)
            }
            if (ichi == k) sum += i
        }
        return sum
    }
}

fun main() {
    Solution().apply {
        sumIndicesWithKSetBits(listOf(5, 10, 1, 5, 2), 1).also(::println)
        sumIndicesWithKSetBits(listOf(4, 3, 2, 1), 2).also(::println)
    }
}