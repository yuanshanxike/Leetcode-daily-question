namespace L3072;

public class Solution
{
    /// <summary>
    /// 利用树状数组所支持的 “单点修改” 和 “区间查询” 两个特性来高效维护 arr1 和 arr2 中当前所有的元素中，
    /// 小于等于每个元素值的元素数量（数组当前长度减去这个值就是 greaterCount 的结果）。
    /// 在树状数组中，“单个点”存储的是这个数组下标所对应的元素在当前的 arr1 或 arr2 中的数量。
    /// 由于数组下标是单调递增的，我们需要其存储的数字也是单调递增的才能比较好地建立下标到元素的映射关系。
    /// 所以可以通过对输入数组 nums 进行 去重 + 排序 的方式得到这个单调元素序列。
    /// 此时就可以将这个序列映射到树状数组的下标中去。
    /// 每次从 nums 中读取到的新元素，可以找到其在单调递增序列中的下标，这个下标可以对应到树状数组中；然后分别对两个树状数组进行“区间查询”，
    /// 得到两个 greaterCount 结果，比较结果选择正确的数组进行插入；最后去对选中的树状数组进行“单点修改”，表示对原数组进行数据的插入。
    /// 因为序列的单调性，查找下标可以直接使用二分查找。
    /// </summary>
    public int[] ResultArray(int[] nums)
    {
        var sequence = new HashSet<int>(nums).ToArray();
        Array.Sort(sequence);
        var m = sequence.Length;
        List<int> arr1 = [nums[0]];
        List<int> arr2 = [nums[1]];
        var t1 = new Fenwick(m + 1);  // 因为树状数组的第0位是不使用的，这里长度要设置成 m + 1
        t1.Add(Array.BinarySearch(sequence, nums[0]) + 1);  // 所以找到的下标也要对应 +1
        var t2 = new Fenwick(m + 1);
        t2.Add(Array.BinarySearch(sequence, nums[1]) + 1);
        foreach (var x in nums[2..^0])
        {
            int r = Array.BinarySearch(sequence, x) + 1;  // 下标对应 +1
            int cnt1 = arr1.Count - t1.Pre(r);
            int cnt2 = arr2.Count - t2.Pre(r);

            if (cnt1 > cnt2)
            {
                t1.Add(r);
                arr1.Add(x);
            }
            else if (cnt1 < cnt2)
            {
                t2.Add(r);
                arr2.Add(x);
            }
            else
            {
                if (arr1.Count > arr2.Count)
                {
                    t2.Add(r);
                    arr2.Add(x);
                }
                else
                {
                    t1.Add(r);
                    arr1.Add(x);
                }
            }
        }
        return [.. arr1, .. arr2];
    }

    private class Fenwick(int len)
    {
        private readonly int[] c = new int[len];

        public int Pre(int i)
        {
            var ans = 0;
            while (i > 0)
            {
                ans += c[i];
                i -= Lowbit(i);  // 等价于 i &= i - 1
            }
            return ans;
        }

        public void Add(int i)
        {
            while (i < len)
            {
                c[i]++;
                i += Lowbit(i);
            }
        }

        static int Lowbit(int x) => x & -x;
    }
}