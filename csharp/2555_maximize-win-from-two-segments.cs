namespace L2555 {
    /// <summary>
    /// 二分查找 + dp
    /// 
    /// 贪心地想，两条线段不相交覆盖的奖品肯定比相交覆盖的奖品数量多。
    /// 
    /// 如果比较暴力地去做，可以枚举第二条线段的右端点，然后二分查找其左端点，
    /// 然后在第二条线段的左端点的左边再枚举第一条线段的右端点，然后再二分查找第一条线段的左端点。
    /// 维护上述方式计算得到的奖品数量的最大值。可以预见，这种方式的复杂度为 O(n^2 * log^2(n)),
    /// 从左往右枚举第二条线段得到其左端点再枚举第一条线段的做法，一直在重复枚举着大量的第一条线段的端点。
    /// 但这种方式很显然能计算出正确结果。
    /// 
    /// 优化：定义 dp[i] 表示在前 prizePositions[i] 的位置，选择长度为 k 的线段最多能得到的奖品数量。
    /// dp[i] 可能由两种状态转移过来：
    /// ①线段右端点在 prizePositions[i] 处，那么可以通过二分查找找到当前线段左端点覆盖的最左侧商品的位置 prizePositions[left], 线段覆盖的奖品数为 i - left + 1;
    /// ②线段右端点在 prizePositions[i] 的左边，那么线段覆盖的奖品数为 dp[i - 1]。
    /// 可以得到状态转移方程：dp[i] = max(i - left + 1, dp[i - 1])
    /// 上式也可以理解为“i - left + 1 的前缀最大值”。
    /// 
    /// 如果两条线段的长度不同，①需要先在数组 prizePositions 上预处理一遍，得到 dp 数组表示：前 prizePositions[i] 的位置，选择长度为 (线段1长度) 的线段最多能得到的奖品数量。
    /// ②然后再遍历一遍数组枚举线段2的端点，再在 O(1) 的复杂度下得到线段1在当前情况下能取到的最大奖品数，然后再相加维护最大值。
    /// 
    /// 本题因为指明两条线段等长，上述步骤 ① 和 ② 可以在一个循环中进行，相当于是之前计算了的线段2变成下次参与计算的线段1.  （“枚举右，维护左”）
    /// 也就是每次都使用 dp[left] + i - left + 1 来更新最大值。
    /// 
    /// 二分查找 可以替换成 滑动窗口，也就是 滑动窗口 + dp 的方式，总的时间复杂度可以进一步优化为 O(n)
    /// </summary>
    public class Solution
    {
        public int MaximizeWin(int[] prizePositions, int k) {
            int n = prizePositions.Length;
            int[] dp = new int[n + 1];
            dp[0] = 0;
            int ans = 0;
            for (int i = 0; i < n; i++) {
                int pos = prizePositions[i];
                int left = BinarySearchLowBound(prizePositions, 0, i + 1, pos - k);
                left = left < 0 ? ~left : left;
                ans = Math.Max(ans, dp[left] + i - left + 1);
                dp[i + 1] = Math.Max(dp[i], i - left + 1);
            }
            return ans;
        }

        private static int BinarySearchLowBound(int[] arr, int start, int len, int target) {
            int l = Array.BinarySearch(arr, start, len, target);
            if (l < 0) l = ~l;
            else { // 能找到值等于 target 的数
                while (true) { // 继续找左边
                    if (l == start || arr[l - 1] < target) break;
                    l = Array.BinarySearch(arr, start, l - start, target);
                }
            }
            return l;
        }
    }
}