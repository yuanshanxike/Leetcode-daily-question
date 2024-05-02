package source.`235`.二叉搜索树的最近公共祖先

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? =
            dfs(root, p!!.`val`, q!!.`val`)

    private fun dfs(node: TreeNode?, p: Int, q: Int): TreeNode? =
            node?.let { t ->
                when {
                    p < t.`val` && q < t.`val` -> dfs(t.left, p, q)
                    p > t.`val` && q > t.`val` -> dfs(t.right, p, q)
                    else -> {
                        val first = dfs(t, p)
                        val second = dfs(t, q)
                        t.takeIf { first != null && second != null }
                    }
                }
            }

    private fun dfs(node: TreeNode?, target: Int): TreeNode? =
            node?.let { t ->
                when {
                    target < t.`val` -> dfs(t.left, target)
                    target > t.`val` -> dfs(t.right, target)
                    else -> t
                }
            }
}