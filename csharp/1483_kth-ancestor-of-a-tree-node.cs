using System.Numerics;
using System.Security.Cryptography;

namespace L1483;

// public class TreeAncestor(int n, int[] parent) {

//     // TLE
//     // public int GetKthAncestor(int node, int k) {
//     //     while (--k >= 0) {
//     //         var preNode = node;
//     //         node = parent[node];
//     //         if (node == -1) break;
//     //     }
//     //     return node;
//     // }

//     }
// }

/// <summary>
/// 类似于 “长链剖分(https://oi-wiki.org/graph/hld/)” 的一种做法
/// 
/// 设计思路：考虑到 GetKthAncestor 如果一个个访问其父节点找第 k 个祖先节点的话，
/// 假设树的所有节点构成了一条直线的话，可以将所元素存到一个数组，然后通过计算下标，可以在 O(1) 的时间内找到其第 k 个祖先节点。
/// 但如果树有多个分叉，就不是一条链。然而，我们也可以通过 “长链剖分” 将其划分成多条链，每条链的其中一端一定是*叶子节点*。
/// 这样，我们就可以使用这些链，自下而上对 parent 数组进行预处理。这样，在每条链上查找第 k 个祖先节点时，时间复杂度就变成了 O(1)，那么单次查找总的时间复杂度就和这次查找跨越的链数线性相关。
/// 为了实现这样的算法，我们需要和拆分链数相当数量的 List，用来按从下往上的顺序存储链上的节点，同时也需要知道每个节点在各自链上的（从下往上的）位置。
/// 所以，我们可以维护一个数组（或者字典），在预处理的时候记录下所在 List 的引用和在这个 List 上的坐标。
/// 为了避免没必要的空间浪费，每两条链之间最多只有一个共同节点（即：两条链相交处的公共节点）。
/// 这个公共节点的作用是：当第 k 个祖先节点的位置超出了当前 List 时，能够跳转到其他链的 List 上继续查找。
/// 理想情况下，应该找到深度最大的叶子节点，进而先剖分出最长的主链。这样可以效率最高（因为这样尽可能地减少了链之间的跳转）。
/// 我这里实现方式是随意地从第一个(按照编号排序)叶子节点进行刨分，很有可能刨分不出长链，但性能也没有太差。
/// 
/// 所有的叶子节点可以通过对 parent 的预处理找出来：
/// 遍历 parent，将出现过的节点标记起来；完成后 [0, n-1] 号节点中没被标记过的就是所有的叶子节点。
/// 从叶子节点通过 parent 不断向上查找，就能到的根节点。
/// </summary>
public class TreeAncestor {

    private readonly struct PathPos(List<int> path, int pos)
    {
        internal readonly List<int> path = path;
        internal readonly int pos = pos;

        internal void Deconstruct(out List<int> first, out int second) {
            first = path;
            second = pos;
        }
    }
    

    // key: node, value: PathPos of node
    private readonly Dictionary<int, PathPos> leafPathPoses = [];

    public TreeAncestor(int n, int[] parent) {
        List<int> leaves = [];
        var childNums = new ushort[n];
        // Array.Fill(childNums, (ushort)0);
        foreach (var p in parent)
        {
            if (p != -1) childNums[p]++;
        }
        for (int i = 0; i < n; i++)
        {
            if (childNums[i] == 0)
            {
                leaves.Add(i);
            }
        }
        foreach (var leaf in leaves)
        {
            var k = 0;
            List<int> path = [];
            var node = leaf;
            while (node != -1)
            {
                path.Add(node);
                if (!leafPathPoses.ContainsKey(node))
                {
                    leafPathPoses[node] = new PathPos(path, k++);
                    node = parent[node];
                }
                else break;
            }
        }
        leafPathPoses[0].path.Add(-1);
    }

    public int GetKthAncestor(int node, int k) {
        while (k > 0 && node != -1)
        {
            var (path, pos) = leafPathPoses[node];
            if (k + pos < path.Count)
            {
                return path[k + pos];
            }
            else
            {
                k -= path.Count - 1 - pos;
                node = path.Last();
            }
        }
        return node;
    }
}


// /// <summary>
// /// 树上倍增：
// /// https://leetcode.cn/problems/kth-ancestor-of-a-tree-node/solutions/2305895/mo-ban-jiang-jie-shu-shang-bei-zeng-suan-v3rw/?envType=daily-question&envId=2024-04-06
// /// </summary>
// public class TreeAncestor {
//     private readonly int[,] pa;

//     public TreeAncestor(int n, int[] parent) {
//         var m = 32 - BitOperations.LeadingZeroCount((uint)n);  // 二进制有效位的长度
//         pa = new int[n, m];
//         for (int i = 0; i < n; i++)
//         {
//             pa[i,0] = parent[i];
//         }
//         for (int i = 0; i < m - 1; i++)
//         {
//             for (int x = 0; x < n; x++) {
//                 int p = pa[x,i];
//                 // if (p != -1) pa[x,i + 1] = pa[p,i]; else pa[x,i + 1] = -1;
//                 pa[x,i + 1] = p < 0 ? -1 : pa[p,i];
//             }
//         }
//     }

//     public int GetKthAncestor(int node, int k) {
//         for (; k > 0 && node != -1; k &= k - 1) // 关于 k &= k - 1 ： 去掉二进制最低位的 1 。（https://leetcode.cn/circle/discuss/CaOJ45/）
//         {
//             node = pa[node,BitOperations.TrailingZeroCount(k)];
//         }
//         return node;
//     }
// }

/********** TEST C# **************/
// if (needMemoryNodes.TryGetValue(node, out var t) && memory.TryGetValue(t, out var list) && list.Count >= k) return list[k-1];