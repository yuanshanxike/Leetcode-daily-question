package source.`739`.每日温度

class Solution {
    /**
     * 用单调（非递增）栈保存每日温度的下标：
     * 栈顶下标对应温度要是低于即将入栈的下标对应温度，则栈顶下标出栈，知道不小于为止；
     * 高于或等于，则待入栈的下标直接进栈。
     * (因为存储的是下标，即使是在前面的操作中对‘中间’的元素进行了出栈，也能在该元素出栈时，准确计算出所需要的位置差)
     */
    fun dailyTemperatures(temperatures: IntArray): IntArray {
        val stack = mutableListOf<Int>()
        val ans = IntArray(temperatures.size) { 0 }
        temperatures.forEachIndexed { index, i ->
            stack.apply {
                while (size > 0 && temperatures[last()] < i) {
                    val idx = stack.removeLast()
                    ans[idx] = index - idx
                }
                add(index)
            }
        }
        stack.forEach {
            ans[it] = 0
        }
        return ans
    }
}

fun main() {
    Solution().apply {
        dailyTemperatures(intArrayOf(73, 74, 75, 71, 69, 72, 76, 73)).toList().also(::println)
        dailyTemperatures(intArrayOf(30, 40, 50, 60)).toList().also(::println)
        dailyTemperatures(intArrayOf(30, 60, 90)).toList().also(::println)
    }
}