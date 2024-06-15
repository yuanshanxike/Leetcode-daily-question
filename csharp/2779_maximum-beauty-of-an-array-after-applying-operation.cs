namespace L2779;

public class Solution {
    /// <summary>
    /// 排序 + 滑动窗口（大小范围: 2k。通过双指针表示）
    /// 可选：每次通过二分查找计算 r 的坐标
    /// </summary>
    public int MaximumBeauty(int[] nums, int k) {
        int n = nums.Length;
        Array.Sort(nums);
        int windowRange = 2 * k;
        // 填充窗口
        int l = 0;
        int calcRight()
        {
            if (l >= n) return l;
            int r = Array.BinarySearch(nums, l + 1, n - l - 1, nums[l] + windowRange);
            r = r < 0 ? ~r - 1 : r;
            while (r + 1 < n && nums[r + 1] == nums[r])  // 保证 r 指向相同元素的最后一个
            {
                r++;
            }
            return r;
        }
        int r = calcRight();
        var ans = r - l + 1;
        // 滑动窗口
        while (r < n) {
            do { // 移动 l 到下一个比它大的元素下标
                l++;
            } while (l < n && nums[l] == nums[l - 1]);
            r = calcRight();
            ans = Math.Max(ans, r - l + 1);
        }
        return ans;
    }
}