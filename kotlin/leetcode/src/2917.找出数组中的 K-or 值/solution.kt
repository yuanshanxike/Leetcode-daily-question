package source.`2917`.`找出数组中的 K-or 值`

class Solution {
    fun findKOr(nums: IntArray, k: Int): Int {
        val bitCountArray = IntArray(32) { 0 }
        nums.forEach {
            var num = it
            var count = 0
            while (num > 0) {
                if (num and 1 == 1) {
                    bitCountArray[count]++
                }
                num = num.shr(1)
                count++
            }
        }
        println(bitCountArray.toList())
        var ans = 0
        bitCountArray.forEachIndexed { index, i ->
            if (i >= k) {
                ans = ans or 1.shl(index)
            }
        }
        return ans
    }
}