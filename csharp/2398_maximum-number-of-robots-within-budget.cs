namespace L2398 {
    public class Solution {
        /// <summary>
        /// 需要计算的总开销为 max(chargeTimes) + k * sum(runningCosts)。
        /// 因为只能选择连续的机器人运行，
        /// sum(runningCosts) 可以通过(预处理过的)前缀和快速求解，而 max(chargeTimes) 可以使用 滑动窗口 + 单调队列 来进行维护。
        /// 对于给定的 k，可以通过滑动窗口来求解 min(max(chargeTimes) + k * sum(runningCosts))。
        /// 
        /// 也可以预见，k 越小能找到更小的总开销值。
        /// 证明：假设 k = k1（k1 > 1）时，通过滑动窗口求解得到的 min(max(chargeTimes) + k * sum(runningCosts)) 对应着 max(chargeTimes) == a, sum(runningCosts) == b，选择的连续数组为 [i, i + k1 - 1].
        /// 此时，让 k - 1 得到 k1-1 个连续的机器人，我们一定可以从之前的 [i, i + k1 - 1] 连续数组中，删除“头”或“尾”, 此时 a 不一定会减小，但是 b 一定会减小（题目给定的两个数组都是正数），再加上 b 的倍数 k 也减小。
        /// 所以能找到的最小总开销值是一定会减小的。
        /// 所以总开销值与 k 相关，有单调性，可以通过二分查找求解找到 k。
        /// </summary>
        /// <param name="chargeTimes"></param>
        /// <param name="runningCosts"></param>
        /// <param name="budget"></param>
        /// <returns></returns>
        // public int MaximumRobots(int[] chargeTimes, int[] runningCosts, long budget) {
        //     int n = chargeTimes.Length;
        //     var preSumRC = new long[n + 1];  // 前缀和数组
        //     preSumRC[0] = 0;
        //     for (int i = 0; i < n; i++) {
        //         preSumRC[i + 1] = preSumRC[i] + runningCosts[i];
        //     }
        // }
    }
}