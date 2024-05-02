namespace L1997;

public class Solution {
    /**
     * 对于每个房间，初次访问都会进入到 nextVisit 数组中。
     * 通常要访问到最后一个房间，至少需要每间房间都访问两次。（当每间房间 nextVisit 都为自身房间号时）
     *
     * 对于任意一间房间，通过 nextVisit 访问到时，访问次数肯定会变为 odd，这与初次访问该房间时候的状态是完全一致的。
     * 所以我们可以在第一次访问房间时候，将 odd 次访问该房间到从该房间出去(此时次数为 even)到下一个房间所经历的天数(左开右闭)缓存下来，下次从后面的房间通过 nextVisit 访问到该房间时，
     * 直接读取以 odd 次访问这个房间时需要的天数即可。
     * 
     * 考虑到在 i 房间通过 nextVisited[i] 重新到达该房间后，[nextVisited[i], i) 的房间都需要计算 odd 次访问所需的天数，并求和。
     * 所以我们可以在遍历时直接记录下前缀和，通过不同前缀和相减求区间和，即可得到对应房间的 odd 次所需访问天数，然后又可以继续求前缀和...
     */
    public int FirstDayBeenInAllRooms(int[] nextVisit) {
        const int mod = (int)1e9 + 7;
        var n = nextVisit.Length;
        var prefix = new int[n - 1]; // 只计算到第 n - 2 项
        // nextVisit[0] must be 0
        var dSum = 2;
        prefix[0] = dSum;
        for (var i = 1; i < n - 1; i++)
        {
            var beforeNext = nextVisit[i] - 1;
            var cutdown = beforeNext < 0 ? 0 : prefix[beforeNext];
            var costDay = (prefix[i-1] - cutdown + 2) % mod; // +2：包括访问 nextVisit[i] 的一天 及 从第 i 间房间出去访问第 i+1 房间的一天
            costDay = costDay < 0 ? mod + costDay : costDay; // 减法得到负数时，需要用模减减去负数的绝对值，得到的才是正确的模
            dSum = (dSum + costDay) % mod;
            prefix[i] = dSum;
        }
        return prefix[^1];
    }
}