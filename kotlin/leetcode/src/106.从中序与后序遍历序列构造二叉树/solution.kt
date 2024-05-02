package source.`106`.从中序与后序遍历序列构造二叉树

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    private lateinit var postorder: MutableList<Int>

    // <value, index>
    private val hashMap = HashMap<Int, Int>()

    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
//        this.postorder = postorder.toMutableList()
//        inorder.forEachIndexed { index, i ->
//            hashMap[i] = index
//        }
//        return dfs(0, inorder.lastIndex)
        return iterate(inorder, postorder)
    }

    private fun dfs(left: Int, right: Int): TreeNode? {
        if (left > right) return null
        val value = postorder.removeLast()
        return TreeNode(value).also {
            val root = hashMap[value]!!
            it.right = dfs(root + 1, right)
            it.left = dfs(left, root - 1)
        }
    }

    /**
     * 后序遍历：左 - 右 - 根
     * 中序遍历：左 - 根 - 右
     * 对于这两种遍历方式，“右” 和 “根” 出现的顺序是相反的，而 “左” 的顺序则是一致的。
     * 也就是说对于不断寻找右孩子的一条链，在后序和中序中，数组从左到右元素出现的顺序是相反的；
     * 而对于树中任意左孩子，两个数组中从右到左出现的顺序是一致的。
     *
     * 通过将后序遍历的数组元素从右向左一直入栈，直到到达当前中序遍历数组中最右端的元素（树中最靠右的节点），
     * 此时栈中从下往上的元素和中序遍历从右往左一部分的元素构成反序，
     * 反序中夹杂（之间）的元素就是右边序列中的那个元素的左子树部分。
     */
    private fun iterate(inorder: IntArray, postorder: IntArray): TreeNode? {
        val stack = mutableListOf<TreeNode>() // for postorder（入栈的节点需要保证已经拥有父节点，根节点除外）
        var index = inorder.lastIndex // for inorder（index 右边的节点表示已经构造完成的节点，也就是父节点已拥有且所有孩子的值已经写入）
//        fun post() = stack.last()
//        fun peek() = stack.last()
//        fun pop() = stack.removeLast()
//        fun push(t: TreeNode) { stack.add(t) }
//        fun mid() = inorder[index]
        var root: TreeNode? = null
//        val lcStack = mutableListOf<TreeNode>() // 存放有左子树的节点的栈
        for (i in postorder.lastIndex downTo 0) {
            val node = TreeNode(postorder[i])
            if (i == postorder.lastIndex) root = node
            /**
             * 纯右孩子链因为每个都没有左孩子，所以
             * 其中序遍历的顺序是 根 - 右 - 根 - 右，也就是 根 - 根 - 根 - ...
             * 后续遍历是 右 - 根 - 右 - 根，也就是 右 - 右 - 右 - 右 - ...
             * 它们两顺序相反
             */
            if (stack.isEmpty() || stack.last().`val` != inorder[index]) { // 当前子树，一直找右孩子形成的链
                stack.lastOrNull()?.right = node
                stack.add(node) // 压入栈中，此时节点一定是确定了右孩子（也就是确定了其父节点），但是左孩子还未知
            } else { // 找到了当前子树（index 右边的元素和栈中的元素同时出栈，表示已经构造完毕，相当于已经从树中删除了）最右边的节点，即 val 为 inorder[index]
                var tree: TreeNode? = null  // last pop treeNode from stack
                while (stack.isNotEmpty() && stack.last().`val` == inorder[index]) { // 将右孩子链中，没有左孩子的节点剔除，因为它们已经是构造完毕的节点（两数组的原数组中完全反序的无间断的两段就是纯右孩子链）
                    tree = stack.removeLast()
                    index-- // 此时中序遍历中的拿到的节点和后续遍历出栈的节点是一致的，都是纯右孩子链最右端的节点。所以要与后序遍历一样，同时返回其父节点
                }
                tree?.left = node // 上面的循环已经将当前子树的右孩子及根节点都剔除掉了，新入栈的节点（来自后序遍历）一定是被剔除节点的左孩子
                stack.add(node) // 将新节点放入后，然后依旧寻找这个节点为根的子树的右孩子形成的链
            }

//            val node = TreeNode(postorder[i])
//            stack.add(node)
//            val a = inorder.lastIndex - mid()
//            ////////// 出栈节点的数量需要等于 index 移动的距离，表示当前已经创建完成的节点
//            while (stack.isNotEmpty() && (mid() == post() /*|| stack.last().right != null*/)) {  // 等待创建的节点 和 已经创建过，因为有左子树又重新入栈的节点 都需要出栈
//                stack.removeLast().also { t ->
//                    if (/*t.right == null*/) {
//                        t.right = tree
//                        index--
//                    } else {
//                        t.left = tree
//                    }
//                    tree = t
//
//                    println("remove: ${t.`val`}, index: $index, left: ${t.left?.`val`}, right: ${t.right?.`val`}")
//                }
//            }
//            while (lcStack.isNotEmpty())
//                if (tree != null && index >= 0 && mid() != post()) {  // 说明刚才出栈的节点还存在左子树
//                    tree!!.also(lcStack::add) // 把它加到 lcStack
//                    println("add to stack: ${tree?.`val`}; index: $index")
//                    tree = null // 那么，最近就没有节点出栈
//                }
        }
        return root
    }
}

fun main() {
    Solution().apply {
        buildTree(intArrayOf(9, 3, 15, 20, 7), intArrayOf(9, 15, 7, 20, 3))
//        buildTree(intArrayOf(9, 3, 15, 20, 2, 7), intArrayOf(9, 15, 2, 7, 20, 3))
    }
}