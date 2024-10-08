namespace L871;

public class Solution {
    /// <summary>
    /// 令 dp[i] 表示一共加油 i 次能行驶到的最远距离。
    /// 每次用小于等于 i 的 position 的加油站的最大油量与 dp[i] 的和去更新 dp[i + 1] 的值。
    /// 当出现 dp[i] 的值大于 target 时，返回 i 即为答案。
    /// stations 中的 fuel 可以用优先队列（大根堆）来维护。每次有新的加油站被覆盖到时，对应的 fuel 入队。被加油后出队。
    /// </summary>
    /// <param name="target"></param>
    /// <param name="startFuel"></param>
    /// <param name="stations"></param>
    /// <returns></returns>
    public int MinRefuelStops(int target, int startFuel, int[][] stations) {
        int n = stations.Length;
        var dp = new int[n + 1];
        int times = 0;
        dp[times] = startFuel;
        int pos = 0; // 当前能行驶的最远距离所能覆盖的加油站数量下标 (pos 左边的加油站都能被覆盖)
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((int a, int b) => b.CompareTo(a)));

        if (dp[times] >= target) return times;

        while (dp[times] < target) {
            for (; pos < n && stations[pos][0] <= dp[times]; pos++) {
                int fuel = stations[pos][1];
                maxHeap.Enqueue(fuel, fuel);
            }

            if (maxHeap.Count == 0) return -1;  // 不能到达目的地，且无油可加

            dp[times + 1] = dp[times] + maxHeap.Dequeue();
            times++;
        }

        return times;
    }
}