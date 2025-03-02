namespace L3066;

public class Solution {
    public int MinOperations(int[] nums, int k) {
        var minHeap = new PriorityQueue<long, long>();
        int cnt = 0;
        minHeap.EnqueueRange(nums.Select(num => ((long)num, (long)num)));
        while (minHeap.Count > 1) {
            if (minHeap.Peek() < k) {
                long x = minHeap.Dequeue();
                long y = minHeap.Dequeue();
                minHeap.Enqueue(2 * x + y, 2 * x + y);

                cnt++;
            } else {
                break;
            }
        }
        return cnt;
    }
}