namespace L1052;

public class Solution {
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes) {
        var ans = 0;
        var s = new int[customers.Length + 1]; /// s[i]：前 i-1 项和，但是老板不生气时，s[i] = s[i-1]
        s[0] = 0;
        for (int i = 0; i < customers.Length; i++)
        {
            var c = customers[i];
            if (grumpy[i] == 0) {
                ans += c;
                s[i + 1] = s[i];
            } else if (grumpy[i] == 1) {
                s[i + 1] = s[i] + c;
            }
        }
        var maxPlus = 0;
        for (int i = minutes; i <= customers.Length; i++)
        {
            maxPlus = Math.Max(maxPlus, s[i] - s[i - minutes]);
        }
        ans += maxPlus;
        return ans;
    }
}