namespace L1235;

public class Solution {
    /// <summary>
    /// dp
    /// + 二分查找（在 endTimes 对应的 preProfitSums 中 查找 startTime 的位置）
    /// + (用 hash 表)空间优化（不能把所有时间都存下来，既会 OOM，又会 TLE。因为：1 <= startTime[i] < endTime[i] <= 10^9）
    /// </summary>
    /// <param name="startTime"></param>
    /// <param name="endTime"></param>
    /// <param name="profit"></param>
    /// <returns></returns>
    public int JobScheduling(int[] startTime, int[] endTime, int[] profit) {
        // Array.Sort(endTime, startTime);  // 根据 endTime 来对 endTime 和 startTime 

        // 通过 Linq 合并三个数组, 进行排序后再拆分出来
        // var zip = endTime.Zip(startTime, (e, s) => (end: e, start: s)) // 合并放入到匿名类型中
        //                 .Zip(profit, (wrap, p) => (end: wrap.end, start: wrap.start, prof: p)) // 合并放入到匿名类型中
        //                 .OrderBy(x => x.end);
        // endTime = zip.Select(x => x.end).ToArray();
        // startTime = zip.Select(x => x.start).ToArray();
        // profit = zip.Select(x => x.prof).ToArray();
        
        var zip = endTime.Zip(startTime, profit).OrderBy(x => x.First);
        endTime = zip.Select(x => x.First).ToArray();
        startTime = zip.Select(x => x.Second).ToArray();
        profit = zip.Select(x => x.Third).ToArray();
        
        int n = endTime.Length;
        // var dp = new int[n]; //dp[i]: 前 i 个单位时间内，最大薪资和
        // var dp = new (int end, int prof)[n];  // (endTime, preProfitSum)
        // for (int i = 0; i < n; i++)
        // {
        //     dp[i] = (endTime[i], prof: 0);
        // }
        var dp = new Dictionary<int, int>(); //dp[endTime[i]]: 前 endTime[i] 个单位时间内，最大薪资和
        foreach (int end in endTime) {
            dp[end] = 0;
        }
        var max = 0;
        for (int i =  0; i < n; i++) {
            var start = startTime[i];
            var findIdx = Array.BinarySearch(endTime, 0, i, start);
            findIdx = findIdx < 0 ? ~findIdx - 1 : findIdx;
            // var curMaxPreProfitSum = findIdx < 0 ? profit[i] : dp[findIdx] + profit[i]; // 包含了当前(第 i 项) job 的最大薪资和
            // max = Math.Max(max, curMaxPreProfitSum); // 需要与历史薪资和比较取最大值（最大薪资的构成可能包含当前(第 i 项) job, 也可能不包含）
            // dp[i] = max; // 写入前 i 项的最大薪资和
            // 需要通过 hash 去重，否则二分查找很可能会找到相同结束时间但是之前计算的历史数据上
            var curMaxPreProfitSum = findIdx < 0 ? profit[i] : dp[endTime[findIdx]] + profit[i]; // 包含了当前(第 i 项) job 的最大薪资和
            max = Math.Max(max, curMaxPreProfitSum); // 需要与历史薪资和比较取最大值（最大薪资的构成可能包含当前(第 i 项) job, 也可能不包含）
            dp[endTime[i]] = max; // 写入前 endTime[i]] 个单位时间内的最大薪资和
        }
        return dp[endTime.Last()];
    }
}