namespace L1329;

public class Solution
{
    public int[][] DiagonalSort(int[][] mat)
    {
        var n = mat.Length;
        var m = mat[0].Length;
        for (int i = 0; i < n; i++) {
            var delta = Math.Min(n - i, m);
            QuickSort(mat, 0, i, delta - 1);
        }
        for (int j = 1; j < m; j++) {
            var delta = Math.Min(m - j, n);
            QuickSort(mat, j, 0, j + delta - 1);
        }
        return mat;
    }

    private static void QuickSort(int[][] mat, int l, int t, int r)
    {
        if (l >= r) return;
        var pivot = mat[t][l];
        int i = l, j = r, offset = l - t;
        while(i <= j) {
            var needSwitch = 0;
            if (mat[i - offset][i] <=  pivot) i++; else needSwitch++;
            if (mat[j - offset][j] >= pivot) j--; else needSwitch++;
            if (needSwitch == 2) (mat[i - offset][i], mat[j - offset][j]) = (mat[j - offset][j], mat[i - offset][i]);
        }
        // put pivot to right place
        (mat[t][l], mat[j - offset][j]) = (mat[j - offset][j], mat[t][l]);
        // handle left subinterval
        QuickSort(mat, l, t, j - 1);
        // handle right subinterval
        QuickSort(mat, j + 1, j + 1 - offset, r);
    }
}