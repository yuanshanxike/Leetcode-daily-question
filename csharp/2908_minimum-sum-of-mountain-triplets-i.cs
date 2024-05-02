namespace L2908;
public class Solution
{
    public int MinimumSum(int[] nums)
    {
        /// 解法一：暴力 O(n^2)
        // var n = nums.Length;
        // var minSum = int.MaxValue;
        // for (var j = 1; j < n - 1; j++)
        // {
        //     var mid = nums[j];
        //     var left = mid;
        //     var right = mid;
        //     for (int i = 0; i < j; i++)
        //     {
        //         if (nums[i] < nums[j])
        //         {
        //             left = Math.Min(left, nums[i]);
        //         }
        //     }
        //     for (int k = j + 1; k < n; k++)
        //     {
        //         if (nums[k] < nums[j])
        //         {
        //             right = Math.Min(right, nums[k]);
        //         }
        //     }
        //     if (left != mid && mid != right) {
        //         minSum = Math.Min(left + mid + right, minSum);
        //     }
        // }
        // return minSum == int.MaxValue ? -1 : minSum;


        /// 解法二：前后缀分解 O(n)
        // var n = nums.Length;
        // var minSun = int.MaxValue;
        // var suf = new int[n];  // suf[i] 表示 i .. n-1 的最小值
        // suf[n - 1] = nums[n - 1]; // init
        // for (int i = n - 1; i > 0; i--) // 与原数组顺序保持一致比较容易计算
        // {
        //     if (i < n - 1) suf[i] = suf[i + 1];
        //     suf[i] = Math.Min(suf[i], nums[i]);
        // }
        // var pre = new int[n]; // pre[i] 同理。并且可以与计算答案的循环一起计算
        // pre[0] = nums[0];
        // for (int i = 0; i < n - 1; i++)
        // {
        //     if (i > 0) pre[i] = pre[i - 1];
        //     pre[i] = Math.Min(pre[i], nums[i]);
        //     if (i > 0 && pre[i - 1] < nums[i] && suf[i + 1] < nums[i])  // j need > 0
        //     {
        //         minSun = Math.Min(minSun, pre[i - 1] + nums[i] + suf[i + 1]);
        //     }
        // }
        // return minSun == int.MaxValue ? -1 : minSun;


        /// 解法二 时空优化
        var n = nums.Length;
        var minSun = int.MaxValue;
        var suf = new int[n];  // suf[i] 表示 i .. n-1 的最小值
        suf[n - 1] = nums[n - 1]; // init
        for (int i = n - 2; i > 0; i--) // 与原数组顺序保持一致比较容易计算
        {
            suf[i] = Math.Min(suf[i + 1], nums[i]);
        }
        var pre = nums[0]; // pre[i] 同理。因为可以与计算答案的循环一起计算，就不需要数组了
        for (int i = 1; i < n - 1; i++)
        {
            if (pre < nums[i] && suf[i + 1] < nums[i])  // j need > 0
            {
                minSun = Math.Min(minSun, pre + nums[i] + suf[i + 1]);
            }
            pre = Math.Min(pre, nums[i]);
        }
        return minSun == int.MaxValue ? -1 : minSun;
    }
}