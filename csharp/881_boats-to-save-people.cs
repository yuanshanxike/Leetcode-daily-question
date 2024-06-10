namespace L881;

public class Solution
{
    /// <summary>
    /// 贪心：每一艘救生艇尽可能地装满，可以使得所用船数最少。
    /// 排序后，维护一对双指针，l 指向第一个(最小的)元素，r 指向第一个小于 limit 的元素（同时统计已装满船的数量）。
    /// 先装 r 指向的元素，r--，然后剩余的空间尽量去装 l 指向的元素，每装下一个 l 指向的元素，l++。
    /// 在这个过程中统计 所需船的数量，直到 l >= r
    /// </summary>
    public int NumRescueBoats(int[] people, int limit)
    {
        int n = people.Length;
        int ans = 0;
        Array.Sort(people);
        int l = 0;
        int r = Array.BinarySearch(people, limit);
        if (r >= 0)
        {
            ans = n - r;
            while (--r >= 0 && people[r] == limit)
            {
                ans++;
            }
        }
        else r = n - 1;
        int res = limit;
        while (l < r)
        {
            res -= people[r--];
            // 题目：最多可以同时载两人。所以使用 if 而不是 while
            if (l < n && res >= people[l])
            {
                res -= people[l++];
            }
            ans++;
            res = limit;
        }
        if (l == r) ans++;
        return ans;
    }
}