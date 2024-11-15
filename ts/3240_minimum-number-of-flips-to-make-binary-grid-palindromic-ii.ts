namespace L3240 {
    /**
     * 要求所有的行和列都回文的话，考虑到每一个坐标的行和列都具有传导性，要求每一个坐标，与其回文(对称)的行和列上元素应与其值相等，
     * 最终导致以矩形的中心点为中心的所有子矩阵上的四个角上的点应该也是相等的，即：grid[i][j] == grid[n - 1 - i][j] == grid[i][m - 1 - j] == grid[n - 1 - i][m - 1 - j].
     * 每次统计四个角中 0 和 1 的数量，需要将数量少的一方进行数值翻转，累加到操作次数。
     * 此外，题目还要求 "矩阵中 1 的数目可以被 4 整除"，已知按照上面的方法操作之后，在能画出以原矩阵中心点为中心的矩阵的四个角所能覆盖的区域上肯定是可以保证 cnt(1) % 4 == 0 的。
     * 而且最终整个矩阵的所有元素会是呈中心对称的。那么，其实最后在校验 1 的数量能否被 4 整除时，我们只需要关注矩阵的“中间十字”上 1 的数量：
     * ① 首先，中心点一定需要是 0，因为如果是 1，1 的数量将会是奇数，则不能被 4 整除；
     * ② 挖去中心点的“十字”部分（如果存在），注意到在翻转数字时，既可以翻转其中的 1 得到两个 0，也可以翻转其中的 0 得到两个 1。
     * 那么在需要进行构建回文数字的翻转时，可以视“十字”区域中 1 pair 的数量，控制“翻转 0 得到两个 1”的次数，来和本来就存在的回文 1 pair 数凑齐偶数对，
     * 这样，“十字” 部分 1 的个数就能被 4 整除。
     * 
     * 结合以上 ① 和 ②，可以构建出来的矩阵就是 行列回文 并且 所包含的 1 的数量能被 4 整除
     * @param grid 
     */
    function minFlips(grid: number[][]): number {
        const n = grid.length, m = grid[0].length

        let times = n % 2 && m % 2 && grid[Math.floor(n / 2)][Math.floor(m / 2)] ? 1 : 0  // 翻转“十字中心”的 1
        // 中心点矩阵四角区
        for (let i = 0; i < Math.floor(n / 2); i++) {
            for (let j = 0; j < Math.floor(m / 2); j++) {
                const cnt = grid[i][j] + grid[n - 1 - i][j] + grid[i][m - 1 - j] + grid[n - 1 - i][m - 1 - j]
                times += Math.min(cnt, 4 - cnt)
            }
        }
        // 在“中间十字”上构建回文
        let onePair = 0
        let crossOptTimes = 0
        if (n % 2) {
            for (let j = 0; j < Math.floor(m / 2); j++) {
                const i = Math.floor(n / 2)
                if (grid[i][j] != grid[i][m - 1 - j]) {
                    crossOptTimes++
                } else if (grid[i][j] == 1) {
                    onePair++
                }
            }
        }
        if (m % 2) {
            for (let i = 0; i < Math.floor(n / 2); i++) {
                const j = Math.floor(m / 2)
                if (grid[i][j] != grid[n - 1 - i][j]) {
                    crossOptTimes++
                } else if (grid[i][j] == 1) {
                    onePair++
                }
            }
        }
        times += crossOptTimes
        if (onePair % 2 && crossOptTimes < 1) times += 2  // “中间十字”的操作次数不够去把 1 的数量变成 4 的整数倍

        return times
    };

    console.log(minFlips([[1,0,0],[0,1,0],[0,0,1]]))
    console.log(minFlips([[0,1],[0,1],[0,0]]))
    console.log(minFlips([[1],[1]]))
}