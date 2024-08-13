namespace L3152;

public class Solution {
    /// <summary>
    /// 方法一：
    /// 预处理出所有的“特殊数组”区间(O(n))，由于区间是由元素下标构成的（有序），所以对于每个 query 可以在预处理好的区间数组中二分查找对应的区间(O(m*log n))，再检验合法性。
    /// 时间复杂度：O(n + m * log n)
    /// </summary>
    /// <param name="nums"></param>
    /// <param name="queries"></param>
    /// <returns></returns>
    public bool[] IsArraySpecial(int[] nums, int[][] queries) {
        List<(int left, int right)> rangeArr = [];
        int left = 0;
        for (int i = 1; i < nums.Length; i++) {
            if (((nums[i] ^ nums[i - 1]) & 1) == 0) {
                rangeArr.Add((left, i - 1));
                left = i;
            }
        }
        rangeArr.Add((left, nums.Length - 1));

        var ansArr = new bool[queries.Length];
        int idx = 0;

        foreach (var pair in queries) {
            int rangeIdx = rangeArr.BinarySearch((pair[0], pair[1]), Comparer<(int, int r)>.Create((a, b) => {
                return a.r - b.r;
            }));
            rangeIdx = rangeIdx < 0 ? ~rangeIdx : rangeIdx;
            int l = rangeArr[rangeIdx].left, r = rangeArr[rangeIdx].right;
            ansArr[idx++] = l <= pair[0] && pair[1] <= r;
        }

        return ansArr;
    }
}