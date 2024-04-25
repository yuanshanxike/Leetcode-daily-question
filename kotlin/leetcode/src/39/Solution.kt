package `39`

class SolutionBruteforce {
    fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
        val set = HashSet<Int>(candidates.toList())
//        val stack = mutableListOf<Int>()
        val ans = HashSet<List<Int>>() //HashSet<List<Int>>()
        val mapList = mutableListOf<Pair<Int, List<Int>>>()
        candidates.forEach { num ->
            var times = 1;
            val sum: () -> Int = { num * times }
            // 将单个元素可能的重复项集合加入
            while (sum() <= target) {
//                stack.add(num)
//                val diff = target - sum()
//                if (set.contains(diff) || diff == 0) {
//                    val list = mutableListOf<Int>()
//                    list.addAll(stack.let { if (diff == 0) it else it + diff }.sorted())
//                    ans.add(list)
//                }
                mapList.add(sum() to List(times) { num })
                times++
            }
//            stack.clear()
        }
        ans.dfs(mapList, target, emptyList())
        return ans.toList()
    }

    private fun HashSet<List<Int>>.dfs(setMap: List<Pair<Int, List<Int>>>, target: Int, curSet: List<Int>) {
        if (target == 0) {
            add(curSet.sorted())
            return
        }
        for ((sum, s) in setMap) {
            if (sum <= target) {
                dfs(setMap, target - sum, curSet + s)
            }
        }
    }
}

class Solution {
    private val stack = mutableListOf<Int>()

    fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
        val  ans = mutableListOf<List<Int>>()
        candidates.sort()
        candidates.dfs(0, target, ans)
        return ans
    }

    /**
     * 从左往右，选了还可以继续选这个元素，不选则跳过这个元素。这样递归可以覆盖到所有可能的组合，同时因为单向性(从左往右)保证了不会选取到相同组合
     * @param i 对于第 i 个元素选或不选
     * @param left 减去选了的 candidates 元素后，剩余的 target
     */
    private fun IntArray.dfs(i: Int, left: Int, ans: MutableList<List<Int>>) {
//        if (left < 0 || i > lastIndex) return  // 所选组合不成立（选的递归出口） 或者 没得选了（不选的递归出口）
        if (i > lastIndex || left < this[i]) return  // 剪枝优化：因为此时 candidates 是非递减的，如果当前元素比目标值大，后面的元素也不可能使得目标值变到 0 了，可直接返回（选的递归出口） 或者 没得选了（不选的递归出口）
//        if (left == 0) { // 所选组合满足要求
        if (left == this[i]) {  // 剪枝优化
//            val combSet = mutableListOf<Int>()
//            combSet.addAll(stack)
//            combSet += this[i]  // 剪枝优化需要额外再加上减去后刚好等于0的这个元素
            ans.add(stack + this[i])
            return
        }

        stack.add(this[i])
        dfs(i, left - this[i], ans)  // 选，选了还可以继续选择这个元素
        stack.removeLast() // 恢复现场

        dfs(i + 1, left, ans)   // 不选，则跳过这个元素
    }
}

fun main() {
    val s = Solution();
    println(s.combinationSum(intArrayOf(2 ,3, 6, 7), 7)) // Output: [[2,2,3],[7]]
    println(s.combinationSum(intArrayOf(2, 3 ,5), 8)) // Output: [[2,2,2,2],[2,3,3],[3,5]]
    println(s.combinationSum(intArrayOf(2), 1)) // Output: []
    println(s.combinationSum(intArrayOf(7,3,2),18)) //
}