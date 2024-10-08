namespace L3007;

public class Solution {
    /// <summary>
    /// 逐位构造：
    /// 因为题目要求的是最大“廉价数字”，意味着可以从最高位往下（从左往右）确定每一位设否能填 1.
    /// 先初始化一个和 num 二进制位数等长的，每一位都是 0 的二进制数字。
    /// 令当前从最左边(最高位)向右(低位方向)已经考察到了第 i 位（从低位(右边)开始数）, 假设已经确定的 i 的左边（更高位）方向，下标满足是“x 倍数”的位置中，已经被填为 1 的位置数量是 pre，
    /// 那么需要计算的是：如果当前的第 i 位取 1，会使得累计价值增加多少？
    /// *相当于要计算: i 处填 1 后，介于 [包含 pre 个有效 1] 0 [i-1 个 0] ~ [包含 pre 个有效 1] 1 [i-1 个 0] (左开右开) 之间的元素的有效下标位置所贡献的 1 的数量，加上如果 i 是“x 倍数”时所贡献的 1 个 1.
    /// 
    /// 可以以 i 为界，将增量分成左右两个部分，分别计算左右两个部分可以为累计价值贡献多少增量。
    /// ① 先不管 i 的左边部分，i 的右边“x 倍数”下标的位置都可以取 1，这些“有效”位置中，每个位置取 1 时，其他剩余位置可以随便取 0/1，对应着 2^(i-1) 种不同的取法，
    /// 也就是每个这样的位置能贡献 2^(i-1) 个 1。而且这样的有效位置有 ⌊ i / x ⌋ 个，所以累计会贡献 ⌊ i / x ⌋ * 2^(i-1) 个 1 的增量；
    /// ② 再来看 i 的左边部分，左边有效位置上的 1，无论 i 右边部分是什么数，都可以持续地为累计价值贡献 1。每个位置可以贡献 2^i 次，
    /// 有 pre 个这样的位置，所以总共可以贡献 pre * 2^i 个 1 的增量。
    /// 
    /// 上述的左右两个部分贡献的 1 的数量中，不包含如果 i 本身就是“x 倍数”位置时会贡献的 1 个 1.
    /// 把两个部分分别贡献的 1 的增量加起来，并考虑 i 本身的位置，可以得知：
    /// 从左往右把第 i(从右往左计) 个数 set 为 1 时，增量为 ⌊ i / x ⌋ * 2^(i-1) + pre * 2^i + (1 if (i + 1) % x == 0).
    /// 所以可以从最高位开始，不断去尝试 set 1，用增量去加上累计价值，看是否会超过 k 的限制，没有超则 set 1（构造尽可能大的数字的要求），并增加累计价值；
    /// 超越了，则跳过尝试下一位（更低位），直到尝试完最低位(i == 0).
    /// 
    /// 如何确定最高位？
    /// 可以构造一个一定满足“1 ~ num 的数字总价值”大于 k 的较大 num，num 对应的二进制位数 + 1，得到的一定是一个大于所需求解答案的数。
    /// 然后以这个二进制长度为模板，用上述的方法进行构造得到的就一定是比它更小的数，相当于在 0 到它之间找到合适的数字，而答案确实就在这个区间里面。
    /// 这个 num 可以取与 (k + 1) * 2^x 等长的二进制位数，因为 1 ~ (2k + 1) * 2^x 的所有数右移 x 位后，排除掉结果为 0 的数，一定还剩余 k + 1 个最低位是 1 的数（奇数）。
    /// </summary>
    /// <param name="k"></param>
    /// <param name="x"></param>
    /// <returns></returns>
    public long FindMaximumNumber(long k, int x) {
        long i = (long)Math.Log2((2 * k + 1) << x) + 1;
        long pre = 0;
        long ans = 0;
        for (; i >= 0; i--) {
            long val = (pre << (int)i) + (i / x << (int)i >> 1) + ((i + 1) % x == 0 ? 1 : 0);
            if (k >= val) {
                k -= val;
                ans += 1L << (int)i;
                if ((i + 1) % x == 0) pre++;
            }
        }
        return ans;
    }
}