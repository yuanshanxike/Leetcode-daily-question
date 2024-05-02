package source.`1457`.` 二叉树中的伪回文路径`

/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class TreeNode(var `val`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution() {
    private val trackNumArray = IntArray(9) { 0 }
    private var nPath = 0

    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        dfs(root)
        return nPath
    }

    private fun dfs(node: TreeNode?) {
        node?.apply {
            trackNumArray[`val` - 1]++
            println("val:${`val`}")

            left?.also(::dfs)
            right?.also(::dfs)

            if (left == null && right == null) {
                var nOddN = 0
                apply loop@{
                    trackNumArray.forEach {
                        if (it and 1 == 1) { // it % 2 == 1
                            nOddN++
                        }
                        if (nOddN > 1) return@loop
                    }
                }
                if (nOddN <= 1) nPath++
            }

            // when exit: num--, delete the current count of value
            trackNumArray[`val` - 1]--
        }
    }
}