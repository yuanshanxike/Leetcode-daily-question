package source.`2386`.`找出数组的第 K 大和`

import java.util.PriorityQueue
import kotlin.math.abs

class Solution {
//    /**
//     * 用两个堆：一个小根堆存放正整数；大根堆存放负整数。
//     * 遍历数组的时候完成以上操作，并在这一过程中统计 0 的个数(int)、正整数和(long)、负整数和(long)，
//     * 同时也要把每个元素出现的个数统计到哈希(hash<Int, Int>)表中。
//     * 正整数和就是“数组的第 1 大和”；负整数和就是“数组的最小和”（“数组的第 2^n 大和”）；
//     * 设 0 的个数为 m，那么 数组的前 2^m 大和 相等；不仅如此，因为很多0的存在，后面每个子序列的和至少会有 2^m 个相同的。
//     * 考虑到正整数和负整数都会有相同元素，所以在优先队列弹出堆顶元素(假设为x)时，
//     * 获得的“数组第 K 大和”对应的 删除x的方法 有 hash[abs(x)] 种。此时再考虑到含0子序列的情况，实际会有 hash[x] * 2^m 个相同的“数组第 K 大和”。
//     * 每次 x 出队计算完成后，hash[abs(x)] 需要 -1。
//     *
//     * “数组第 K 大和”从正数变化到负数、或子序列（不含空集）的和全为正或全为负时，需要额外统计一个和为 0L，表示 空集。
//     *
//     * 因为 1 <= k <= min(2000, 2^n)，我们不需要担心 2^m 过大的问题
//     */
//    fun kSum(nums: IntArray, k: Int): Long {
//        val mMax = 10  // (2^11 == 2024) > 2000 > (2^10 == 1024)
//        val posQue = PriorityQueue<Int>()  // 存放正整数的小根堆
//        val negQue = PriorityQueue<Int>() { a, b -> b - a } // 存放负整数的大根堆
//        val hash = HashMap<Int, Int>()
//        var posSum = 0L
//        var negSum = 0L
//
//        //        var zeroNum = 0 // hash[0] 已经有相同作用
//        fun Int.count() {
//            val x = abs(this)
//            if (hash.containsKey(x)) {
//                hash[x] = hash[x]!! + 1
//            } else {
//                hash[x] = 1
//            }
//        }
//        nums.forEach {
//            if (it > 0) {
//                posQue.offer(it)
//                posSum += it
//            } else if (it < 0) {
//                negQue.offer(it)
//                negSum += it
//            }
//            it.count()
//        }
//
//        val zeroNum = hash[0] ?: 0
//        if (zeroNum > mMax) return posSum
//
//        val n = nums.size
//        if (n < 32 && k in 1.shl(n) + 1 - 1.shl(zeroNum)..1.shl(n)) return negSum
//
//        var idx = 1.shl(zeroNum)
//        var curSum = posSum
//        fun findNext(x: Int) {
//            idx += 1.shl(zeroNum) * hash[abs(x)]!!
//            if (x > 0) {
//                curSum -= x
//            } else { // x < 0
//                curSum += x
//            }
//            hash[abs(x)] = hash[abs(x)]!! - 1
//        }
//        while (idx < k) {
//            when {
//                posQue.isNotEmpty() && negQue.isNotEmpty() -> {
//                    val a = posQue.peek()
//                    val b = negQue.peek()
//                    if (abs(a) <= abs(b)) {
//                        findNext(posQue.poll())
//                    } else {
//                        findNext(negQue.poll())
//                    }
//                }
//
//                posQue.isNotEmpty() -> findNext(posQue.poll())
//                negQue.isNotEmpty() -> findNext(negQue.poll())
//                else -> break
//            }
//        }
//        return curSum
//    }
//}

    /**
     * 正确思路：https://leetcode.cn/problems/find-the-k-sum-of-an-array/solutions/1764389/zhuan-huan-dui-by-endlesscheng-8yiq/
     */
    fun kSum(nums: IntArray, k: Int): Long {
        var sum = 0L
        // 将整数数组的第 k 大和的问题转化为：非负数组的第 k 小和的问题。
        // 因为 子序列最大和 减去正数 和 加上负数，都等于 子序列最大和 减去它们的绝对值；
        // 而减去空集的绝对值对应 子序列最大和，减去所有元素的绝对值等于 子序列最小和（所有负数(如果有)的和）。
        // 所以这种转换没有问题
        nums.forEachIndexed { index, i ->
            if (i >= 0) {
                sum += i // 非负整数和（也就是最大子序列和）
            } else {
                nums[index] = -i  // 将负数全都转化为正数后，子序列和的最大值 就与 数组规模 成正比了
            }
        }
        nums.sort() // 保证在当前数组规模下，可以拿到（除了出队已被统计的和之外）最小的子序列和

        // Pair<sum of absolute, next visit index>
        val sumMinQue = PriorityQueue<Pair<Long, Int>>(Comparator.comparingLong { it.first })
        sumMinQue.offer(0L to 0) // 空集: []。sum == 0L，下次访问 index == 0 的数组位置
        // 一开始使用空集，对于每个元素(nums中)，要么添加到现有集合末尾，要么替换现有集合末尾的元素。就可以枚举出nums的所有子序列。
        // 仔细思考 对于数组nums每个元素的遍历（替换） 结合 数组nums中任意元素为开头的前缀数组（添加） 就可以证明这种枚举方式是正确的。
        repeat(k - 1) { // 已经将空集（子序列最小和）入队了
            val (s, i) = sumMinQue.poll()
            if (i < nums.size) {
                // 在集合末尾添加元素
                sumMinQue.offer(s + nums[i] to i + 1)
                if (i > 0) {
                    // 替换集合末尾元素
                    sumMinQue.offer(s + nums[i] - nums[i - 1] to i + 1)
                }
            }
        }
        // 非负整数子序列第k小和 转换到 整数子序列第k大和
        return sum - sumMinQue.peek().first
    }
}


fun main() {
    Solution().apply {
        // 2
        kSum(intArrayOf(2, 4, -2), 5).also(::println)
        // 10
        kSum(intArrayOf(1, -2, 3, 4, -10, 12), 16).also(::println)
    }
}