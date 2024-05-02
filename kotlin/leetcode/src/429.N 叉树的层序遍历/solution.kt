package source.`429`.`N 叉树的层序遍历`

class Solution {
    class Node(var `val`: Int) {
        var children: List<Node?> = listOf()
    }

    fun levelOrder(root: Node?): List<List<Int>> {
        val result = mutableListOf<List<Int>>()
        // BFS
        val queue = ArrayDeque<Node>()
        var levelNum = 1 // init num for root
        root?.also(queue::addLast)
        while (queue.isNotEmpty()) {
            val levelList = mutableListOf<Int>()
            repeat(levelNum) {
                queue.removeFirst().apply {
                    levelList.add(`val`)
                    children.forEach { node ->
                        node?.also(queue::addLast)
                    }
                }
            }
            result.add(levelList)
            levelNum = queue.size
        }
        return result
    }
}