namespace L1883;

public class Solution {
    /// <summary>
    /// 设：dp[i][j][t] 表示在第 i 到 j 段中（不包括第 j 段的休息时间）只休息 t 次所节约的最大时长。
    /// 需要求的是满足 dp[0][n-1][t] >= 所有路段结束都休息的时长(上界) - hoursBefore 的最小 t。
    /// 
    /// 边界条件：dp[i][j][0] = 0 （0 <= i <= j < n）；
    /// 当 t > j - i 时，dp[i][j][t] 无定义，不需要计算；
    /// 几个 t == j - i 的情况:
    /// dp[i][i+1][1] = if (dist[i] % speed + dist[i+1] % speed <= speed) speed else 0
    /// * Sn 为 dist 的前 N 项和。 dist[i] == Si+1 - Si
    /// dp[i][i+2][2] = (if ((Si+2 - Si) % speed + dist[i+2] % speed <= speed) speed else 0) + dp[i][i+1][1]
    /// dp[i][i+3][3] = (if ((Si+3 -Si) % speed + dist[i+3] % speed <= speed) speed else 0) + dp[i][i+2][2]
    /// ....
    /// 
    /// 状态转移方程(t < j - i)：
    /// dp[i][i+2][1] = max(dp[i][i+1][1], dp[i+1][i+2][1])
    /// * 接着求 dp[i+1][i+3][1]，一直求到 dp[n-3][n-1][1] 后，再求
    /// dp[i][i+3][1] = max(dp[i][i+2][1], dp[i+2][i+3][1])
    /// ...
    /// 
    /// dp[i][i+3][2] = max(dp[i][i+2][2], dp[i+1][i+3][2], dp[i][i+1][1] + dp[i+2][i+3][1])
    /// * 接着求 dp[i+1][i+4][2]，一直求到 dp[n-4][n-1][2] 后，再求
    /// dp[i][i+4][2] = max(dp[i][i+3][2], dp[i+1][i+4][2], dp[i][i+1][1] + dp[i+2][i+4][1], dp[i][i+2][1] + dp[i+3][i+4][1])
    /// ...
    /// 
    /// dp[i][i+4][3] = max(dp[i][i+3][3], dp[i+1][i+4][3], dp[i][i+1][1] + dp[i+2][i+4][3-1], dp[i][i+2][3-1] + dp[i+3][i+4][1])
    ///  * 接着求 dp[i+1][i+5][3]，一直求到 dp[n-5][n-1][3] 后，再求
    /// dp[i][i+5][3] = max(dp[i][i+3][3], dp[i+1][i+4][3], dp[i][i+1][1] + dp[i+2][i+4][3-1], dp[i][i+2][3-1] + dp[i+3][i+4][1])
    /// 
    /// 时间复杂度：O(n^3)，空间复杂度：O(n^3)
    /// ...
    /// </summary>
    /// <param name="dist"></param>
    /// <param name="speed"></param>
    /// <param name="hoursBefore"></param>
    /// <returns></returns>
    // public int MinSkips1(int[] dist, int speed, int hoursBefore) {
        
    // }

    /// <summary>
    /// https://leetcode.cn/problems/minimum-skips-to-arrive-at-meeting-on-time/solutions/2746611/jiao-ni-yi-bu-bu-si-kao-dong-tai-gui-hua-gxd2/
    /// dp[t][i]：在最多跳过 t 次的情况下，从 dist[0] 到 dist[i] 所需的最短时间 * speed。
    /// 在二维数组 dp 的左侧插入一列状态，那么其余状态全部向右移动一位。
    /// 把时间通过与速度相乘得到的距离与道路的总长度进行对比可以避免浮点运算
    /// </summary>
    /// <param name="dist"></param>
    /// <param name="speed"></param>
    /// <param name="hoursBefore"></param>
    /// <returns></returns>
    public int MinSkips(int[] dist, int speed, int hoursBefore) {
        var sumDist = 0;
        foreach (var d in dist)
        {
            sumDist += d;
        }
        if (sumDist > (long)speed * hoursBefore) return -1; // 限定时间内不能走完所有道路的长度
        var n = dist.Length;
        var dp = new int[n][];
        for (var i = 0; i < n; i++) dp[i] = new int[n];
        for (int t = 0; /*t < n*/; t++)  // t 为最多跳过的次数限制，从小到大枚举
        {
            for (int i = 0; i < n - 1; i++) // i < n - 1 ： 最后一段路没有休息时间，需要单独处理
            {
                dp[t][i + 1] = DivisionUpper(dp[t][i] + dist[i], speed) * speed;  // 不跳过第 i+1 段的休息时间
                if (t > 0) {  // 完全不跳过时不会去考虑跳过的case
                    dp[t][i + 1] = Math.Min(dp[t][i + 1], dp[t - 1][i] + dist[i]); // 与“跳过第 i 段的休息时间"的 case 对比取最小值
                }
            }
            if (dp[t][n - 1] + dist[n - 1] <= (long)speed * hoursBefore) {
                return t;
            }
        }
        // return -1;
    }

    // for a / b
    private int DivisionUpper(int a, int b) => (a + b - 1) / b;
}