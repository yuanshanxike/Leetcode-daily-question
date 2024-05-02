package source.`145`.二叉树的后序遍历

import java.util.LinkedList
import java.util.Stack

class Solution {
    class TreeNode(var `val`: Int = 0) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun postorderTraversal(root: TreeNode?): List<Int> {
        // recursion
//        val list = mutableListOf<Int>()
//        fun dfs(t: TreeNode?) {
//            if (t == null) return
//            dfs(t.left)
//            dfs(t.right)
//            list.add(t.`val`)
//        }
//        dfs(root)
//        return list

        // iterate
        return iterate(root)
    }

    private fun iterate(root: TreeNode?): List<Int> {
        val list = mutableListOf<Int>()
        val stack = mutableListOf<TreeNode>()
        var t: TreeNode? = root
        var prev: TreeNode? = null
        while (t != null || stack.isNotEmpty()) {
            // left
            while (t != null) {
                stack.add(t)
                t = t.left
            }
            // 从栈中弹出的元素，对于被弹出节点，左子树一定是访问完了的
            t = stack.removeLast()
            // 如果当前节点的右子树为为空，或者右子树等于刚才访问过的子树，则表示当前节点构成的子树已经访问完成
            if (t.right == null || t.right == prev) {
                list.add(t.`val`)
                prev = t // 标记当前节点为根的子树已经完成了访问
                t = null // 把指针置空，便于下一个循环直接从栈顶（当前子树的父节点）取数
            } else { // 还未完成右子树的访问，需要继续访问右子树
                stack.add(t) // 弹出的子树根节点重新入栈，方便之后访问完成当前子树的右子树后，重新对子树的根节点进行 prev 标记
                t = t.right
            }
        }
        return list
    }

    /**
     * 入栈顺序为 (入)根-(出)-左-右，根和左、右不会同时存在于栈中，根出栈后，左、右才会入栈。
     * 对于储存结果的 LinkedList 来说，每次都是通过接头插入。
     * 这样对于任意子树，都保证了在结果 list 的顺序都是 左-右-根，符合后序遍历的要求
     */
    fun postorderTraversalByStack(root: TreeNode?): List<Int> {
        val result = LinkedList<Int>()
        var t = root
        val stack = Stack<TreeNode>()
        t?.also(stack::push)
        while (stack.isNotEmpty()) {
            t = stack.pop()
            result.addFirst(t.`val`)
            t.left?.also(stack::push)
            t.right?.also(stack::push)
        }
        return result
    }
}