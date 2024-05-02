package source.`2641`.`二叉树的堂兄弟节点 II`

/**
 * BFS
 */
class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    private val visitedSet = HashSet<TreeNode>()

    private val parentHash = HashMap<TreeNode, TreeNode?>()

    private var TreeNode.parent: TreeNode?
        get() {
            val t = parentHash.remove(this)
            return t
        }
        set(value) {
            value?.also {
                parentHash[this] = it
            }
        }

    fun replaceValueInTree(root: TreeNode?): TreeNode? {
        root?.also(::bfs)
        return root
    }

    private fun bfs(root: TreeNode) {
        val queue = ArrayDeque<TreeNode>()
        queue.addLast(root)
        parentHash[root] = null
        root.`val` = 0
        while (queue.isNotEmpty()) {
            var layerSum = 0
            queue.forEach {
                layerSum += it.`val`
                visitedSet.add(it)
            }
            while (queue.firstOrNull() in visitedSet) {
                queue.removeFirst().apply {
                    arrayOf(left, right).filterNotNull().forEach { t ->
                        t.parent = this
                        queue.add(t)
                    }

                    val p = parent
                    p?.left?.takeIf { it != this }
                            ?.also { pLeft ->
                                this.`val` = pLeft.`val`
                                return@apply
                            }
                    `val` = layerSum - (p?.left?.`val` ?: 0) - (p?.right?.`val` ?: 0)
                }
            }
        }
    }
}