namespace L2529;

public class Solution {
    // /// <summary>
    // /// 遍历数组：O(n)
    // /// </summary>
    // /// <param name="nums"></param>
    // /// <returns></returns>
    // public int MaximumCount(int[] nums) {
    //     var neg = 0;
    //     var pos = 0;
    //     foreach (var num in nums)
    //     {
    //         if (num < 0) neg++;
    //         else if (num > 0) pos++;
    //     }
    //     return neg <= pos ? pos : neg;
    // }

    /// <summary>
    /// 二分查找: O(log(n))
    /// </summary>
    /// <param name="nums"></param>
    /// <returns></returns>
    public int MaximumCount(int[] nums) {
        // var negEnd = Array.BinarySearch(nums, 0, nums.Length, -1);
        // negEnd = negEnd < 0 ? -negEnd - 2 : negEnd;
        // var neg = negEnd - 0 + 1;
        
        // var startIdx = negEnd >= -1 ? negEnd + 1 : 0;
        // var posStart = Array.BinarySearch(nums, startIdx, nums.Length - startIdx, 1);
        // posStart = posStart < 0 ? -posStart - 1 : posStart;
        // var pos = posStart >= 0 ? nums.Length - posStart : nums.Length;

        var neg = BinaryBound(nums, 0, upperOrLower: false);
        var pos = nums.Length - BinaryBound(nums, 0, upperOrLower: true);

        return pos > neg ? pos : neg;
    }

    private static int BinaryBound(int[] arr, int key, bool upperOrLower)
    {
        int left = 0;
        int right = arr.Length;

        while (left < right)
        {
            int mid = (left + right) / 2;
            var moveLeft = upperOrLower ? arr[mid] <= key : arr[mid] < key;
            if (moveLeft)
            {
                left = mid + 1;
            }
            else
            {
                right = mid;
            }
        }

        return left;
    }
}