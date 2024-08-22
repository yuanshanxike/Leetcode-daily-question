namespace L3133;

public class Solution {
    /// <summary>
    /// 自然数序列，二进制拆分，见缝插针
    /// </summary>
    /// <param name="n"></param>
    /// <param name="x"></param>
    /// <returns></returns>
    public long MinEnd(int n, int x) {
        long originMax = n - 1;
        long high = (long)Math.Log2(originMax);
        int j = 0;
        long last = x;
        for (int i = 0; i <= high; i++) {
            while (bit(last, j) == 1) {
                j++;
            }
            last |= bit(originMax, i) << j;
            j++;
        }
        return last;
    }

    private long bit(long num, int idx) {
        return (num & (1L << idx)) != 0 ? 1 : 0;
    }
}