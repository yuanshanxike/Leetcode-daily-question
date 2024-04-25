package `377`

class Solution {
    // TLE
//    fun combinationSum4(nums: IntArray, target: Int): Int {
//        nums.sort()
//        var ans = 0
//        val changeMemory = HashMap<Int, Int>()
//        fun IntArray.dfs(target: Int) {
//            changeMemory[target]?.also { delta ->
//                println("has memory: $target -> $delta")
//                ans += delta
//                return
//            }
//            val oldAns = ans
//            forEach { num ->
//                if (num > target) return // 剪枝优化：因为此时 nums 是非递减的，如果当前元素比目标值大，后面的元素也不可能使得目标值变到 0 了，可直接返回
//                else if (num == target) {
//                    ans++
//                    return // 剪枝优化：...
//                } else dfs(target - num) // num < target
//            }
//            changeMemory[target] = ans - oldAns
//        }
//        nums.dfs(target)
//        return ans
//    }

    // AC
//    fun combinationSum4(nums: IntArray, target: Int): Int {
//        val memory = HashMap<Int, Int>()
//
//        /**
//         * @return target对应的方案数
//         */
//        fun IntArray.dfs(target: Int): Int {
//            if (target == 0) return 1
//            memory[target]?.also { sum ->
////                println("has memory: $target -> $sum")
//                return sum
//            }
//            var sum = 0
//            filter { it <= target }.forEach { num ->
//                sum += dfs(target - num)
//            }
//            memory[target] = sum
//            return sum
//        }
//        return nums.dfs(target)
//    }

    // 其实就是"爬楼梯"的变形
    fun combinationSum4(nums: IntArray, target: Int): Int {
        val f = IntArray(target + 1) { 0 } // f[i]: 集合元素总和为 i 可能的方案数（跳到第i阶台阶的方案数）
        f[0] = 1 // dp 边界值
        for (j in 0 until target) {
            nums.forEach { num ->
                if (j + num <= target) f[j + num] += f[j]
            }
        }
        return f[target]
    }
}

fun main () {
    val s = Solution()
//    println(s.combinationSum4(intArrayOf(1,2,3), 4))
//    println(s.combinationSum4(intArrayOf(1,2), 2))  // 2 == 2^1
//    println(s.combinationSum4(intArrayOf(1,2,3), 3))  // 4 == 2^2
//    println(s.combinationSum4(intArrayOf(1,2,3,4), 4))  // 8 == 2^3
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5), 5))  // 16 == 2^4
//    println(s.combinationSum4(intArrayOf(9), 3))
//    println(s.combinationSum4(intArrayOf(1,50), 200))
//    println(s.combinationSum4(intArrayOf(3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25), 10))
    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100), 31))
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32), 32))
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31), 31))
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31), 30))
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29), 29))
//    println(s.combinationSum4(intArrayOf(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29), 28))
}

