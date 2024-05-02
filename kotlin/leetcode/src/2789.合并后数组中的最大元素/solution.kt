package source.`2789`.合并后数组中的最大元素

class Solution {
    /**
     * 只需要从后向前遍历，非递增（正向非递减）的序列一定可以全都加起来，
     * 此时它们的和要是比再前面的一个数大或相等的话又可以继续相加，直到比和比前一个数小。
     * 那么更大的数就是新的当前最大值。
     */
    fun maxArrayValue(nums: IntArray): Long {
        var sum = 0L
        for (i in nums.lastIndex downTo 0) {
            val num = nums[i]
            if (num > sum) {
                sum = num.toLong()
            } else { // num <= sum
                sum += num
            }
        }
        return sum
    }
}