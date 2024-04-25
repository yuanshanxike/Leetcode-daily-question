import kotlin.math.max

class TreeNode(var `val`: Int) {
     var left: TreeNode? = null
     var right: TreeNode? = null
}


class Solution2385 {
    private var maxMinutes = 0

    data class FindResult(
        val isFind: Boolean,
        val distance: Int, // distance from start point
        val depth: Int  // if (isFind) 不包含 start 节点的另一分枝的高度 else 子树高度
    )

    private val nullFindResult = FindResult(false, 0, 0)

    private fun TreeNode.dfs(start: Int): FindResult {
        if (`val` == start) {
            // 计算 start 节点子树高度
            left?.dfs(start)?.depth?.also { maxMinutes = max(maxMinutes, it) }
            right?.dfs(start)?.depth?.also { maxMinutes = max(maxMinutes, it) }

            return FindResult(true, 1, 1)
        } else {
            val lResult = left?.dfs(start) ?: nullFindResult
            val rResult = right?.dfs(start) ?: nullFindResult

            val isFindStart = lResult.isFind or rResult.isFind
            val curMaxDistance =
                when {
                    lResult.isFind -> lResult.distance
                    rResult.isFind -> rResult.distance
                    else -> 0
                }
            val curMaxDepth =
                when {
                    lResult.isFind -> rResult.depth
                    rResult.isFind -> lResult.depth
                    else -> max(lResult.depth, rResult.depth)
                }

            if (isFindStart) {
                maxMinutes = max(maxMinutes, curMaxDistance + curMaxDepth)
            }

            return FindResult(
                isFindStart,
                curMaxDistance + 1,
                curMaxDepth + 1
            )
        }
    }

    fun amountOfTime(root: TreeNode?, start: Int): Int {
        root?.dfs(start)
        return maxMinutes
    }
}

fun main() {
    println(Solution2385().amountOfTime(
        TreeNode(0)
            .apply {
                left = TreeNode(1).apply {
                    left = TreeNode(3)
                    right = TreeNode(4)
                }
                right = TreeNode(2).apply {
                    left = TreeNode(5).apply { left = TreeNode(6) }
                    right = TreeNode(7).apply {
                        left = TreeNode(8).apply {
                            right = TreeNode(9).apply {
                                left = TreeNode(10)
                            }
                        }
                    }
                }
            },
        4
    ))
}