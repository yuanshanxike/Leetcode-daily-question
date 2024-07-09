namespace L3102;

public class Solution {
    /// <summary>
    /// 将 曼哈顿距离 转换为计算 切比雪夫距离：
    /// 用 有序集合 动态维护移除每个坐标时的剩余坐标中最长切比雪夫距离（曼哈顿距离）
    /// 时间复杂度：O(nlogn)
    /// * 在 leetcode 上通过 C# 执行此算法会超时，优化为 O(n) 的实现见 TS 版本
    /// </summary>
    /// <param name="points"></param>
    /// <returns></returns>
    public int MinimumDistance(int[][] points) {
        var xs = new SortedDictionary<int, int>();
        var ys = new SortedDictionary<int, int>();

        foreach (var point in points) {
            int x = point[0], y = point[1];
            if (xs.TryGetValue(x + y, out int val)) {
                xs[x + y] = val + 1;
            } else xs[x + y] = 1;
            if (ys.TryGetValue(x - y, out val)) {
                ys[x - y] = val + 1;
            } else ys[x - y] = 1;
        }

        int ans = (int)2e8 + 1;
        foreach (var point in points) {
            int x = point[0], y = point[1];
            int x1 = x + y, y1 = x - y;
            if (xs.TryGetValue(x1, out int val)) {
                if (val == 1) xs.Remove(x1);
                else xs[x1] = val - 1;
            }
            if (ys.TryGetValue(y1, out val)) {
                if (val == 1) ys.Remove(y1);
                else ys[y1] = val - 1;
            }
            ans = Math.Min(ans, Math.Max(xs.Last().Key - xs.First().Key, ys.Last().Key - ys.First().Key));
            if (xs.TryGetValue(x1, out val)) {
                xs[x1] = val + 1;
            } else xs[x1] = 1;
            if (ys.TryGetValue(y1, out val)) {
                ys[y1] = val + 1;
            } else ys[y1] = 1;
        }
        return ans;
    }
}