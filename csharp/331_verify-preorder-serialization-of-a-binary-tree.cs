namespace L331;

public class Solution
{
    public bool IsValidSerialization(string preorder)
    {
        // 通过栈实现
        // var stack = new Stack<int>();
        // var strArray = preorder.Split(',');
        // var n = strArray.Length;
        // if (n == 1 && strArray[0] == "#") return true;
        // for (int i = 0; i < n; i++)
        // {
        //     switch (strArray[i])
        //         {
        //             case "#":
        //                 if (stack.Count == 0) return false;
        //                 var top = stack.Pop() - 1;
        //                 for (;;)
        //                 {
        //                     if (top < 0)
        //                     {
        //                         return false;
        //                     } 
        //                     else if (top > 0)
        //                     {
        //                         stack.Push(top);
        //                         break;
        //                     }
        //                     else if (stack.Count > 0) // top == 0
        //                     {
        //                         top = stack.Pop() - 1;
        //                     }
        //                     else // stack.Count > 0
        //                     {
        //                         break;
        //                     }
        //                 }
        //                 break;
        //             default:
        //                 if (stack.Count == 0 && 0 < i) return false;
        //                 stack.Push(2);
        //                 break;
        //         }
        // }
        // return stack.Count == 0;

        // 计数实现（动态计算出度和入度）
        // 当遇到 '#' 时，只有入度，没有出度，且入读为 1；
        // 当遇到数字时，出度为 2，入读为 1。
        // 定义 diff = 出度 - 入度；
        // 遍历完成时 diff = 0; 遍历的过程中，diff >= 0 (还没有遍历到 '#' 叶子节点)。
        // 初始化时需要 diff = 1，这样可以统一根节点有一个入度;
        int diff = 1;
        if (preorder[0] == '#')
            diff--;
        else
            diff++; // diff - 1 + 2
        for (int i = 0, n = preorder.Length; i < n; i++)
        {
            if (preorder[i] == ',')
            {
                if (diff-- == 0) return false;  // 无论遍历到什么节点，入度 + 1, 且 diff >= 0
                if (preorder[++i] != '#') diff += 2;  // 非 '#' 节点，出度 + 2
            }
        }
        return diff == 0;
    }
}