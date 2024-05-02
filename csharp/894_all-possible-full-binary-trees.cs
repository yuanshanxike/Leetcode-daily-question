using Leetcode;

namespace L894;

// /// <summary>
// ///  dp：
// ///  https://leetcode.cn/problems/all-possible-full-binary-trees/solutions/2719981/dong-tai-gui-hua-pythonjavacgojsrust-by-u3waz/?envType=daily-question&envId=2024-04-02
// /// </summary>
// public class Solution {
//     public IList<TreeNode> AllPossibleFBT(int n) {
//         if (n % 2 == 0) return [];
//         var leafNum = (n + 1) / 2;
//         var F = new List<TreeNode>[leafNum + 1];
//         F[1] = [new TreeNode()];
//         for (int i = 2; i <= leafNum; i++)
//         {
//             F[i] = [];  // init list
//             // peek a left tree list
//             for (int j = 1; j < i; j++)
//             {
//                 var lTL = F[j];
//                 // select the right tree list
//                 var rTL = F[i - j];
//                 foreach (var lT in lTL)
//                 {
//                     foreach (var rT in rTL)
//                     {
//                         var root = new TreeNode
//                         {
//                             left = lT,
//                             right = rT
//                         };
//                         F[i].Add(root);
//                     }
//                 }
//             }
//         }
//         return F[leafNum];
//     }
// }


/// <summary>
/// 类似地，也可以通过分支法来递归地进行构建。
/// https://leetcode.cn/problems/all-possible-full-binary-trees/solutions/2713780/suo-you-ke-neng-de-zhen-er-cha-shu-by-le-1uku/?envType=daily-question&envId=2024-04-02
/// 
/// 这里从另一个点来看这个问题。由题意可推出，真二叉树的节点数为奇数。
/// 对于一个真二叉树，其左、右子树同样也是真二叉树。也就是说：左右子树的节点数也分别都是奇数。
/// 递归出口: 节点数为 1 的真二叉树。
/// 
/// 对于节点数为 n(奇数) 的真二叉树，其左右子树的节点数可以为以下情况:
/// [(1,n−2),(3,n−4),(5,n−6),⋯,(n−2,1)]
/// </summary>
public class Solution {
    // memory
    private readonly Dictionary<int, IList<TreeNode>> memory = [];

    public IList<TreeNode> AllPossibleFBT(int n) {
        if (n % 2 == 0) return [];
        if (n == 1) return [new TreeNode()];
        if (memory.TryGetValue(n, out var value)) return value;
        List<TreeNode> rootList = [];
        for (int i = 1; i < n-1; i += 2)
        {
            foreach (var lt in AllPossibleFBT(i)) {
                foreach (var rt in AllPossibleFBT(n - 1 - i))
                {
                    var root = new TreeNode(left: lt, right: rt);
                    rootList.Add(root);
                }
            }
        }
        memory[n] = rootList;
        return rootList;
    }
}