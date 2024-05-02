using Leetcode;

namespace L1379;

public class Solution
{
    public TreeNode? GetTargetCopy(TreeNode original, TreeNode? cloned, TreeNode target)
    {
        Stack<Direction> optStack = new();
        optStack.Dfs(original, target);
        while (optStack.Count != 0)
        {
            var opt = optStack.Pop();
            switch (opt)
            {
                case Direction.LEFT:
                    cloned = cloned?.left;
                    break;
                case Direction.RIGHT:
                    cloned = cloned?.right;
                    break;
            }
        }
        return cloned;
    }
}

enum Direction { LEFT, RIGHT }

static class Router
{
    internal static bool Dfs(this Stack<Direction> stack, TreeNode? original, TreeNode target)
    {
        if (original == null) return false;
        if (original == target) return true;

        if (stack.Dfs(original.left, target))
        {
            stack.Push(Direction.LEFT);
            return true;
        }
        else if (stack.Dfs(original.right, target))
        {
            stack.Push(Direction.RIGHT);
            return true;
        }
        else return false;
    }
}