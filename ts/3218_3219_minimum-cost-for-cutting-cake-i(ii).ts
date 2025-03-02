/**
 * 逆向思维（从 1 * 1 的小块考虑合成 m * n 的整块）+ 最小生成树（与合成整块蛋糕的最小消耗顺序匹配，Kruskal 算法）
 * 从小到大排序 horizontalCut 和 verticalCut，并用双指针分别操作两个排序后的数组，进行最小生成树的过程。
 * 算法详解：https://leetcode.cn/problems/minimum-cost-for-cutting-cake-ii/solutions/2843063/tan-xin-ji-qi-zheng-ming-jiao-huan-lun-z-ivtn
 * @param m 
 * @param n 
 * @param horizontalCut 
 * @param verticalCut 
 */
function minimumCost(m: number, n: number, horizontalCut: number[], verticalCut: number[]): number {
    horizontalCut.sort((a, b) => a - b)
    verticalCut.sort((a, b) => a - b)
    let ans = 0, i = 0, j = 0
    while (i < m - 1 || j < n - 1) {
        if (j == n - 1 || i < m - 1 && horizontalCut[i] < verticalCut[j]) {
            ans += horizontalCut[i++] * (n - j)  // 上下连边
        } else {
            ans += verticalCut[j++] * (m - i)  // 左右连边
        }
    }
    return ans
};

console.log(minimumCost(3, 2, [1,3], [5]))
console.log(minimumCost(2, 2, [7], [4]))