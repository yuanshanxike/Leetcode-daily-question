/**
 * 定义 dp[i][j] 为前 i 个位置使用 j 块地毯覆盖后剩余的白色瓷砖的最小数量。
 * 每一块砖块要么被覆盖，要么被保留。
 * 状态转移方程：
 * dp[i][j] = Math.min(dp[i - 1][j] + (floor[i] === '1' ? 1 : 0), dp[i - carpetLen][j - 1])  // 不使用地毯覆盖当前位置，或者使用地毯覆盖当前位置
 * 初始化：从左往右遍历 ，如果还没有遇到白色瓷砖，则 dp[i][0] = 0，否则 dp[i][0] = 当前遇到的白色瓷砖数量。同时 dp[k][1] = 0 (k < carpetLen)
 * 
 * @param floor 
 * @param numCarpets 
 * @param carpetLen 
 * @returns 
 */
function minimumWhiteTiles(floor: string, numCarpets: number, carpetLen: number): number {
    const n = floor.length
    if (numCarpets * carpetLen >= n) return 0  // 如果地毯数量乘以地毯长度大于等于砖块数量，说明可以覆盖全部砖块（不论黑白），则直接返回 0
    const dp = Array.from({ length: n }, () => new Array(numCarpets + 1).fill(0))
    let whiteCount = 0
    for (let i = 0; i < n; i++) {
        whiteCount += floor[i] === '1' ? 1 : 0
        dp[i][0] = whiteCount
    }
    for (let i = carpetLen; i < n; i++) {
        for (let j = 1; j <= numCarpets; j++) {
            dp[i][j] = Math.min(dp[i - 1][j] + (floor[i] === '1' ? 1 : 0) /* j 块地毯全部用于前 i 个砖块 */, dp[i - carpetLen][j - 1] /* 使用 j - 1 块地毯覆盖前 i - carpetLen 个砖块，然后使用 1 块地毯覆盖剩下的 carpetLen 个砖块 */)
        }
    }
    return dp[n - 1][numCarpets]
};

console.log(minimumWhiteTiles("10110101", 2, 2))
console.log(minimumWhiteTiles("11111", 2, 3))