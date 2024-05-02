package source.`889`.根据前序和后序遍历构造二叉树

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    /**
     * 前序遍历：根 - 左 - 右
     * 后序遍历：左 - 右 - 根
     * @param preorder 对于下标i，i后面的元素不可能是其祖孙节点；
     * @param postorder 对于下标j，j后面的元素不可能是其子孙节点。
     * 所以对于 preorder 中的元素a，如果其后面的某个元素b在 postorder 中也在该a的后面，
     * 则b只能是a的兄弟节点（父节点的右孩子）或者近亲节点(其祖先的右节点)。
     * 需要保证在插入后，其父节点与其，出现在前序遍历与后序遍历中的位置关系是相反的。
     */
    fun constructFromPrePost(preorder: IntArray, postorder: IntArray): TreeNode? {
        // <value, index>
        val hashMap = HashMap<Int, Int>()
        val stack = mutableListOf<TreeNode>()
        postorder.forEachIndexed { index, i ->
            hashMap[i] = index
        }
        var root: TreeNode? = null
        preorder.forEach {
            if (stack.isEmpty()) {
                root = TreeNode(it).also(stack::add)
            } else {
                val node = TreeNode(it)
                val t = stack.last()
                if (hashMap[it]!! < hashMap[t.`val`]!!) {
                    // 两个元素，在前序遍历和后序遍历中的位置关系相反，则可以直接将前序遍历中前面的元素作为后面元素的左子节点
                    t.left = node
                } else {
                    // 两个元素，在前序遍历和后序遍历中的位置关系相同，则需要在其祖先节点中，找到满足在前序和后序遍历中，位置关系相反，且右孩子为null的节点作为父节点插入
                    while (hashMap[it]!! > hashMap[stack.last().`val`]!! || stack.last().right != null) {
                        stack.removeLast()
                    }
                    stack.lastOrNull()?.right = node
                }
                stack.add(node)
            }
        }
        return root
    }

    fun constructFromPrePostByDFS(preorder: IntArray, postorder: IntArray): TreeNode? {
        postorder.forEachIndexed { index, i ->
            hash[i] = index
        }
//        return preorder.toList().dfs(0)
        return preorder.dfs(0)
    }

    // <value, index>
    private val hash = hashMapOf<Int, Int>()

    /**
     * 假设一定存在左子树。
     * 那么前序遍历中，根节点后面的数值就是左孩子，
     * 此时在后序遍历中找到左孩子的下标 k，k + 1 就是这棵树中左子树的节点数量；
     * 前序遍历中 0 + k + 1 + 1 的下标处就是根节点的右孩子。
     * 根据左右孩子的下标，在前序数组中分出左右子树的区间，递归分治进行构建
     * @param startIdx 对应后序遍历中子区间开始的下标（相对于原数组），需要与 hash 中取出的下标共同计算子区间元素的下标
     */
    private fun List<Int>.dfs(startIdx: Int): TreeNode =
            TreeNode(first()).also { root ->
                println("node: ${root.`val`}")
                getOrNull(1)?.let { hash[it]!! - startIdx + 1 }?.also { lcNum ->
                    println("list: $this, start in post: $startIdx")
                    val rcIndex = lcNum + 1
                    if (rcIndex > 1) {
                        root.left = subList(1, rcIndex).dfs(startIdx) // 后续遍历数组的左子树开始的下标，等于原数组的开始下标，因为它的最左面放的就是左子树
                    }
                    if (rcIndex < size) { // 在假设一定有左子树的前提下，不一定会有右子树
                        root.right = subList(rcIndex, size).dfs(startIdx + lcNum)  // 后续遍历数组的右子树开始的下标，等于其左子树的数量 + 子数组开始的坐标
                    }
                }
            }

    private fun IntArray.dfs(startIdx: Int): TreeNode =
            TreeNode(first()).also { root ->
                println("node: ${root.`val`}")
                getOrNull(1)?.let { hash[it]!! - startIdx + 1 }?.also { lcNum ->
                    val rcIndex = lcNum + 1
                    if (rcIndex > 1) {
                        root.left = copyOfRange(1, rcIndex).dfs(startIdx) // 后续遍历数组的左子树开始的下标，等于原数组的开始下标，因为它的最左面放的就是左子树
                    }
                    if (rcIndex < size) { // 在假设一定有左子树的前提下，不一定会有右子树
                        root.right = copyOfRange(rcIndex, size).dfs(startIdx + lcNum)  // 后续遍历数组的右子树开始的下标，等于其左子树的数量 + 子数组开始的坐标
                    }
                }
            }
}

fun main() {
//    Solution().apply {
////        constructFromPrePostByDFS(intArrayOf(1, 2, 4, 5, 3, 6, 7), intArrayOf(4, 5, 2, 6, 7, 3, 1))
//        constructFromPrePostByDFS(intArrayOf(9, 10, 6, 1, 4, 2, 3, 7, 8, 5), intArrayOf(10, 4, 1, 7, 5, 8, 3, 2, 6, 9))
//    }
    
    Solution2().apply {
//        constructFromPrePost(intArrayOf(1, 2, 4, 5, 3, 6, 7), intArrayOf(4, 5, 2, 6, 7, 3, 1))
        constructFromPrePost(intArrayOf(9, 10, 6, 1, 4, 2, 3, 7, 8, 5), intArrayOf(10, 4, 1, 7, 5, 8, 3, 2, 6, 9))
    }
}

class Solution2 {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun constructFromPrePost(preorder: IntArray, postorder: IntArray): TreeNode? {
        return preorder.dfs(postorder)
    }

    private fun IntArray.dfs(postorder: IntArray): TreeNode? {
        if (isEmpty()) return null
        return TreeNode(first()).also { root ->
            if (size == 1) return@also
            val lcRootVal = this[1]
            val lcNum = postorder.indexOf(lcRootVal) + 1 // == rcIndex in postorder
            root.left = copyOfRange(1, lcNum + 1).dfs(postorder.copyOfRange(0, lcNum))
            root.right = copyOfRange(lcNum + 1, size).dfs(postorder.copyOfRange(lcNum, lastIndex))
        }
    }
}