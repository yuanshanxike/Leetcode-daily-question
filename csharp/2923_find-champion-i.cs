namespace L2923;

public class Solution {
    public int FindChampion(int[][] grid) {
        var n = grid.Length;
        var team = 0;
        for (int i = 0; i < n; i++)
        {
            if (i != team && grid[team][i] != 1) {
                team = i;
                // _ = i;  // 可以直接从 i + 1 继续向后遍历，因为 [0, i - 1] 都比 之前的team 弱，那也一定比 i 弱。（因为循环每次都会自动 +1，这里不需要对 i 进行操作）
            }
        }
        return team;
    }
}