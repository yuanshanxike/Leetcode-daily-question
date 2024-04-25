package `40`

class Solution {
    fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
        candidates.sort()
        val count = IntArray(51) { 0 } // 哈希计数
        candidates.forEach { num ->
            count[num]++
        }

        val uniqueCandidates = candidates.toHashSet().toList() //

        val ans = mutableListOf<List<Int>>()
        val stack = mutableListOf<Int>()

        fun dfs(i: Int, left: Int) {
            if (left == 0) {
                ans.add(stack + emptyList())
                return
            }
            if (i > uniqueCandidates.lastIndex || left < 0) return

            val x = uniqueCandidates[i]

            if (count[x] > 0) {  // 对应元素剩余可用才能选
                stack.add(x)
                count[x]--
                dfs(i, left - x) // 选，因为对原数组做了hash，选了还可以再选（判断是否可选主要看哈希计数）
                stack.removeLast()  // 恢复现场
                count[x]++ // 恢复现场
            }

            dfs(i + 1, left) // 不选
        }
        dfs(0, target)
        return ans
    }
}

fun main() {
    val s = Solution()
    s.combinationSum2(intArrayOf(10,1,2,7,6,1,5), 8).also(::println)
    s.combinationSum2(intArrayOf(2,5,2,1,2), 5).also(::println)
}