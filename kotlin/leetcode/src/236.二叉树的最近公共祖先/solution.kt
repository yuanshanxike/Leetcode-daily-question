package source.`236`.二叉树的最近公共祖先

class Solution {
    class TreeNode(var `val`: Int = 0) {
        var left: TreeNode? = null
        var right: TreeNode? = null
    }

    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        return root?.dfs(p!!.`val`, q!!.`val`)
    }

    private fun TreeNode.dfs(pV: Int, qV: Int): TreeNode? {
        if (`val` == pV || `val` == qV) return this // 匹配上其中一个节点时就返回，此时最近公共祖先可能就是它，或者是其祖先节点
        val leftMach = left?.dfs(pV, qV)
        val rightMach = right?.dfs(pV, qV)
        if (leftMach != null && rightMach != null) return this // 当一个节点的左右孩子都匹配上时，它一定是他们的最近公共祖先
        return leftMach ?: rightMach // 否则只需要转发左右孩子的匹配结果
    }
//        var selfFlag = 0
//        if (`val` == pV || `val` == qV) {
//            selfFlag++
//        }
//        var leftFlag = 0
//        left?.dfs(pV, qV)?.also {
//            leftFlag = it.second
//            if (leftFlag == 2) return it
//            if (leftFlag + selfFlag == 2) return this to 2
//        }
//        right?.dfs(pV, qV)?.also {
//            if (it.second == 2) return it
//            if (it.second + selfFlag == 2 || leftFlag + it.second == 2) return this to 2
//        }
//        return this to selfFlag
//    }
}