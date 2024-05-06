namespace L741;

public class Solution {
    // public int CherryPickup(int[][] grid) {
    //     arrivedButtomEnd = false;
    //     return dfs(grid, 0, 0);
    // }

    // private bool arrivedButtomEnd = false;

    // /// <summary>
    // /// 记忆化递归
    // /// </summary>
    // /// <param name="grid"></param>
    // /// <param name="i">行</param>
    // /// <param name="j">列</param>
    // /// <param name="downRight">是否是向右下前进? true 为向右下，false 为向左上</param>
    // /// <param name="path">走过的格子所构成路径的坐标列表</param>
    // /// <returns>捡到的樱桃数</returns>
    // private int dfs(int[][] grid, int i, int j, bool downRight = true/*, List<(int, int)> path*/) {
    //     if (!downRight && i == 0 && j == 0) return 0; // 返回到原点
    //     var n = grid.Length;
    //     if (i == n - 1 && j == n - 1) {
    //         arrivedButtomEnd = true;
    //         downRight = false;
    //     }
    //     var pick = 0;
    //     var needResume = false;
    //     switch (grid[i][j])
    //     {
    //         case 1: 
    //           pick = 1;
    //           grid[i][j] = 0;
    //           needResume = true;
    //           break;
    //         case 0: break;
    //         case -1: return 0;  // 撞上 blocker
    //     }

    //     var downPick = 0;
    //     if (downRight && i < n - 1) {
    //         downPick = dfs(grid, i + 1, j, downRight); // 向下
    //     }

    //     var rightPick = 0;
    //     if (downRight && j < n - 1) {
    //         rightPick = dfs(grid, i, j + 1, downRight); // 向右
    //     }
    //     pick += Math.Max(rightPick, downPick);

    //     var upPick = 0;
    //     if (!downRight && i > 0) {
    //         upPick = dfs(grid, i - 1, j, downRight); // 向上
    //     }

    //     var leftPick = 0;
    //     if (!downRight && j > 0) {
    //         leftPick = dfs(grid, i, j - 1, downRight); // 向左
    //     }
    //     pick += Math.Max(upPick, leftPick);

    //     if (needResume) grid[i][j] = 1;  // 恢复现场
    //     return arrivedButtomEnd ? pick : 0;
    // }

    public int CherryPickup(int[][] grid) => dp(grid);

    // 因为拆分成两次 dp，可能会算不出全局最优。如：[[1,1,1,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,1],[1,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,1,1,1]]
    // private int dp(int[][] grid) {
    //     var n = grid.Length;
    //     var dp = new (int pick, bool? direc)[n][]; // first: max pick num; second: left-true, up-false
    //     // 从左上到右下
    //     for (int i = 0; i < n; i++) {
    //         dp[i] = new (int, bool?)[n];
    //         for (int j = 0; j < n; j++) {
    //             if (i == 0 && j == 0) { // 起点（边界条件）
    //                 dp[i][j] = (grid[i][j], null);
    //                 continue;
    //             }

    //             if (grid[i][j] == -1) { // blocker
    //                 dp[i][j] = (-1, null);
    //                 continue;
    //             }
    //             var topPick = -1;
    //             if (i > 0) topPick = dp[i - 1][j].pick;
    //             var leftPick = -1;
    //             if (j > 0) leftPick = dp[i][j - 1].pick;

