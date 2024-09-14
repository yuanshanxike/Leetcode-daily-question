namespace L2576 {
    public class Solution
    {
        /// <summary>
        /// 排序 + 贪心 + 二分（或同向双指针）
        /// 二分后不断右移二分区间左边界的做法（ O(n * logN) ）启示我们，本题可以直接使用同向双指针（ O(n) ）求解
        /// </summary>
        /// <param name="nums"></param>
        /// <returns></returns>
        public int MaxNumOfMarkedIndices(int[] nums)
        {
            int n = nums.Length;
            Array.Sort(nums);
            int ans = 0;
            int findStart = n / 2; // 每次二分查找二倍元素区间的左边界
            for (int i = 0; i <= n / 2; i++) {  // 有序数组左半边的数去匹配右半边的数，所以只需要枚举左半边的数字在右半边匹配就行
                // 从小到大贪心地去匹配，因为排序后元素 X 单调递增，2X 同样也是单调递增
                findStart = Math.Max(i + 1, findStart);
                int r = BinarySearchLowBound(nums, findStart, n - findStart, nums[i] * 2);
                if (r < n) {
                    findStart = r + 1;  // 每次有数字对匹配上时，都需要右移二分查找二倍元素区间的左边界
                    ans += 2;  // 每次匹配到的数对有两个元素
                }
            }

            return ans;
        }

        private static int BinarySearchLowBound(int[] arr, int start, int len, int target)
        {
            int l = Array.BinarySearch(arr, start, len, target);
            if (l < 0) l = ~l;
            else
            { // 能找到值等于 target 的数
                while (true)
                { // 继续找左边
                    if (l == start || arr[l - 1] < target) break;
                    l = Array.BinarySearch(arr, start, l - start, target);
                }
            }
            return l;
        }
    }
}