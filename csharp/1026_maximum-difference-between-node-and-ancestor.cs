using Leetcode;

namespace L1026;

public class Solution {
    public int MaxAncestorDiff(TreeNode root) {
        Func<TreeNode?, int, int, int> dfs = (_, _, _) => -1;  // return maxV
        dfs = (node, min, max) => {
            if (node == null) return max - min;
            min = Math.Min(min, node.val);
            max = Math.Max(max, node.val);
            var maxV = dfs(node.left, min, max);
            maxV = Math.Max(maxV, dfs(node.right, min, max));
            return maxV;
        };
        return dfs(root, int.MaxValue, int.MinValue);
    }
}