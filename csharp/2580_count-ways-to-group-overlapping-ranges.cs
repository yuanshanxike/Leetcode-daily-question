namespace L2580;

public class Solution {
    public int CountWays(int[][] ranges)
    {
        Array.Sort(ranges, (a, b) => a[0].CompareTo(b[0]));
        const int mod = (int)(1e9 + 7);
        var curEnd = -1;
        int ans = 1;
        foreach (var range in ranges)
        {
            var start = range[0];
            var end = range[1];
            if (curEnd < start)
            {
                ans = ans * 2 % mod;
            }
            curEnd = Math.Max(curEnd, end);
        }
        return ans;
    }
}