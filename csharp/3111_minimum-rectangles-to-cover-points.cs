namespace L3111;

public class Solution {
    public int MinRectanglesToCoverPoints(int[][] points, int w) {
        var xs = points.Select((p) => p[0]).Order().ToArray(); // map 出横坐标，按升序排序
        int num = 0; // 矩形数量
        int idx = 0; // 对应矩形覆盖的第一个左侧 point 的下标
        while (idx < xs.Length) {
            num++;
            int left = xs[idx];  // 每个矩形坐标的左端点
            idx = Array.BinarySearch(xs, idx, xs.Length - idx, left + w);  // 二分查找矩形的右端横坐标
            if (idx < 0) {
                idx = ~idx;   // 如果没找到对应的端点，则二分查找到的下一个 point 的横坐标就是下一个矩形的左端横坐标；
            } else {
                // 如果找到对应横坐标的 point，则需要找到下一个横坐标比它大的 point 作为下一个矩形左端的横坐标 
                do {
                    idx++;
                } while (idx < xs.Length && xs[idx - 1] == xs[idx]);
            }
        }
        return num;
    }
}