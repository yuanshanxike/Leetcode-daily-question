package source.`144`.二叉树的前序遍历

class Solution {
    class TreeNode(var `val`: Int = 0) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    private val list = mutableListOf<Int>()

    fun preorderTraversal(root: TreeNode?): List<Int> {
        // dfs
//        dfs(root)
        // iterate
        iterate(root)
        return list
    }

    private fun dfs(t: TreeNode?) {
        if (t == null) return
        list.add(t.`val`)
        dfs(t.left)
        dfs(t.right)
    }

    private fun iterate(root: TreeNode?) {
        val stack = mutableListOf<TreeNode>()
        root?.also(stack::add)
        while (stack.isNotEmpty()) {
            var t: TreeNode? = stack.removeLast()
            t?.`val`?.also(list::add) // acess
            t?.right?.also(stack::add) // add right child to stack instend of itself
            do {
                t = t?.left
                t?.`val`?.also(list::add) // acess for left child
                t?.right?.also(stack::add) // add right child to stack instend of itself
            } while (t != null)
        }
    }
}