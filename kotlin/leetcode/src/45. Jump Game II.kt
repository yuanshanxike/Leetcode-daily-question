/**
 * 贪心
 *
 * 思路：https://leetcode.cn/problems/jump-game-ii/solution/tiao-yue-you-xi-ii-by-leetcode-solution/
 */

class Solution45 {
    fun jump(nums: IntArray): Int {
        var steps = if (nums.size <= 1) 0 else 1
        // 选择的点 i 与 可前进的范围大小值 nums[i] 构成了遍历元素的左开右闭区间 (i, i + nums[i]]
        var selectedIndex = 0
        var end = selectedIndex + nums[selectedIndex] // 下次跳跃最远可以到达的距离

        while (end < nums.lastIndex) {
            for (i in selectedIndex + 1..end) {
                (i + nums[i]).takeIf { it > end }
                    ?.also {
                        end = it
                        selectedIndex = i
                    }
            }
            steps++
        }

        return steps
    }
}

fun main() {
    val solution = Solution45()
    println(solution.jump(intArrayOf(2,3,1,1,4)))
    println(solution.jump(intArrayOf(2,3,0,1,4)))
}