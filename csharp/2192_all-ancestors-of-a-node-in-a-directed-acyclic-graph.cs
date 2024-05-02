using System.Security.Cryptography;
using Extension;

namespace L2192;

public class Solution
{
    /// <summary>
    /// 拓扑排序：
    /// 
    /// 找到图中，入度为 0 的所有节点，将它们删除。它们出度所指向的节点的入度都需要减去 1。
    /// 
    /// 具体做法可以是:
    /// 维护一个 hashset，里面存放当前 in-degree == 0 的所有节点。
    /// 一开始所有节点都在这个 set 中，遍历 edges 数组时，对存在父节点的节点进行剔除；
    /// 同时需要一个数组，用来记录各个节点当前的入度数，当变为 0 时，需要加入到 hashset，表示需要进行拓扑排序的点。
    /// 在其所有出度节点（子节点）中的祖先节点列表中加入被剔除的父节点及父节点的祖先节点列表。
    /// 重复上述操作 n 次，便对所有节点完成拓扑排序。
    /// 最后对结果列表中的每个节点的父节点编号升序排序。
    /// </summary>
    /// <param name="n"></param>
    /// <param name="edges"></param>
    /// <returns></returns>
    /// 
    public IList<IList<int>> GetAncestors(int n, int[][] edges)
    {
        Span<HashSet<int>> ans = new HashSet<int>[n];
        var inDegrees = new int[n]; // current in-degree of each node
        var startNodes = new HashSet<int>(Enumerable.Range(0, n)); // all start nodes which current in-degree == 0
        Span<List<int>> adjList = new List<int>[n];
        foreach (var edge in edges)
        {
            var (root, child) = edge;
            adjList[root] ??= [];
            adjList[root].Add(child);
            inDegrees[child]++;
            startNodes.Remove(child); // cull nodes which in-degree != 0
        }
        for (int i = 0; i < n; i++)
        {
            var start = startNodes.Last();
            startNodes.Remove(start);
            ans[start] ??= [];
            if (adjList[start] is List<int> nexts)  // if is not null
            {
                foreach (var child in nexts)
                {
                    if (--inDegrees[child] == 0) startNodes.Add(child);

                    // ans[child] ??= new HashSet<int>();
                    ans[child] ??= [];
                    ans[child].Add(start);
                    ans[child].UnionWith(ans[start]);
                    // ans[child] = [.. ans[child], start , .. ans[start]];  // *非常耗时，创建了对象
                }
            }
        }
        // var ans1 = new List<List<int>>();
        // foreach (var a in ans)
        // {
        //     List<int> ancestors = [.. a];
        //     ancestors.Sort();
        //     ans1.Add(ancestors);
        // }
        // // List<int> b = [.. ans[1]];
        // return ans1.Cast<IList<int>>().ToList();
        return ans.ToArray().Select( s => {
            var subList = s.ToList();
            subList.Sort();
            return (IList<int>)subList;
        } ).ToList();
    }


    /// <summary>
    /// DFS:
    /// https://leetcode.cn/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/solutions/2723203/liang-chong-fang-fa-ni-xiang-zheng-xiang-rwjs/
    /// 
    /// 从编号较小的节点开始自上而下 dfs。每次访问，只需要在访问到的每个节点的祖先列表中 加入递归起点的节点。
    /// 因为选择编号的顺序是逐渐递增的，得到的结果也会是有序的。
    /// 
    /// 注意：在 递归 或者 循环 中使用 集合表达式（实际创建了对象） 会非常耗时
    /// 
    /// </summary>
    /// <param name="n"></param>
    /// <param name="edges"></param>
    /// <returns></returns>
    public IList<IList<int>> GetAncestorsDfs(int n, int[][] edges) {
        var adjList = new List<int>[n];
        var ans = new List<int>[n];
        adjList = adjList.Select((_) => new List<int>()).ToArray();
        ans = ans.Select((_) => new List<int>()).ToArray();
        // List<int> nonNullList(out List<int> list) => list = [];
        foreach (var edge in edges)
        {
            var (from, to) = edge;
            // // adjList[from] ??= [];
            // _ = adjList[from] ?? nonNullList(out adjList[from]);
            adjList[from].Add(to);
        }
        var vis = Enumerable.Repeat(element: -1, count: n).ToArray();  // 记录已经被访问到的节点，之后不再访问（相当于一种记忆化）
        Action<int, int> dfs = (_, _) => {};  // 要先定义 lambda 表达式才可以在赋值的时候进行递归调用
        dfs = (node, commAncestor) => {
            // ans[node] ??= [];
            // if (node != commAncestor) ans[node] = [.. ans[node], commAncestor]; // *最耗时的操作
            vis[node] = commAncestor;  // 标记节点为已访问（因为每次都是以 dfs 的起始节点编号作为已访问标记，不会影响到下次的 dfs）
            if (adjList[node] == null) return;  // 无环有向图肯定有出度为 0 的节点
            foreach (var next in adjList[node]) {
                if (vis[next] != commAncestor) { // 避免重复访问同一个节点
                    ans[next].Add(commAncestor);
                    dfs(next, commAncestor);
                }
            }
        };
        for (int i = 0; i < n; i++)
        {
            dfs(i, i);
        }
        return ans.Cast<IList<int>>().ToList();
    }
}


/********** TEST C# **************/
// var name = new Name(first: "LI", last: "jie");
// var (first, last) = name;

// internal class Name(string first, string middle = "", string last)
// {
//     public string FirstName { get => first; set => value = first }
//     public string MiddleName { get => middle; set => value = middle; }
//     public string LastName { get => last; set => value = last; }

//     public void Deconstruct(out string fname, out string lname)
//     {
//         fname = FirstName;
//         lname = LastName;
//     }
// }