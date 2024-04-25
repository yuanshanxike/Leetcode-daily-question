import kotlin.math.max

class Solution2439 {
    /**
     * 思路：按照规则，数组里相邻的数后面的-1，前面的+1。可以知道其实就是数字成分（以1为单位）的单向移动，右边数字比左边大的话，
     * 大小可以从右向左流动。根据要求，只需要流动到 | nums[i] - nums[i-1] | <= 1 即可。
     * 当 nums[i] 和 nums[i-1]大小最接近时，是否还需要继续流动（需保证流动后两个数的最大值不会发生变化），使得 nums[i-1] > nums[i] ?
     * 因为考虑到数字大小只能单向流动（从右向左），所以需要尽量把数字大小移动到左边，使得 nums[i] 空出来去承接再往右边可能需要向左流动的大小。
     * 所以局部移动后会是 nums[i-1] >= nums[i]。
     * 因为数字大小是流动的，不会发生损耗，所以 sum 始终保持不变。
     * 因此理想情况下 average 就应该是解，但题目限制了只能单向流动，所以如果数列本来就是递减的，那么就没办法流动，此时 nums[0] 就是解。
     * 以这个思路进行推广，结合「前缀」的思想（**把当前问题二元化**）。当处理 nums[i] 时，可以将 nums[0] ... nums[i-1] （前i项构成的数组前缀）看作一个整体，
     * 前缀内部具体如何每次往左流动不用关心，取前缀数列的 average（**局部最优**），但受限于可能取不到最优的 average (因为可能本就有很多逆序导致不能流动大小)，
     * 而需要关心 nums[0] ... nums[n-2] 的 average，以此类推直到前缀只有 nums[0]，此时 average 就是自身；
     * 再看 nums[0], nums[1] 这第二个前缀，其 average_1 受限于 nums[0] 这第一个前缀的 average_0,
     * if (average_0 <= average_1) 说明最新参与比较的数 nums[1] >= nums[0] = average_0，此时可以向左进行大小流动；（这时取 average_1 最接近题目的解）
     * else 说明 nums[1] < nums[0] = average_0，此时完全没有流动大小的必要。（这时取 average_0 最接近题目的解，因为 average_1 按照规则不能真正取到）
     * 可以发现这是不断在运算 max(average) 的过程。
     * 就像这样从开始只有一个元素 nums[0] 的前缀算 max(average) 向后推算，逐渐扩大前缀规模（**动态规划**），直到长度为整个数组为止，就可以算出正确答案。
     */
    fun minimizeArrayValue(nums: IntArray): Int {
        var prefixP = 0  // 前缀的后指针，index: 0...prefix 表示前缀
        var sum: Long = 0        //用 long 为单位，因为是加法，对于int数字会溢出
        var maxAverage: Long = 0

        while (prefixP < nums.size) {
            sum += nums[prefixP]
            maxAverage = max(maxAverage, (sum + prefixP) / (prefixP + 1)) // 向上取整算法: 设 A = NB + M (M < B)，可恒等变化为 (A + B - 1) / B = N + 1 + (M - 1) / B。当M为0时，int(A/B)=N，int((A+B-1)/B)=N+int(1-1/B)=N
            prefixP++
        }

        return maxAverage.toInt()
    }
}

fun main() {
    Solution2439().apply {
        println(minimizeArrayValue(intArrayOf(3,7,1,6)))
        println(minimizeArrayValue(intArrayOf(10,1)))
    }
}