namespace L1738;

/// <summary>
/// 异或操作等价于按位对 1(奇数) 和 0(偶数) 求奇偶性的加法运行，满足结合律。
/// 但需要注意：
/// 左边元素对应的左上矩形 及 上边元素对应的左上矩形 如果有重合部分的左上矩形（左上方元素对应的左上矩形）。
/// 那么它们异或之后 重合部分矩形会被消除(类似于奇偶性相加)，需要再次异或这个重合矩形。
/// </summary>
public class Solution {
    public int KthLargestValue(int[][] matrix, int k) {
        int m = matrix.Length;
        int n = matrix[0].Length;
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((x, y) => y - x));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (j > 0) matrix[i][j] ^= matrix[i][j - 1];
                if (i > 0) matrix[i][j] ^= matrix[i - 1][j];
                if (j > 0 && i > 0) matrix[i][j] ^= matrix[i - 1][j - 1];  // 两个矩形部分有重合的矩形需要再次异或
                maxHeap.Enqueue(matrix[i][j], matrix[i][j]);
            }
        }
        for (; k > 1; k--) {
            maxHeap.Dequeue();
        }
        return maxHeap.Peek();
    }
}