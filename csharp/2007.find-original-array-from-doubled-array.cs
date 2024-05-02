namespace L2007;

public class Solution {
    /// <summary>
    /// 首先，按照规则，合法的 changed 中的元素数量必然是偶数。
    /// 可以先对 changed 数组进行排序（升序）。
    /// 根据规则，我们可以知道：有序数组中的最后一个元素(changed 中最大的数)一定是 original 中最大元素的两倍！
    /// #CHECK
    /// 如果这个数是奇数，则不会存在规则描述的原数组，返回空集；
    /// 是偶数，则除2找到 original 中最大的元素，则在当前有序数组中，其右边的值都是 changed 数组中的新元素，
    /// 那么我们现在就可以将这些 changed 中的新元素及其对应的 original 中的元素逐个排除，
    /// 这个过程中，只要遇到 changed 中的新元素为奇数时直接返回空集。
    /// 
    /// 排除完成后，changed 数组中可能还是会剩余一些未能配对排除的元素，
    /// 这些剩余的元素又可以接着从 #CHECK 开始，递归地进行排除，直到剩余元素为空。
    /// （寻找 original 中最大元素：可以在 changed 中使用二分查找进行）
    /// （查找 changed 中的新元素对应的 original 时也可以二分查找）
    /// 如果二分查找返回负数，说明对应的 original 中的数也是不存在的，此时返回空集。
    /// </summary>
    /// <param name="changed"></param>
    /// <returns></returns>
    // public int[] FindOriginalArray(int[] changed) {
    //     if ((changed.Length & 1) == 1) return [];
    //     Array.Sort(changed);
    //     if (changed[0] == 0 && changed[^1] == 0) return new int[changed.Length >> 1];
    //     List<int> remain = [.. changed];
    //     List<int> ans = [];
    //     List<int> deleteIdxList = [];  // 实际删除操作时，需要从后往前删除
    //     Action check = () => {};
    //     check = () => {
    //         if ((remain[^1] & 1) == 1) {
    //             ans = [];
    //             return;
    //         }
    //         var orgMaxIdx = remain.BinarySearch(remain[^1] >> 1);
    //         if (orgMaxIdx < 0) {
    //             ans = [];
    //             return;
    //         }
    //         ans.Add(remain[orgMaxIdx]);
    //         deleteIdxList.Add(orgMaxIdx);
    //         deleteIdxList.Add(remain.Count - 1);
    //         var searchCount = orgMaxIdx;
    //         for (int i = remain.Count - 2; i > orgMaxIdx; i--) {
    //             var doub = remain[i];
    //             if ((doub & 1) == 1) {
    //                 ans = [];
    //                 return;
    //             } else {
    //                 // var idx = remain.BinarySearch(0, searchCount, doub >> 1, null);
    //                 var idx = UpperBound(remain, 0, searchCount, doub >> 1);
    //                 searchCount = idx;
    //                 if (idx < 0) {
    //                     ans = [];
    //                     return;
    //                 }
    //                 ans.Add(remain[idx]);
    //                 deleteIdxList.Add(idx);
    //                 deleteIdxList.Add(i);
    //             }
    //         }
    //         deleteIdxList.Sort();
    //         deleteIdxList.Reverse();
    //         foreach (var idx in deleteIdxList)
    //         {
    //             remain.RemoveAt(idx);
    //         }
    //         deleteIdxList.Clear();

    //         if (remain.Count != 0) {
    //             check();
    //         }
    //     };
    //     check();
    //     return [.. ans];
    // }

    // private int UpperBound(List<int> list, int start, int count, int target) {
    //     var end = start + count;
    //     while (start < end)
    //     {
    //         var mid = (start + end) / 2;
    //         if (list[mid] <= target) {
    //             start = mid + 1;
    //         } else { // list[mid] > target
    //             end = mid;
    //         }
    //     }
    //     return start - 1;
    // }
    /***************************** 上面这种删除做法 AC：173 / 179 *********************************

    
    /** 不要真的去删除数组元素，太费时间，且很难操作（容易出错） **/

