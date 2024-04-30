namespace L2798;

public class Solution
{
    public int NumberOfEmployeesWhoMetTarget(int[] hours, int target) => hours.Where((int item) => item >= target).Count();
}