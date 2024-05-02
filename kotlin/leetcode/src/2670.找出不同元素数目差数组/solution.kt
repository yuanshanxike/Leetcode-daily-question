package source.`2670`.找出不同元素数目差数组

class Solution {
    fun distinctDifferenceArray(nums: IntArray): IntArray {
        val prefixHashArray = BooleanArray(50) { false }
        val suffixHashArray = BooleanArray(50) { false }
        val prefixDiffes = IntArray(nums.size) { 0 }
        val suffixDiffes = IntArray(nums.size) { 0 }
        val preSufDiffes = IntArray(nums.size) { 0 }
        // suffix
        var diffN = 0
        for (idx in nums.lastIndex downTo 0) {
            (nums[idx] - 1).also { i ->
                if (suffixHashArray[i].not()) {
                    suffixHashArray[i] = true
                    suffixDiffes[idx] = ++diffN
                } else {
                    suffixDiffes[idx] = suffixDiffes.getOrElse(idx + 1) { 0 }
                }
            }
        }
        // prefix and anser
        diffN = 0
        nums.forEachIndexed { index, i ->
            if (prefixHashArray[i - 1].not()) {
                prefixHashArray[i - 1] = true
                prefixDiffes[index] = ++diffN
            } else {
                prefixDiffes[index] = prefixDiffes.getOrElse(index - 1) { 0 }
            }
            
            preSufDiffes[index] = prefixDiffes[index] - suffixDiffes.getOrElse(index + 1) { 0 }
        }
        return preSufDiffes
    }
}

fun main() {
    Solution().apply {
        distinctDifferenceArray(intArrayOf(1, 2, 3, 4, 5)).toList().also(::println)
        distinctDifferenceArray(intArrayOf(3, 2, 3, 4, 2)).toList().also(::println)
        distinctDifferenceArray(intArrayOf(26, 12, 14, 21, 39, 50, 42, 7, 14)).toList().also(::println)
    }
}