    /// <summary>
    /// 将删除操作改为哈希计数，其余大体的思路不变。
    /// 同时也不需要二分查找了
    /// </summary>
    /// <param name="changed"></param>
    /// <returns></returns>
    public int[] FindOriginalArray(int[] changed) {
        if ((changed.Length & 1) == 1) return [];
        Array.Sort(changed);
        if (changed[0] == 0 && changed[^1] == 0) return new int[changed.Length >> 1];
        var hash = new Dictionary<int, int>();
        List<int> original = [];
        for (int i = changed.Length - 1; i >= 0; i--) {
            var num = changed[i];
            if (hash.TryGetValue(num, out var val)) // 遇到被标记删除的元素一定是 original 中的元素（相当于是被删除了，就不会再对它进行标记了）
            {
                original.Add(num);
                if (val == 1) hash.Remove(num);
                else hash[num] = val - 1;
            }
            else // 否则是 changed 中新加入的元素，它的一半（original 中对应的数）需要被标记删除
            {
                // 需要判断奇偶，奇数的话不会有对应的 original 中的元素
                if ((num & 1) == 1) return [];  // 遇到非 original 中的奇数可以直接返回空集
                num >>= 1;
                if (hash.TryGetValue(num, out var value)) hash[num] = value + 1;
                else hash[num] = 1;
            }
        }
        return hash.Count == 0 ? [.. original] : [];
    }

    /// <summary>
    /// 复杂度为O(n)的做法：
    /// https://leetcode.cn/problems/find-original-array-from-doubled-array/solutions/2744966/san-chong-fang-fa-cong-onlogn-dao-onpyth-irrt/?envType=daily-question&envId=2024-04-18
    /// </summary>
    /// <param name="changed"></param>
    /// <param name=""></param>
    /// <returns></returns>
    public int[] FindOriginalArray_Hash(int[] changed) {
        if (changed.Length % 2 == 1) return [];
        Dictionary<int, int> counter = [];
        foreach (var item in changed)
        {
            if (!counter.TryAdd(item, 1)) counter[item] = counter[item] + 1;
        }
        // 对于 0 要特殊处理
        if (counter.TryGetValue(0, out int zeroNum) && zeroNum % 2 == 1) return [];
        counter.Remove(0);
        var original = new int[changed.Length / 2];
        var idx = 0;
        foreach (var X in counter.Keys)
        {
            if (X % 2 == 0 && counter.ContainsKey(X / 2)) continue;  // 已经计算过了
            var x = X;
            while (counter.ContainsKey(x)) {
                var countX = counter[x];
                if (!counter.ContainsKey(2*x)) return [];
                var count2X = counter[2*x];
                if (countX > count2X) return [];

                for (int i = 0; i < countX; i++)
                {
                    original[idx++] = x;
                }

                if (countX < count2X) {
                    counter[2*x] -= countX;
                    x *= 2;
                } else { // countX == count2X
                    x *= 4;
                }
            }
        }
        return original;
    }
}

/**
case 1:
[1,3,4,2,6,8]    [1,2,3,4  ,6,8] -> [2,4,6,8  ,12,16]  _8_  2,4,6,8
                            3,4 remain(1,2)
                            
                            [1,  2] -> [2, 4]
                                 1 remain()


case 2:
[6,3,0,1]   [0,1,3, 6] -> [0,2,6, 12]  [0,2,6]
                    3 remain(0,1)


                    [0,  1] -> [0,  2]
                         奇数：出错(返回空集)


case 3:
[1,2,2,3,4,6]   [1,2,2,3,  4,6] -> [2,4,4,6,  8,12]  [2,4,4,6]
                           2,3 remain(1,2)

                           [1,  2] -> [2, 4]
                                1 remain()


case 3:
[1,10,30,2,20,60]   [1,2,10,20,30,  60] -> [2,4,20,40,60,  120]  [2,4,20,40,60]
                                    30 remain(1,2,10,20)

                                    [1,2,10,  20] -> [2,4,20,  40]
                                              10 remain(1,2)

                                              [1,  2] -> [2,  4]
                                                   1 remain()
**/