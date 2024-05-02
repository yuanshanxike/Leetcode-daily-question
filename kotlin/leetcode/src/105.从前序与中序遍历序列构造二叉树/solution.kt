package source.`105`.从前序与中序遍历序列构造二叉树

import java.util.LinkedList

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    private lateinit var preorder: LinkedList<Int>
    private lateinit var inorder: List<Int>

    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        this.preorder = LinkedList(preorder.toList())
        this.inorder = inorder.toMutableList()
        return buildTreeInner(0, inorder.lastIndex)
    }

    /**
     * @param left 当前子树在中序遍历数组中的左边界
     * @param right 当前子树在中序遍历数组中的右边界
     */
    private fun buildTreeInner(left: Int, right: Int): TreeNode? {
        if (left > right) return null
        val value = preorder.removeFirst()
        return TreeNode(value).also {
            val root = inorder.subList(left, right + 1).indexOf(value) + left
            it.left = buildTreeInner(left, root - 1)
            it.right = buildTreeInner(root + 1, right)
        }
    }

    /**
     * 先序遍历：根 - 左 - 右
     * 中序遍历：左 - 根 - 右
     * 对于这两种遍历方式，“左” 和 “根” 出现的顺序是相反的，而 “右” 的顺序则是一致的。
     * 也就是说对于不断寻找左孩子的一条链，在先序和中序中，数组从左到右元素出现的顺序是相反的；
     * 而对于树中任意右孩子，两个数组中从左到右出现的顺序是一致的。
     *
     * 通过将先序遍历的数组元素一直入栈，直到到达当前中序遍历数组中最左端的元素（树中最靠左的节点），
     * 此时栈中从下往上的元素和中序遍历从左往右一部分的元素构成反序，
     * 反序中夹杂（之间）的元素就是前面序列中的那个元素的右子树部分。
     *
     */
    private fun iterate(preorder: IntArray, inorder: IntArray): TreeNode? {
        val stack = mutableListOf<TreeNode>() // for preorder（把左孩子链顺序倒过来，使得与中序遍历相同部分（节点）的排序一致，从而方便比较）
        var index = 0 // for inorder
        val root = preorder.getOrNull(0)?.let(::TreeNode)
        root?.also(stack::add)
        preorder.filterIndexed { idx, _ -> idx != 0 }.forEach {
            val node = TreeNode(it)
            // 在左孩子链上填充栈元素到最左端（中序遍历的第一个元素）
            if (stack.isNotEmpty() && stack.last().`val` != inorder[index]) { // 还没到达当前最左端
                stack.last().left = node
                stack.add(node)
            } else { // 已经到达当前最左端
                var lastPopNode: TreeNode? = null
                // 去除纯左孩子链
                while (stack.isNotEmpty() && stack.last().`val` == inorder[index]) {
                    lastPopNode = stack.removeLast()
                    index++
                }
                // stack is empty OR 当前栈顶节点存在右孩子分叉
                stack.add(node) // 把新节点入栈，作为一条新的左孩子链
                lastPopNode?.right = node // 正确插入新节点（向右分叉）
            }
        }
        return root
    }
}

fun main() {
    Solution().apply {
        buildTree(intArrayOf(3, 9, 20, 15, 7), intArrayOf(9, 3, 15, 20, 7))
    }
}