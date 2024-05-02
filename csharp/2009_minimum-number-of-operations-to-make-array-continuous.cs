namespace L2009;

public class Solution {
    public int MinOperations(int[] nums) {
        var n = nums.Length;
        var minOpt = n - 1;
        // Array.Sort(nums);
        // HashSet<int> appearNums = [];
        // appearNums.Add(nums.Last());
        // var appear = 0;
        // for (int i = 0; i < n - 1; i++)
        // {
        //     if (appearNums.Contains(nums[i])) appear++;
        //     var pos = Array.BinarySearch(nums, i + 1, nums.Length - i - 1, nums[i] + n - 1 + 1);  // +1 二分查找通过对要查找的目标值 +1，可以找到有序数组中，目标元素相同值中的最后一个
        //     if (pos < 0) pos = -pos - 2;
        //     else pos--;
        //     minOpt = Math.Min(minOpt, n - (pos - i + 1));
        //     appearNums.Add(nums[i]);
        // }
        // return minOpt + appear;
        /// *其实对于数组中重复的元素是不需要理会的，因为重复的元素最后还是要变成区间中没有的其他元素；区间外的元素也同样会变成区间中没有的元素。
        /// 我们只需要算出滑动区间中可以被保留的元素数量 m，再用原数组的元素个数 n - m，就是需要操作的元素数量。记录下 n-m 的最小值 或者 m 的最大值即可得到答案。
        
        nums = nums.Distinct().ToArray(); // 在取得原始数组的长度后，可以对这个数组进行去重
        Array.Sort(nums);
        for (int i = 0; i < nums.Length - 1; i++)
        {
            var pos = Array.BinarySearch(nums, i + 1, nums.Length - i - 1, nums[i] + n - 1);
            if (pos < 0) pos = -pos - 2;
            minOpt = Math.Min(minOpt, n - (pos - i + 1));
            if (minOpt <= 1) break; // 随着窗口的滑动，能保留下来的元素数量肯定是越来越少的，所以要是一开始就能取得一个很小的值，就可以直接放回，因为后面找到的值不可能比它小了。
        }
        return minOpt;
    }
}