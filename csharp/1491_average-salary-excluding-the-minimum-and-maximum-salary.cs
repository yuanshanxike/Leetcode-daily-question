namespace L1491;

public class Solution {
    public double Average(int[] salary) {
        var min = int.MaxValue;
        var max = int.MinValue;
        var sum = 0;
        foreach (var s in salary)
        {
            min = s < min ? s : min;
            max = s > max ? s : max;
            sum += s;
        }
        return Math.Round((double)(sum - min - max) / (salary.Length - 2), 5);
    }
}