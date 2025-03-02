namespace L1847;

public class Solution {
    /// <summary>
    /// 期望所有存在的房间 rooms 可以按照 size 进行排序；
    /// 同时还希望房间的编号也是有序的。
    /// 
    /// 已存在的房间按照 size 进行排序后会变得容易处理，于是先对 rooms 按照 size 进行一个非递增排序（非递减也可以）。
    /// 
    /// 因为已经事先知道了所有的 queries，我们可以重新编排查询的顺序进行查询，只要最后按照题目给的的询问顺序进行回答即可。
    /// 所以对于 queries 的处理可以是离线的。
    /// 一种方法是比较每个查询的 size 大小，并对 queries 的下标数组进行排序。
    /// 我们希望优先处理 size 比较大的查询，设该查询为 [preferred 0, minSize 0],
    /// 那么高效动态维护一个有序的序列可以使用 有序集合（在线算法）。
    /// 
    /// 具体做法是：
    /// （[preferred 0, minSize 0] 是 size 最大的查询）
    /// 将 rooms 中所有 size >= minSize 0 的房间编号加入到一个 有序集合 中,
    /// 然后在该 有序集合 中，二分查找：① <= preferred 0 的最大编号；② >= preferred 0 的最小编号。
    /// 返回 ① 和 ② 中距离 preferred 0 最近的一方。
    /// 接着，取出 size 次大的查询 —— [preferred 1, minSize 1],
    /// 此时，只需要将 rooms 中所有 minSize 1 <= size <= minSize 0 的房间编号加入到 有序集合 中，
    /// 再二分查找符合要求的最近两个房间即可。
    /// ......
    /// </summary>
    /// <param name="rooms"></param>
    /// <param name="queries"></param>
    /// <returns></returns>
    public int[] ClosestRoom(int[][] rooms, int[][] queries) {
        int n = rooms.Length, k = queries.Length;
        Array.Sort(rooms, Comparer<int[]>.Create((a, b) => b[1].CompareTo(a[1])));
        int[] queryIdxArr = Enumerable.Range(0, k).ToArray();
        Array.Sort(queryIdxArr, Comparer<int>.Create((i, j) => queries[j][1].CompareTo(queries[i][1])));
        var ans = new int[k];

        SortedSet<int> sortedArr = [];  // 维护房间号的有序序列
        int j = 0;  // 排序后的 rooms 中记录已添加到 SortedSet 中的元素指针
        for (int i = 0; i < k; i++) {
            int qIdx = queryIdxArr[i];
            var q = queries[qIdx];
            while (j < n && rooms[j][1] >= q[1]) {
                sortedArr.Add(rooms[j][0]);
                j++;
            }

            if (sortedArr.Count == 0) {
                ans[qIdx] = -1;
                continue;
            }

            var upper = sortedArr.GetViewBetween(Math.Min(q[0], sortedArr.Max), sortedArr.Max);  // 查找上述的 ①
            var lower = sortedArr.GetViewBetween(sortedArr.Min, Math.Max(q[0], sortedArr.Min));  // 查找上述的 ②

            if (upper.Min == q[0]) {
                ans[qIdx] = q[0];
            } else {
                ans[qIdx] = Math.Abs(q[0] - lower.Max) <= Math.Abs(q[0] - upper.Min) ? lower.Max : upper.Min;
            }
        }
        return ans;
    }
}