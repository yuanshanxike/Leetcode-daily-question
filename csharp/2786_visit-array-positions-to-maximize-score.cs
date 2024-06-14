namespace L2786;

public class Solution {
     /// <summary>
     /// dp + 优先队列
     /// 
     /// 从左往右，记录下每个位置能够取得的最大分数，数据储存在两个优先队列中👇。
     /// 维护两个大根堆，一个存放对应 nums[i] 都是奇数的 maxScore，另一个存放对应 nums[i] 都是偶数的 maxScore，根据计算出来的到达当前位置能获得的最大分数 的奇偶性来决定 maxScore 需要进入到哪一个堆中。
     /// 以这种方式遍历计算完 nums，最后的答案是两个堆顶的中的最大值。
     /// 时间复杂度：O(n*logn)
     /// </sumary>
    public long MaxScore(int[] nums, int x) {
        int n = nums.Length;
        var increOrder = Comparer<long>.Create((a, b) => a > b ? -1 : 1);
        var oddHeap = new PriorityQueue<(int num, long maxScore), long>(increOrder);
        var evenHeap = new PriorityQueue<(int num, long maxScore), long>(increOrder);

        if ((nums[0] & 1) == 1) {
          oddHeap.Enqueue((nums[0], nums[0]), nums[0]);
        } else {
          evenHeap.Enqueue((nums[0], nums[0]), nums[0]);
        }
        
        for (int i = 1; i < n; i++) {
          long maxOdd = int.MinValue, maxEven = int.MinValue;
          if (oddHeap.Count > 0) {
            var (num, maxScore) = oddHeap.Peek();
            maxOdd = nums[i] + (((nums[i] ^ num) & 1) == 1 ? maxScore - x : maxScore);
          }
          if (evenHeap.Count > 0) {
            var (num, maxScore) = evenHeap.Peek();
            maxEven = nums[i] + (((nums[i] ^ num) & 1) == 1 ? maxScore - x : maxScore);
          }

          long maxVal = Math.Max(maxOdd, maxEven);
          if ((nums[i] & 1) == 1) {
            oddHeap.Enqueue((nums[i], maxVal), maxVal);
          } else {
            evenHeap.Enqueue((nums[i], maxVal), maxVal);
          }
        }
        return Math.Max(oddHeap.Count > 0 ? oddHeap.Peek().maxScore : 0, evenHeap.Count > 0 ? evenHeap.Peek().maxScore : 0);
    }
}