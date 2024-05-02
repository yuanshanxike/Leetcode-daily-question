package source.`993`.二叉树的堂兄弟节点

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun isCousins(root: TreeNode?, x: Int, y: Int): Boolean {
        val ansA = root?.dfs(null, x)
        val ansB = root?.dfs(null, y)
        return ansA.isCousins(ansB)
    }

    private fun Pair<TreeNode?, Int>?.isCousins(another: Pair<TreeNode?, Int>?): Boolean =
            this != null && another != null && second == another.second && first != another.first

    /**
     * @return parent to deepth
     */
    private fun TreeNode.dfs(p: TreeNode?, find: Int): Pair<TreeNode?, Int>? {
        if (`val` == find) {
            return p to 0
        } else if (left == null && right == null) {
            return null
        }

        return left?.dfs(this, find)?.let { (a, b) -> a to b + 1 }
                ?: right?.dfs(this, find)?.let { (a, b) -> a to b + 1 }
    }
}