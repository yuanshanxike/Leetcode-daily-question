package `216`

import org.jetbrains.annotations.Nullable

class Solution {
    fun combinationSum3(k: Int, n: Int): List<List<Int>> {
        val ans = mutableListOf<List<Int>>()
//        var arr = BooleanArray(10) { false }
        // “选或不选”
        val stack = mutableListOf<Int>()
        fun dfs(times: Int, i: Int, left: Int) {
            if (times == 0) {  // 其他返回条件判断不能在他的前面，因为当 times == 0 时的 i 必然是不会选的
                if (left == 0) ans.add(stack + emptyList())  // 找到合适的组合  * + emptyList()相当于对原数组的 copy
                return // 选到了合适的组合 或者 当前组合不合适 都需要返回，因为此时次数已被用完；否则会被下面的“不选”添加相同的集合，同时也算是一种剪枝 (“选”的出口)
            }
            if (left < i) return // 剪枝，因为 i 本来就是有序的，当前的 i 要是都比 left 大，后面更大的 i 也再也不会使得结果等于 0
            if (i > 9) return // 超出了可选元素的范围 (“不选”的出口)  *必须在 times == 0 的后面判断，因为假设可用次数为 0，同时也取到了 9 (在上一层的递归中)。这时如果直接 return 就不能把算出来的正确集合加入到答案中

            stack.add(i)
            dfs(times - 1, i + 1, left - i) // 选（因为每个数只能选一次，选了这个数后就需要跳过这个数）
            stack.removeLast()  // 恢复现场

            dfs(times, i + 1, left) // 不选（不会消耗选择的次数）
        }
        dfs(k, 1, n)
        return ans
    }
}

fun main() {
    val s = Solution()
    println(s.combinationSum3(3, 7))  // Output: [[1,2,4]]
    println(s.combinationSum3(3, 9))  // Output: [[1,2,6], [1,3,5], [2,3,4]]
    println(s.combinationSum3(4, 1))  // Output: []
    println(s.combinationSum3(9, 45))  // Output: [[1,2,3,4,5,6,7,8,9]]
}