package source.`987`.二叉树的垂序遍历

import java.util.LinkedList

class Solution {
    class TreeNode(var `val`: Int = 0) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    // <t, row>
    private val hash = HashMap<TreeNode, Int>()

    private val TreeNode.row: Int
        get() = hash[this] ?: -1
    val result = LinkedList<MutableList<TreeNode>>()

    fun verticalTraversal(root: TreeNode?): List<List<Int>> {
        dfs(root, 0, 0)
        return result.map { list ->
            // sort inner list
            list.sortedWith { t1, t2 ->
                val diff = t1.row - t2.row
                if (diff != 0) {
                    diff
                } else {
                    t1.`val` - t2.`val`
                }
            }.map { it.`val` }
        }
    }

    private var firstCol = 0
    private var lastCol: Int = 0

    private fun dfs(t: TreeNode?, row: Int, col: Int) {
        if (t == null) return

        when {
            col in firstCol..lastCol ->
                if (firstCol == lastCol) { // root
                    result.add(mutableListOf(t))
                } else {
                    result[col - firstCol].add(t)
                }

            col < firstCol -> {
                firstCol = col
                result.add(0, mutableListOf(t))
            }

            else -> {
                lastCol = col
                result.add(mutableListOf(t))
            }
        }
        hash[t] = row

        dfs(t.left, row + 1, col - 1)
        dfs(t.right, row + 1, col + 1)
    }
}