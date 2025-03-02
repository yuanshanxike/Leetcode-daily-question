namespace L3266;

public class Solution {
    private const int MOD = (int)(1e9 + 7);

    /// <summary>
    /// 按照题目规则，每次取 nums 中最小的数乘上 multiplier 进行更新。
    /// ① 首先，和 L3264 一样，可以结合最小堆来模拟更新 nums 中的数值；
    /// ② 重复 ① 直到 nums 中一开始的最大值成为当前数组中的最小值（位于最小堆的堆顶），
    /// 此时对于任意 0 <= i < n, x = nums[i] / multiplier 满足 x <= mx && x * multiplier > mx。
    /// 将当前的 最小堆 进行非递减排序整理。
    /// 此后，按照题目规则，multiplier 会依次、轮流和排序后的数据进行相乘。
    /// 这种操作是有规律可循的，即：排序后的每个元素至少都会被再乘上 ⌊n / k⌋ 次 multiplier；
    /// 而前 n % k 个元素还会被多乘上 1 次 multiplier。
    /// 
    /// 综上，算法分为了两个步骤：
    /// a. 使用最小堆按照题目规则进行模拟，直到最小堆顶等于原数组中的最大元素;
    /// b. 排序后的数组逐项套用公式进直接计算。
    /// 
    /// <b>中乘方计算使用快速幂进行加速。
    /// </summary>
    /// <param name="nums"></param>
    /// <param name="k"></param>
    /// <param name="multiplier"></param>
    /// <returns></returns>
    public int[] GetFinalState(int[] nums, int k, int multiplier) {
        if (multiplier == 1) return nums;  // multiplier == 1 时特判直接返回

        int n = nums.Length;
        PriorityQueue<(long val, int idx), (long val, int idx)> minHeap = new(Comparer<(long val, int idx)>.Create((a, b) => a.val != b.val ? a.val.CompareTo(b.val) : a.idx.CompareTo(b.idx)));
        int mx = int.MinValue;
        for (int i = 0; i < n; i++) {
            var pair = (nums[i], i);
            minHeap.Enqueue(pair, pair);
            mx = Math.Max(mx, nums[i]);
        }

        // 第 1 步：模拟
        while (k > 0 && minHeap.Peek().val < mx) {
            (long val, int idx) = minHeap.Dequeue();
            // val = val * multiplier % MOD;
            val *= multiplier;  //  上面取 MOD 后 leetcode 上过不了
            var pair = (val, idx);
            minHeap.Enqueue(pair, pair);
            k--;
        }
        
        // 第 2 步：逐项套用公式计算
        for (int i = 0; i < n; i++) {
            (long val, int idx) = minHeap.Dequeue(); // 将优先队列的所有元素依次 dequeue，相当于对这些元素进行了整理排序
            val = val * Pow(multiplier, k / n + (i < k % n ? 1 : 0)) % MOD;
            
            nums[idx] = (int)val;
        }
        return nums;
    }

    private static long Pow(long b, int t) {
        long res = 1;
        while (int.LeadingZeroCount(t) < 32) {
            if ((t & 1) == 1) {
                res = res * b % MOD;
            }
            b = b * b % MOD;
            t >>= 1;
        }
        return res;
    }
}