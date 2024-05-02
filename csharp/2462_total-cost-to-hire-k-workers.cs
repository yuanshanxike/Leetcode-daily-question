namespace L2462;

public class Solution
{
    private const int MAX_COST = (int)1e5 + 1;

    public long TotalCost(int[] costs, int k, int candidates)
    {
        var l = candidates - 1;
        var r = costs.Length - candidates;
        var sum = 0L;
        // 分类讨论
        if (l >= r)
        {
            Array.Sort(costs);
            for (int i = 0; i < k; i++)
            {
                sum += costs[i];
            }
            return sum;
        }
        else
        {
            // 能有效分成 前candidates 和 后candidates 个，则通过两个最小堆模拟
            var leftHeap = new PriorityQueue<int, int>();
            var rightHeap = new PriorityQueue<int, int>();
            for (var i = 0; i <= l; i++)
            {
                var cost = costs[i];
                leftHeap.Enqueue(cost, cost);
            }
            for (int i = r; i < costs.Length; i++)
            {
                var cost = costs[i];
                rightHeap.Enqueue(cost, cost);
            }
            while (k-- > 0)
            {
                var leftMin = leftHeap.TryPeek(out var lMin, out _) ? lMin : MAX_COST;
                var rightMin = rightHeap.TryPeek(out var rMin, out _) ? rMin : MAX_COST;
                var canMove = r - l > 1;  // 不能直接用 l < r 做判断，不然两个堆中会有一个元素重合
                if (leftMin <= rightMin) {
                    sum += leftHeap.Dequeue();
                    if (canMove) {
                        var cost = costs[++l];
                        leftHeap.Enqueue(cost, cost);
                    }
                } else {
                    sum += rightHeap.Dequeue();
                    if (canMove) {
                        var cost = costs[--r];
                        rightHeap.Enqueue(cost, cost);
                    }
                }
            }
            return sum;
        }
    }
}