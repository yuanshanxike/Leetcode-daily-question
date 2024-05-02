package source.`589`.`N 叉树的前序遍历`

class Solution {
    class Node(var `val`: Int) {
        var children: List<Node?> = listOf()
    }

    private val ans = mutableListOf<Int>()

    fun preorder(root: Node?): List<Int> {
//        root.dfs()
        root?.also(::iterate)
        return ans
    }

    private fun Node?.dfs() {
        if (this == null) return

        ans.add(`val`)
        children.forEach {
            it?.dfs()
        }
    }

    private fun iterate(root: Node) {
        val stack = mutableListOf<Node>()
        stack.add(root)
        while (stack.isNotEmpty()) {
            stack.removeLast().also {
                ans.add(it.`val`)
                val children = it.children
                for (i in children.lastIndex downTo 0) {
                    // 对于每棵子树，从右向左将其子节点压入栈中，可以省略掉用于记录每个节点当前访问到的位置的 hashMap
                    children.getOrNull(i)?.also(stack::add)
                }
            }
        }
    }
}