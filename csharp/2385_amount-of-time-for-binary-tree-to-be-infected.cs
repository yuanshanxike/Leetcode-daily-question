using Struct;

namespace L2385;

public class Solution {
    /// <summary>
    /// 感染所需的最短时间 = max(从*每一个*start的父节点到 star 节点距离 + 其另一个分支的深度, start 左子树的深度, start 右子树的深度)
    /// </summary>
    /// <param name="root"></param>
    /// <param name="start"></param>
    /// <returns></returns>
    public int AmountOfTime(TreeNode root, int start) {
        LinkedList<TreeNode?> linkedList = [];
        TreeNode? startNode = null;
        Func<TreeNode?, int, bool> findXParents = (_, _) => { return false; };
        findXParents = (n, x) => {
            if (n == null) return false;
            if (n.val == x) {
                startNode = n;
                return true;
            }
            var foundLeft = findXParents(n.left, x);
            var foundRight = findXParents(n.right, x);
            var found = foundLeft || foundRight;
            if (foundLeft) linkedList.AddLast(n.right);  // 找到目标节点存在于左子树，则将右子树加入链表的最后面
            if (foundRight) linkedList.AddLast(n.left);  // 找到目标节点存在于右子树，则将左子树加入链表的最后面
            return foundLeft || foundRight;
        };
        findXParents(root, start);
        // caculate the max depth
        if (startNode != null)
        {
            var maxDepth = MeasureDepth(startNode);
            var p = linkedList.First;
            for (int d = 1; p != null; p = p?.Next, d++) {
                maxDepth = Math.Max(maxDepth, MeasureDepth(p.Value) + 1 + d);
            }
            return maxDepth;
        }
        return 0;
    }

    private int MeasureDepth(TreeNode? n, int curDepth = 0) {
        if (n == null) return curDepth - 1;
        var leftDepth = MeasureDepth(n.left, curDepth + 1);
        var rightDepth = MeasureDepth(n.right, curDepth + 1);
        return Math.Max(leftDepth, rightDepth);
    }
}