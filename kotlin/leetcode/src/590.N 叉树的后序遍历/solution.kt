package source.`590`.`N 叉树的后序遍历`

import java.util.LinkedList

class Solution {
    class Node(var `val`: Int) {
        var children: List<Node?> = listOf()
    }

    private val ans = LinkedList<Int>()

    fun postorder(root: Node?): List<Int> {
        root?.also(::iterate)
        return ans
    }

    private fun iterate(root: Node) {
        val stack = mutableListOf<Node>()
        stack.add(root)
        while (stack.isNotEmpty()) {
            stack.removeLast().also {
                ans.addFirst(it.`val`)
                it.children.forEach {
                    // 从左到右加入栈中，因为输出链表始终是通过头接加入元素的（倒着加），所以最终顺序正确
                    it?.also(stack::add)
                }
            }
        }
    }
}