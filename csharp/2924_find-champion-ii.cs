using Extension;

namespace L2924;

public class Solution {

    /// <summary>
    /// 原问题也可以说成是: 寻找入度为 0 的节点
    /// </summary>
    /// <param name="n"></param>
    /// <param name="edges"></param>
    /// <returns></returns>
    public int FindChampion(int n, int[][] edges) {
        var inDegreeArr = new bool[n];
        var nonRootNum = 0;
        foreach (var (_, to) in edges)
        {
            if (!inDegreeArr[to]) {
                nonRootNum++;
                inDegreeArr[to] = true;
            }
        }
        if (nonRootNum != n - 1) return -1;
        else 
        {
            int i;
            for (i = 0; i < n; i++)
            {
                if (!inDegreeArr[i]) break;
            }
            return i;
        }
    }

    // /// <summary>
    // /// 这种做法只适用于树，然而题目明确说了这是图
    // /// </summary>
    // /// <param name="n"></param>
    // /// <param name="edges"></param>
    // /// <returns></returns>
    // public int FindChampion(int n, int[][] edges) {
    //     // 找到所有叶子节点，并反向建图(因为树的每个节点有且只有一个父节点，所以可以直接用并查集那样的数组)
    //     var unionFindSet = new int[n];
    //     Array.Fill(unionFindSet, -1);
    //     var leafSet = new HashSet<int>();
    //     var nonLeafSet = new HashSet<int>();
    //     foreach (var (from, to) in edges)
    //     {
    //         unionFindSet[to] = from;
    //         nonLeafSet.Add(from);
    //         leafSet.Add(to);
    //     }

    //     int i = 0;
    //     for (; i < n; i++) {
    //         if (unionFindSet[i] == -1) break;
    //     }
    //     if (i == n) return -1; // 有向图一定存在环

    //     var champion = -1;
    //     foreach (var maybeLeaf in leafSet) // 移除假叶子节点(其实只需要从真叶子作为起点，开始查找就行)
    //     {
    //         // if (nonLeafSet.Contains(maybeLeaf)) leafSet.Remove(maybeLeaf);  // 实际不需要进行移除假叶子的操作
    //         if (!nonLeafSet.Contains(maybeLeaf)) // 所有真叶子
    //         {
    //             var leaf = maybeLeaf;
    //             for (; unionFindSet[leaf] != -1; leaf = unionFindSet[leaf]);
    //             if (champion == -1) champion = leaf;
    //             else if (champion != leaf) return -1;
    //         }
    //     }
    //     return champion;
    // }
}