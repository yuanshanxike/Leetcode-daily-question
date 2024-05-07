namespace L1463;

public class Solution {
    /// <summary>
    /// 和 cherry-pickup 类似，可以同时对两个机器人进行移动，主要的区别是:上一步可能的位置是受限的，且没有路障。
    /// 设在同一时间，第一个和第二个机器人的横坐标分别是 i 和 j，
    /// 移动步数都是 k。则这一时刻，他们的纵坐标都为 k。
    /// 那么，可以用 dp[k][i][j] 来表示: 两个机器人分别都走了 k 步，第一个机器人坐标为 (k, i)，且第二个机器人坐标为 (k, j)时，所能采摘的最大樱桃数量。
    /// (rows, cols) 表示矩阵的 (行数, 列数)
    /// 
    /// 要求出状态转移方程的话还需要知道两个机器人上一步的位置，根据题目描述可以知道：
    /// 第一个机器人上一步可能的位置有：(k, i - 1), (k, i), (k, i + 1)
    /// 这三个位置中，需要满足横坐标{i - 1, i, i + 1}: 0 <= x <= k - 1 的才是上一步可能的坐标；
    /// 第二个机器人上一步可能的位置有：(k, j - 1), (k, j), (k, j + 1)
    /// 这三个位置中，需要满足横坐标{j - 1, j. j + 1}: (cols - 1) - (k - 1) <= x <= cols - 1 的才是上一步可能的坐标。
    /// 
    /// 状态转移方程: dp[k][i][j] = max(dp[k - 1][i - 1][j - 1], dp[k - 1][i - 1][j], ..., dp[k - 1][i + 1][j], dp[k - 1][i + 1][j + 1]) + val （最多会对应着9种 dp 状态）
    /// 其中 val = if (i == j) grid[k][i] else grid[k][i] + grid[k][j]
    /// 
    /// dp 边界（起始位置）：dp[0][0][cols - 1] = grid[0][0] + grid[0][cols - 1]
    /// 
    /// k 的取值范围: 0 <= k < rows
    /// 
    /// 答案是求 max(dp[rows - 1][·][·])
    /// </summary>
    /// <param name="grid"></param>
    /// <returns></returns>
    public int CherryPickup(int[][] grid) {
        var (m, n) = (grid.Length, grid[0].Length);
        var dp = new int[m][][];
        for (int i = 0; i < m; i++) {
            dp[i] = new int[n][];
            for (int j = 0; j < n; j++) {
                dp[i][j] = new int[n];
                Array.Fill(dp[i][j], 0);
            }
        }
        dp[0][0][n - 1] = grid[0][0] + grid[0][n - 1];
        for (int k = 1; k < m; k++) {
            for (int i = 0; i <= Math.Min(k, n - 1); i++) { // 枚举第一个机器人可移动的横坐标范围
                for (int j = n - 1; j >= Math.Max(n - 1 - k, 0); j--) { // 枚举第二个机器人可移动的横坐标范围
                    int max = 0;
                    for (int i0 = i - 1; i0 <= i + 1; i0++) {
                        if (i0 < 0 || i0 > Math.Min(k - 1, n - 1)) continue; // 枚举的上一个位置不在合理范围内
                        for (int j0 = j - 1; j0 <= j + 1; j0++) {
                            if (j0 < Math.Max(n - 1 - (k - 1), 0) || j0 > n - 1) continue; // 枚举的上一个位置不在合理范围内
                            max = Math.Max(max, dp[k - 1][i0][j0]);
                        }
                    }
                    dp[k][i][j] = max + grid[k][i] + (i == j ? 0 : grid[k][j]);
                }
            }
        }
        // caculate ans
        var ans = 0;
        foreach (var arr in dp[m - 1])
        {
            foreach (var val in arr)
            {
                ans = Math.Max(ans, val);
            }
        }
        return ans;
    }
}