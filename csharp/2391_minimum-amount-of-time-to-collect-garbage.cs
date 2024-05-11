namespace L2391;

public class Solution
{
    public int GarbageCollection(string[] garbage, int[] travel)
    {
        int sumM = 0, sumP = 0, sumG = 0;
        (int from, int to) pathM = (from: 0, to: 0), pathP = (from: 0, to: 0), pathG = (from: 0, to: 0);
        for (int i = 0; i < garbage.Length; i++)
        {
            foreach (var c in garbage[i])
            {
                switch (c)
                {
                    case 'M':
                        sumM++;
                        pathM.to = i;
                        break;
                    case 'P':
                        sumP++;
                        pathP.to = i;
                        break;
                    case 'G':
                        sumG++;
                        pathG.to = i;
                        break;
                }
            }
        }
        var s = new int[garbage.Length];
        s[0] = 0;
        for (int i = 1; i < garbage.Length; i++) {
            s[i] = s[i - 1] + travel[i - 1];
        }
        return s[pathM.to] - s[pathM.from] + s[pathP.to] - s[pathP.from] + s[pathG.to] - s[pathG.from] + sumM + sumP + sumG;
    }
}