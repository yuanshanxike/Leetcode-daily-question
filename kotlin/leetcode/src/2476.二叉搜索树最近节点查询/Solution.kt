package source.`2476`.二叉搜索树最近节点查询

class Solution {
    class TreeNode(var `val`: Int) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    private lateinit var pairList: MutableList<Int>


    // Time limit exceeded （因为题目给的二叉查找树树可能极不平衡）
    fun closestNodes(root: TreeNode?, queries: List<Int>): List<List<Int>> {
        val list = mutableListOf<List<Int>>()
        queries.forEach { query ->
            pairList = MutableList(2) { -1 }
            root?.also {
                dfs(it, query)
                list.add(pairList)
            }
        }
        return list
    }

    private fun dfs(root: TreeNode, query: Int) {
        when {
            root.`val` == query -> {
                pairList.replaceAll { query }
            }

            query < root.`val` -> {
                pairList[1] = root.`val`
                root.left?.also {
                    dfs(it, query)
                }
            }

            else -> {  // root.val < query
                pairList[0] = root.`val`
                root.right?.also {
                    dfs(it, query)
                }
            }
        }
    }

    private val nodeList = mutableListOf<Int>()

    fun closestNodes_(root: TreeNode?, queries: List<Int>): List<List<Int>> {
        val ans = mutableListOf<List<Int>>()
        // 中序遍历二叉查找树，就能够获得一个有序数组
        root.dfs()
        queries.forEach { query ->
            // 获得有序数组后，每次二分查找都可以保证查找的时间复杂度是 O(logN)；避免如果二叉搜索树失衡，每次查找效率变为 O(n)
            nodeList.binarySearch(query).also { (left, right) ->
                ans.add(listOf(left, right))
            }
        }
        return ans
    }

    private fun TreeNode?.dfs() {
        if (this == null) return
        left?.dfs()
        nodeList.add(`val`)
        right?.dfs()
    }

    private fun List<Int>.binarySearch(target: Int): Pair<Int, Int> {
        var left = 0
        var right = lastIndex
        while (left <= right) {
            val mid = (left + right) / 2
            when {
                get(mid) == target -> return get(mid) to get(mid)
                get(mid) < target -> left = mid + 1
                else -> right = mid - 1  // target < get(mid)
            }
        }
        // left > right
        val max = if (left < size) get(left) else -1
        val min = if (right >= 0) get(right) else -1
        return min to max
    }
}