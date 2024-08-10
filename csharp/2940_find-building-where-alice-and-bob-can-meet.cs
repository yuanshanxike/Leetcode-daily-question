namespace L2940;

using Extension;

public class Solution {
    // 优先队列（离线做法）
    public int[] LeftmostBuildingQueries(int[] heights, int[][] queries) {
        var ans = new int[queries.Length];
        Array.Fill(ans, -1);  // 题目要求找不到答案的填 -1
        var qs = new Dictionary<int, List<(int xHeight, int idx)>>();
        for (int i = 0; i < queries.Length; i++) {
            var (x, y) = queries[i];
            if (x > y) (x, y) = (y, x);  // 保证 x <= y
            if (x == y || heights[x] < heights[y]) {  // 可以直接得到答案的
                ans[i] = y;
            } else {  // heights[x] >= heights[y], 需要在 y 后面的数字中寻找的
                if (qs.TryGetValue(y, out var list)) {
                    list.Add((heights[x], i));
                } else {
                    // qs.Add(y, [(heights[x], i)]);
                    qs[y] = [(heights[x], i)];
                }
            }
        }
        var minHeap = new PriorityQueue<(int xHeight, int idx), int>();  // 使用最小堆，可以在每次遍历到新的 heights[i] 时，可以将小于 heights[i] 的所有堆顶依次出堆，加入到询问的答案中
        // 从左往右遍历 heights, 从遇到与 qs 中存在的下标 y 开始，qs[y] 对应的 list 的所有 item 执行入堆操作（入堆后就可以和之后遍历到的下标对应的 heigh 进行比较）
        for (int i = 0; i < heights.Length; i++) {
            // 每次遍历到新的 i，对于满足了条件的询问，把 i 作为其询问的答案
            while (minHeap.Count > 0 && minHeap.Peek().xHeight < heights[i]) {
                ans[minHeap.Dequeue().idx] = i;
            }
            // 遍历到的下标 i 处（与上面的 y 对应），如果有查询列表，将查询列表中的所有查询入堆。然后从 i + 1 开始，由小到大检测堆顶的询问是否满足条件
            if (qs.TryGetValue(i, out var list)) {
                foreach (var item in list) {
                    minHeap.Enqueue(item, item.xHeight); // 最小堆中元素按照 x 的高度进行升序“排序”
                }
            }
        }
        return ans;
    }
}