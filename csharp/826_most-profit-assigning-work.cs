namespace L826;

public class Solution {
    /// <summary>
    /// 找到每个难度(difficulty)下对应的最大利润，同时将相同难度合并，保留当前难度下的最大利润。
    /// 枚举每个工人的能力值，在难度值对应的最大利润中二分查找当前工人所能得到的最大利润。
    /// 迭代的结果累加即是答案。
    /// 
    /// 注：“找到每个难度下的最大利润” 可以先对 难度数组 和 利润数组 按照 难度值 进行升序排序。
    /// 去重和排序都可以通过 Linq 简单实现。
    /// 排序完成后，从左往右遍历数组，记录每种难度对应的当前利润最大值。
    /// </summary>
    /// <param name="difficulty"></param>
    /// <param name="profit"></param>
    /// <param name="worker"></param>
    /// <returns></returns>
    public int MaxProfitAssignment(int[] difficulty, int[] profit, int[] worker) {
        var sorted = difficulty.Select((diff, idx) => (diff, prof: profit[idx]))
            .OrderBy(tuple => tuple.diff)
            .GroupBy(tuple => tuple.diff)  // 合并相同难度值到同一个分组
            .Select(g => g.OrderByDescending(tuple => tuple.prof).First())  // 筛选出同一难度分组中收益最大值的元素来代表这一分组
            .ToArray();
        var curMaxProf = 0;
        for (int i = 0; i < sorted.Length; i++) {
            var (diff, prof) = sorted[i];
            curMaxProf = curMaxProf < prof ? prof : curMaxProf;
            sorted[i] = (diff, curMaxProf);
        }
        var ans = 0;
        var finalDiffArr = sorted.Select(tuple => tuple.diff).ToArray();
        foreach (int capacity in worker) {
            var idx = Array.BinarySearch(finalDiffArr, capacity);
            idx = idx < 0 ? ~idx - 1 : idx;
            ans += idx < 0 ? 0 : sorted[idx].prof;
        }
        return ans;
    }
}