package `103` 

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }
    
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {
        val result = mutableListOf<List<Int>>()
        // BFS
        val queue = ArrayDeque<TreeNode>()
        var levelNum = 1 // init num for root
        root?.also(queue::addLast)
        var isReverse = false
        while (queue.isNotEmpty()) {
            val levelList = mutableListOf<Int>()
            repeat(levelNum) {
                queue.removeFirst().apply {
                    levelList.add(`val`)
                    left?.also(queue::addLast)
                    right?.also(queue::addLast)
                }
            }
            result.add(levelList.let { if (isReverse) it.reversed() else it })
            levelNum = queue.size
            isReverse = isReverse.not()
        }
        return result
    }
}