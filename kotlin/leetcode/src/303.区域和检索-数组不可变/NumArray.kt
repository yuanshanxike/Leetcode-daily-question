package source.`303`.`区域和检索-数组不可变`

class NumArray(nums: IntArray) {

    private val prefixSums = IntArray(nums.size + 1) { 0 }

    init {
        var sum = 0
        nums.forEachIndexed { index, i ->
            sum += i
            prefixSums[index + 1] = sum
        }
    }

    fun sumRange(left: Int, right: Int): Int = prefixSums[right + 1] - prefixSums[left]

}