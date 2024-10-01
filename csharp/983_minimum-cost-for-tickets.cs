namespace L983;

public class Solution {
    /// <summary>
    /// 记忆化递归：
    /// 定义 dfs(i) 表示第 days[i] 天及之后旅行日子乘车的最少花费。
    /// 递归函数：dfs(i) = min(costs[0] + dfs(i + 1), costs[1] + dfs(findNext(days[i] + 6)), costs[2] + dfs(findNext(days[i] + 29))), 其中 findNext(x) 表示在 days 中找到第 x 天的下一天。
    /// 递归出口：当 i >= n 时返回 0.
    /// </summary>
    /// <param name="days"></param>
    /// <param name="costs"></param>
    /// <returns></returns>
    public int MincostTickets(int[] days, int[] costs) {
        int n = days.Length;
        int findNext(int i, int x) {
            int idx = Array.BinarySearch(days, i + 1, n - 1 - i, x);
            return idx < 0 ? ~idx : idx + 1;
        }

        Dictionary<int, int> memory = [];
        int dfs(int i) {
            if (i >= n) {
                return 0;
            } else {
                if (memory.TryGetValue(i, out int value)) return value;
                int min = Math.Min(costs[0] + dfs(i + 1), costs[1] + dfs(findNext(i, days[i] + 6)));
                min = Math.Min(min, costs[2] + dfs(findNext(i, days[i] + 29)));
                memory[i] = min;
                return min;
            }
        }
        return dfs(0);
    }
}