namespace L1652;

public class Solution
{
    // 方法一：前缀和
    public int[] Decrypt(int[] code, int k)
    {
        if (k == 0)
        {
            Array.Fill(code, 0);
            return code;
        }
        var n = code.Length;
        var s = new int[n + 1];
        s[0] = 0;
        for (int i = 1; i <= n; i++)
        {
            s[i] = s[i - 1] + code[i - 1];
        }
        for (int i = 0; i < n; i++)
        {
            var tk = k;
            var idx = tk < 0 ? ((i - 1) % n + n) % n : (i + 1) % n;
            var sum = 0;
            while (tk != 0)
            {
                if (tk < 0)
                {
                    if (tk + idx < 0)
                    {
                        sum += s[idx + 1];
                        tk += idx + 1;
                        idx = n - 1;
                    }
                    else
                    {
                        sum += s[idx + 1] - s[idx + tk + 1];
                        tk = 0;
                    }
                }
                else
                {  // tk > 0
                    if (tk + idx >= n)
                    {
                        sum += s[n] - s[idx];
                        tk -= n - idx;
                        idx = 0;
                    }
                    else
                    {
                        sum += s[idx + tk] - s[idx];
                        tk = 0;
                    }
                }
            }
            code[i] = sum;
        }
        return code;
    }

    // 方法二：滑动窗口
    public int[] Decrypt2(int[] code, int k)
    {
        int n = code.Length;
        int[] ans = new int[n];
        int r = k > 0 ? k + 1 : n;
        k = Math.Abs(k);
        int s = 0;
        for (int i = r - k; i < r; i++)
        {
            s += code[i]; // 计算 ans[0]
        }
        for (int i = 0; i < n; i++) // 通过不断滑动窗口进行计算
        {
            ans[i] = s;
            s += code[r % n] - code[(r - k) % n];
            r++;
        }
        return ans;
    }
}