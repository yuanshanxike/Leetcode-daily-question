namespace L857;

public class Solution {
    private const double MAX_COST = 1e12; // 10^4(max of k) * 10*4(max of wage) * 10^4(max of maxQuality / minQuality)

    public double MincostToHireWorkers(int[] quality, int[] wage, int k) {
        // quality: [3,1,10,10,1,1]
        // wage:    [4,8, 2, 2,7,9]
        // 单价:    [1.33333, 8, 0.2, 0.2, 7, 9]
        var n = quality.Length;
        // (unitPrice, quality)
        var unitPrices = new Tuple<double, int>[n];
        for (int j = 0; j < n ; j++)
        {
            var qual = quality[j];
            unitPrices[j] = Tuple.Create(wage[j] / (double)qual, qual);
        }
        Array.Sort(unitPrices, (x, y) => x.Item1 - y.Item1 < 0 ? -1 : 1);
        var qualitySum = 0; // 当前能达到工资预期的 k 名打工人的总工作质量
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((x, y) => y - x)); // 维护当前单价及以下的打工人中，前 k 小的质量
        var ans = MAX_COST;
        void UpdateAns(double unitPrice) {
            ans = Math.Min(ans, Math.Round(qualitySum * unitPrice, 5));
        }
        // fill the priotityQueue
        int i = 0;
        var (p, q) = unitPrices[0];
        for (; i < k; i++) {
            (p, q) = unitPrices[i];
            maxHeap.Enqueue(q, q);
            qualitySum += q;
        }
        UpdateAns(p);  // for 0 ~ k-1
        // find the ans
        for (; i < n; i++) {
            (p, q) = unitPrices[i];
            qualitySum -= maxHeap.DequeueEnqueue(q, q);
            qualitySum += q;
            UpdateAns(p);
        }
        return ans;
    }
}