    //             if (topPick == -1 && leftPick == -1) dp[i][j] = (-1, null); // 不可达
    //             else if (topPick == -1) dp[i][j] = (leftPick + grid[i][j], true);
    //             else if (leftPick == -1) dp[i][j] = (topPick + grid[i][j], false);
    //             else {
    //                 var direc = leftPick >= topPick;
    //                 dp[i][j] = ((direc ? leftPick : topPick) + grid[i][j], direc);
    //             }
    //         }
    //     }
    //     if (n > 1 && dp[n - 1][n - 1].direc == null) return 0; 
    //     // 回溯得到其中一条最佳路径(把上面的值都设为 0，表示所有樱桃已被摘取)
    //     int x = n - 1, y = n - 1;
    //     grid[x][y] = dp[x][y].pick;
    //     while (x != 0 || y != 0) {
    //         var direc = dp[x][y].direc;
    //         if (direc == true) y--; else x--;
    //         grid[x][y] = 0;
    //     }
    //     // 从右下回到左上 (可以直接使用 grid)
    //     for (int i = n - 1; i >= 0; i--) {
    //         for (int j = n - 1; j >= 0; j--) {
    //             if (i == n - 1 && j == n - 1) continue; // 起点
    //             if (grid[i][j] == -1) continue; // blocker

    //             var bottomPick = -1;
    //             if (i < n - 1) bottomPick = grid[i + 1][j];
    //             var rightPick = -1;
    //             if (j < n - 1) rightPick = grid[i][j + 1];

    //             if (bottomPick == -1 && rightPick == -1) grid[i][j] = -1; // 不可达
    //             else if (bottomPick == - 1) grid[i][j] += rightPick;
    //             else if (rightPick == -1) grid[i][j] += bottomPick;
    //             else {
    //                 var direc = rightPick >= bottomPick;
    //                 grid[i][j] += direc ? rightPick : bottomPick;
    //             }
    //         }
    //     }
    //     return grid[0][0];
    // }

    /// <summary>
    /// 将“去了又回来”转化为两个人同时从左上出发，到达右下时所能摘到樱桃的并集（路径中重复的格子的樱桃只能采摘一次）。
    /// 需要保证每次移动时两个人的步数一致（对于到达同一格子的不同方案的移动步数一定时相同的）设为 k。
    /// 两个人同一时间所在的横坐标分别设为: i, j。
    /// 那么对于到达当前格子(i, j)的上一步（走了 k-1 步）, 两个人可能的位置有种情况：
    /// ① (k - 1 - i, i), (k - 1 - j, j) => dfs(k - 1, i, j)
    /// ② (k - 1 - i, i), (k - j, j - 1) => dfs(k - 1, i, j - 1)
    /// ③ (k - i, i - 1), (k - 1 - j, j) => dfs(k - 1, i - 1, j)
    /// ④ (k - i, i - 1), (k - j, j - 1) => dfs(k - 1, i - 1, j - 1)
    /// </summary>
    /// <returns></returns>
    private int dp(int[][] grid) {
        var n = grid.Length;
        var pathLength = n + n - 1;
        var dp = new int[pathLength][][];
        for (int i = 0; i < pathLength; i++) {
            dp[i] = new int[n + 1][]; // 在最上边加一行，方便计算
            for (int j = 0; j < n + 1; j++) {
                dp[i][j] = new int[n + 1]; // 在最左边加一列，方便计算
                Array.Fill(dp[i][j], int.MinValue);
            }
        }
        dp[0][1][1] = grid[0][0];
        for (int k = 1; k < pathLength; k++) {
            for (int i = Math.Max(k - (n - 1), 0); i <= Math.Min(k, n - 1); i++) { // 枚举第一个人的横坐标
                if (grid[k - i][i] < 0) continue;  // blocker or edge
                for (int j = i; j <= Math.Min(k, n - 1); j++) {  // 枚举第二个人的横坐标
                    if (grid[k - j][j] < 0) continue;   // blocker or edge
                    dp[k][i + 1][j + 1] = Math.Max(Math.Max(dp[k - 1][i + 1][j + 1], dp[k - 1][i + 1][j]), Math.Max(dp[k - 1][i][j + 1], dp[k - 1][i][j])) 
                        + grid[k - i][i] + (i == j ? 0 : grid[k - j][j]);
                }
            }
        }
        return Math.Max(dp[pathLength - 1][n][n], 0);
    }
}