namespace L3106;

public class Solution
{
    public string GetSmallestString(string s, int k)
    {
        int len = s.Length;
        var ans = new char[len];
        for (int i = 0; i < len; i++)
        {
            char c = s[i];
            if (k > 0)
            {
                int dist = c - 'a';
                if (dist > ('z' - 'a') / 2) dist = 'z' - c + 1;

                if (k >= dist)
                {
                    c = 'a';
                    k -= dist;
                }
                else
                {
                    c = (char)(c - k);
                    k = 0;
                }
            }
            ans[i] = c;
        }
        return new string(ans);
    }
}