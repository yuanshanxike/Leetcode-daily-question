package source.`2369`.检查数组是否存在有效划分

class Solution {
    // 对于扫描到的新元素，要加入当前数组或加入到新数组中时，要保证其合法性
    private data class CurrentArray(
        var last: Int = 0,
        var length: Int = 0,
        var isIncrease: Boolean = false  // true: 等差1递增；false：相等数列
    ) {
        fun isValid() = if (isIncrease) length == 3 else length >= 2

        fun add(x: Int): CurrentArray {
            length++
            if (length > 1) {
                isIncrease =
                    when {
                        x == last -> false
                        x - 1 == last -> true
                        else -> throw Exception("Invalidly add!")
                    }
            }
            last = x
            return this
        }

        fun renew(x: Int) = CurrentArray(x, 1)
    }

    /**
     * 对于连续相同的数字，根据题目规则，可以是连续两个相等的元素或者连续3个相等的元素；
     * 假设现在有连续 N 个相等的元素，那么只要 N >= 2，它就可以由 2x+3y 组成。（其中 x 和 y 都是非负整数）
     * 因为 2 的倍数可以构成所有偶数，而我们只需要把任意偶数，构成其的最后一个 2 替换为 3 ，就得到了比它大1的奇数，所以也可以得到除 1 之外的所有奇数。
    //     * 而对于连续递增且相邻元素之间的差值为 1 的序列，其长度为 3 的倍数自然是没有问题；如果 长度 % 3 == 1，就需要向前 或 后的相等序列
    //     * 相同序列中各取一个数，使得满足题目中为 3 的倍数的要求，此时需要检查前、后的相同序列各减去一个数后是否满足上述的元素个数要求；
    //     * 如果 长度 % 3 == 2，需要从前 或 后相邻的序列中取走一个元素，尽量取“使得整体尽量不会出错的位置（前 or 后）”
     *
     */
    fun validPartition(nums: IntArray): Boolean = nums.scanning(0, CurrentArray())

    // hash<(nums[index] to cur), isValid>
    private val memoryHash = HashMap<Pair<Int, CurrentArray>, Boolean>()

    private fun IntArray.scanning(index: Int, cur: CurrentArray): Boolean {
        // TODO: 不记忆化会超时，这样记忆化会有问题，查一查原因
//        memoryHash[index to cur]?.also {
//            println("memory: index: $index, cur: $cur")
//            return it
//        }
        if (index == size) return cur.isValid().also {
            println("$cur")
            memoryHash[index to cur] = it
        }
        val x = this[index]
        return when {
            // 1483,1483,1483,1484,1485,1485,1486,1487
            // 1472,1472,1473,1473,1473,1473,1474,1475,1475,1475,1475,1475,1476,1477,1477,1477,1477,1477,1478,1479,1480,1480,1480,1480,1481,1482,1483,1483,1483,1484,1485,1485,1486,1487
            // add
            cur.length == 0 ||
                    cur.length == 1 && (cur.last == x - 1 || cur.last == x) ||
                    cur.length == 2 && cur.isIncrease && cur.last == x - 1 -> {
                scanning(index + 1, cur.add(x))
            }
            // renew
            cur.length >= 2 && cur.isIncrease.not() && cur.last != x ||
                    cur.length == 3 && cur.isIncrease -> {
                scanning(index + 1, cur.renew(x))
            }
            // add or renew
            cur.length >= 2 && cur.isIncrease.not() && cur.last == x -> {
                val a = scanning(index + 1, cur.add(x))
                val b = scanning(index + 1, cur.renew(x))
                a or b
            }

            else -> {
                println("last: nums.size:${size}, index: $index, $x, i - 1:$cur ${this[index - 1]}, i - 2: ${this[index - 2]}")
                false
            }
        }.also {
//            memoryHash[index to cur] = it
        }
    }
}

/**
 * DP
 */
//class Solution {
//    /**
//     * 定义：f[i] 为 nums 的前i个数是否能够构成一种有效划分。
//     * 状态转移方程为:f[i] =
//     * f[i - 2] and (nums[i - 1] == nums[i - 2])
//     * or
//     * f[i - 3] and (nums[i - 1] == nums[i - 2] == nums[i - 3] or nums[i - 1] == nums[i - 2] + 1 == nums[i - 3] + 2)
//     */
//    fun validPartition(nums: IntArray): Boolean {
//        val f = BooleanArray(nums.size + 1) { false }
//        f[0] = true // 边界条件
//        f[1] = false // 一个数也不符合划分要求
//        for (i in 2..nums.size) {
//            var isValid = nums[i - 1] == nums[i - 2] && f[i - 2]
//            if (i > 2) {
//                isValid = isValid ||
//                        (nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3] ||
//                                nums[i - 1] == nums[i - 2] + 1 && nums[i - 1] == nums[i - 3] + 2) && f[i - 3]
//            }
//            f[i] = isValid
//        }
//        return f[nums.size]
//    }
//}

fun main() {
    Solution().apply {
        validPartition(intArrayOf(4, 4, 4, 5, 6)).also(::println)
        validPartition(intArrayOf(1, 1, 1, 2)).also(::println)
        validPartition(intArrayOf(1483, 1483, 1483, 1484, 1485, 1485, 1486, 1487)).also(::println)
    }
}