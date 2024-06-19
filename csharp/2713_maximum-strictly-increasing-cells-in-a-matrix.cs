namespace L2713;

public class Solution {
    /// <summary>
    /// 可以考虑从矩阵中最小的元素开始，计算并储存到达每个位置的最大路径。
    /// 因为是按照格子的 value 自小到大进行计算的，所以在每次计算时，可以保证：
    /// 每一行(列)中有路径数值的格子(已经被计算过路径数的格子)，其值 mat[i0][j0] 一定时比 当前格子的值 mat[i][j] 小的。
    /// 所以我们不必关心每个格子具体的最大路径数，而只需要维护当前每行(列)的最大路径数。
    /// 在 mat 对应值变大的时候再对 维护的每行(列)的最大路径数 进行更新。
    ///
    /// 需要使得数据按照 mat[i][j] 值从小到大的顺序排列，整个集合是严格有序的，
    /// 可以使用 TreeMap / SortedDictionary （底层是红黑树）这样的有序集合，结合使用一个 List 来把 mat[i][j] 相同的坐标保存到同一个节点来实现。
    /// <\summary>
    public int MaxIncreasingCells(int[][] mat) {
        int m = mat.Length;
        int n = mat[0].Length;
        var sd = new SortedDictionary<int, List<(int x, int y)>>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                var val = mat[i][j];
                sd.TryGetValue(val, out var arr);
                if (arr != null) {
                    arr.Add((i, j));
                } else {
                    sd.Add(val, [(i, j)]);
                }
            }
        }
        var ans = 0;
        var maxRow = new int[m];
        var maxCol = new int[n];
        foreach (var coords in sd.Values) {
            var mx = new int[coords.Count];
            // 先统计当前 val 下，对应的每格路径数的最大值
            int k = 0;
            foreach ((int i, int j) in coords) {
                int maxPath = Math.Max(maxRow[i], maxCol[j]) + 1;
                mx[k] = maxPath;
                ans = Math.Max(ans, maxPath);
                k++;
            }
            // 再更新每行(列)的最大路径数
            k = 0;
            foreach ((int i, int j) in coords) {
                maxRow[i] = Math.Max(maxRow[i], mx[k]);
                maxCol[j] = Math.Max(maxCol[j], mx[k]);
                k++;
            }
        }
        return ans;
    }
}