namespace L2952;

public class Solution
{
    /// <summary>
    /// 要使得，coins 数组中的所有数可以组成（或者相加得到） [1, target] 区间内的所有整数，
    /// 可以直接把 coins 中的数都写成 *二进制* 的形式，把 target 同样也写成 二进制。
    /// 
    /// 假设 (target)b 中的最高位为 1 的位数是 k，
    /// 很显然，如果我们的数组中有：2^0, 2^1, 2^2, ... , 2^k 这 k + 1 个数，每个 1 个的话，就能直接组合（子序列综合）成 [1, target] 区间内的所有整数。
    /// 
    /// 那么，原问题就转化为能否通过 coins 中的数组合出"2^0, 2^1, 2^2, ... , 2^k 这 k + 1 个数"？如果不能，要补充哪几个？
    /// 
    /// 但其实如果只是这么想的话，可能会掉入到某种思维陷阱里去！
    /// 
    /// 
    /// 做法：先对原数组进行排序，使得排序后的数组非递减；
    /// 首先看第一位，是否是 1，如果不是，需要往 conins 中添加 1；
    /// 然后循环遍历数组，并同时记录下前缀和（包括额外添加的元素），在遍历的过程中
    /// ** 不断计算区间([1, target])的右边界(target)，可以取到的理论最大值（计算方法为：当前规模的右边界 * 2 + 1）,记为 maxNext。即：maxNext = target * 2 + 1 **
    /// ** 如果 coins 包含下一个元素的*前缀和(实际可取到的右边界)*，记为 prefix，有：prefix <= maxNext，说明下一个数可以这直接加入到规模中，即：[1, prefix] 合法，其中所有元素均可被组合出来。然后 target = prefix。**
    /// ** 如果 prefix > maxNext 说明在当前规模下扩展右边界需要额外加数据，这个数值等于 maxNext - target(当前的) （实际编码不用计算加入的数）。然后 target = maxNext。**
    /// ** 数组遍历完成后，如果有题目的 target <= 区间右边界，则直接返回额外的添加计数；如果 target > 区间右边界，则继续按"理论最大值"取区间右边界，直到右边界第一次比题目 target 大，返回添加计数。 **
    /// 
    /// 问：怎么得出“每次在当前规模，加入任意一个数，区间的右边界可以 maxNext = target * 2 + 1 ” ？
    /// 解释：当前规模下，一定满足 [1, target] 中每一个整数可以通过组合得到，如果再算上空集，我们可以得到的范围+1，变为 [0, target],
    ///      target 对应着所有元素相加，也就是前缀和。现在如果新加入一个元素（记为 Δ），那么新区间可以变成 [0, target] ∪ [Δ, target + Δ] （当子序列不选 Δ 时区间就是前者）。
    ///      如何使得这个并集最大呢，那就是它们*互不相交*时，并且要求是连续区间。所以理想情况下 Δ = target + 1。
    /// 
    /// 问2：排序的作用是什么？
    /// 答：防止因为较小的数（<= maxNext - target）在后面而导致前面添加了冗余数据（添加计数变多）。
    /// </summary>
    /// <param name="coins"></param>
    /// <param name="target"></param>
    /// <returns></returns>
    public int MinimumAddedCoins(int[] coins, int target)
    {
        Array.Sort(coins);
        var n = coins.Length;
        var addCount = 0;
        int i = 0;
        if (coins[0] != 1)
        {
            addCount++;  // add 1
        }
        else
        {  // coins[0] == 1
            i = 1;  // skip [0]
        }
        var prefix = 1L; // must include 1
        for (; i < n; i++)
        {
            var maxVal = prefix * 2 + 1;
            if (maxVal >= prefix + coins[i])
            {
                prefix += coins[i];
            }
            else
            {
                prefix += maxVal - prefix; // add new num
                addCount++;
                i--;  // don't moving forward
            }
        }

        while (prefix < target)
        {
            prefix = prefix * 2 + 1;
            addCount++;
        }
        return addCount;
    }
}