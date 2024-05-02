package source.`1261`.在受污染的二叉树中查找元素

class TreeNode(var `val`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class FindElements(root: TreeNode?) {

    // 虽然说节点最多有 10^4 个，但不代表节点的最大值就是 10^4 - 1（考虑每个节点只有右孩子，连成一条线的case）
    // 节点最大值要看 target 的范围: 0 <= target <= 10^6
//    private val isExistNodes = BooleanArray(10_000) { false }

    private val isExistNodes = mutableSetOf<Int>()

    init {
        dfs(root, 0)
    }

    fun find(target: Int): Boolean = isExistNodes.contains(target)

    fun dfs(t: TreeNode?, value: Int) {
        if (t == null) return
        isExistNodes.add(value)
        dfs(t.left, value * 2 + 1)
        dfs(t.right, value * 2 + 2)
    }

}