package `94`

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun inorderTraversal(root: TreeNode?): List<Int> {
        //dfs
//        val list = mutableListOf<Int>()
//        dfs(root, list)
//        return list
        
        // iterate
        return root?.let(::iterate) ?: emptyList()
    }

    private fun dfs(t: TreeNode?, list: MutableList<Int>) {
        if (t == null) return
        dfs(t.left, list)
        list.add(t.`val`)
        dfs(t.right, list)
    }
    
    private fun iterate(root: TreeNode): List<Int> {
        val list = mutableListOf<Int>()
        val stack = mutableListOf<TreeNode>()
        stack.add(root)
        while (stack.isNotEmpty()) {
            println(stack.map { it.`val` })
            val t: TreeNode = stack.last()
            // left
            t.left?.also {
                stack.add(it)
                t.left = null// When accessing the current node, the node in its left subtree must have been visited.
            } ?: apply {
                // middle
                stack.removeLast().also {
                    list.add(it.`val`) // access
                }
                //right
                t.right?.also(stack::add)
            }
        }
        return list
    }
}