package source.`102`.二叉树的层序遍历

class Solution {
    class TreeNode(var `val`: Int = 0) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun levelOrder(root: TreeNode?): List<List<Int>> {
        val result = mutableListOf<List<Int>>()
        // BFS
        val queue = ArrayDeque<TreeNode>()
        var levelNum = 1 // init num for root
        root?.also(queue::addLast)
        while (queue.isNotEmpty()) {
            val levelList = mutableListOf<Int>()
            repeat(levelNum) {
                queue.removeFirst().apply {
                    levelList.add(`val`)
                    left?.also(queue::addLast)
                    right?.also(queue::addLast)
                }
            }
            result.add(levelList)
            levelNum = queue.size
        }
        return result
    }
}