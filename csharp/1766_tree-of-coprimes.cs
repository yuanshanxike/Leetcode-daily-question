using Extension;

namespace L1766;

#region csharp 给的栈空间太小了，很容易就 stack overflow
public class Solution0
{

    private const int MAX_VALUE = 50;
    public int[] GetCoprimes(int[] nums, int[][] edges)
    {
        // preprocess
        int[][] coprimes = new int[MAX_VALUE + 1][];
        var range = Enumerable.Range(1, MAX_VALUE);
        foreach (var i in range)
        {
            List<int> list = [];
            foreach (var j in range)
            {
                if (GCD(i, j) == 1) list.Add(j);
            }
            coprimes[i] = [.. list];
        }

        // init adjacency list
        var g = new List<int>[nums.Length];
        // Array.ForEach(g, (item) => { item = []; });  // 这样无效，或许 ForEach 的 item 是只读的
        g = g.Select(_ => new List<int>()).ToArray();
        foreach (var (from, to) in edges)
        {
            g[from].Add(to);
            g[to].Add(from);
        }

        // dfs (find currently deepest coprime in current coprimes)
        var depth_id_arr = new Tuple<int, int>[MAX_VALUE + 1]; // index: value, Tuple<depth, id>
        // Tuple<int, int>[] depth_id_arr = []; // error: length == 0
        var ans = new int[nums.Length];
        Array.Fill(ans, -1);
        // Action<int, int, int> dfs = (_, _, _) => { };
        void dfs(int x, int fa, int depth)
        {
            var val = nums[x];
            var maxDepth = 0;
            foreach (var c in coprimes[val])   // find currently deepest coprime in current coprimes
            {
                if (depth_id_arr[c] != null)
                {
                    var (dep, id) = depth_id_arr[c];
                    if (dep > maxDepth)
                    {
                        maxDepth = dep;
                        ans[x] = id; // maybe found
                    }
                }
            }  // found

            var keeping = depth_id_arr[val];  // keep the current depth and id info of the value
            depth_id_arr[val] = Tuple.Create(depth, x); // write current node info to map with key(val)

            foreach (var to in g[x])
            {
                if (to != fa) dfs(to, x, depth + 1); // continus to enter the child
            }

            depth_id_arr[val] = keeping;  // reverse node info, when exit this node
        }
        dfs(0, -1, 1);  // from root start dfs
        return ans;
    }

    private static int GCD(int a, int b)
    {
        return b == 0 ? a : GCD(b, a % b);
    }

    // private static int IndexMaxOf<T>(T[] array, Func<T, IComparable> transform)
    // {
    //     IComparable maxVal = new MinVal();
    //     int idx = 0;
    //     for (int i = 0; i < array.Length ; i++)
    //     {
    //         var val = transform(array[i]);
    //         var result = val.CompareTo(maxVal);
    //         if (result > 0)
    //         {
    //             idx = i;
    //             maxVal = val;
    //         }
    //     }
    //     return idx;
    // }

    // private sealed class MinVal : IComparable
    // {
    //     public int CompareTo(object? obj) => -1;
    // }

}
#endregion

/// <summary>
/// 不构建邻接表的做法
/// （这份代码可优化的部分：预处理好 [1, 50] 的互质数对）
/// </summary>
public class Solution {
    private const int MAX_NODES = 51, MAX_EDGES = (int)1e5 + 1;
    private readonly int[] head = new int[MAX_EDGES], previous = new int[MAX_EDGES], endpoint = new int[MAX_EDGES];
    private int index = 0;
    
    public int[] GetCoprimes(int[] nums, int[][] edges) {
        int[] result = new int[nums.Length], depths = new int[nums.Length];
        Array.Fill(head, -1);
        bool hasZeroRoot = false;
        foreach(var edge in edges)
            hasZeroRoot = edge[1] == 0 ? true : hasZeroRoot;
        
        foreach(var edge in edges){
            int from = edge[0], to = edge[1];
            if(hasZeroRoot){
                (from, to) = (to, from);
            }
            // 这里的 index 只是起连接 head 和 endpoint，进而把 from 和 to 关联起来的作用。index 不断累加，可以建立起一个 from 到 多个 to 的唯一映射。previous[index] 储存着当前节点的父节点到上一个兄弟节点的映射关系。
            endpoint[index] = to; previous[index] = head[from]; head[from] = index++;  // head[*from*] = index -> endpoint[index] = *to*  =>  endpoint[head[from]] = to (其中，previous[index] save the last head[from])
            /*
            from -> to
                |_> to
                ...
            */
        }

        void Dfs(int node, Dictionary<int, int> mapping, int depth){
            Dictionary<int, int> copiedMapping = new(mapping);
            int num = nums[node], maxDepth = -1, ancestor = -1;
            depths[node] = depth;

            for(int p = 1; p <= 50; p++){
                if(copiedMapping.ContainsKey(p) && GreatestCommonDivisor(p, num) == 1){ // 当前访问过的互质祖先节点中找深度最大的
                    if(maxDepth < depths[mapping[p]]){
                        maxDepth = depths[mapping[p]];
                        ancestor = mapping[p];
                    }
                }
            }
            result[node] = ancestor; // 找到
            // 把当前节点加入到复制的 map 中，给访问其子节点时使用
            if(!mapping.ContainsKey(num)) copiedMapping.Add(num, node);
            else copiedMapping[num] = node;

            for(int i = head[node]; i != -1; i = previous[i]){ // 从当前节点（父节点）的最后一个孩子节点向第一个孩子节点(从右向左)循环迭代，-1 是循环出口，它在第一个孩子之前被记录。
                int j = endpoint[i];  // endpoint[head[from]] = to，访问的是子节点
                Dfs(j, copiedMapping, depth + 1);  // 每次向最右边没访问过的孩子 DFS
            }
        }

        Dfs(0, [], 0); // start: from 0, depth == 0
        return result;
    }

    private int GreatestCommonDivisor(int x, int y){
        return x == 0 ? y : GreatestCommonDivisor(y % x, x);
    }
}