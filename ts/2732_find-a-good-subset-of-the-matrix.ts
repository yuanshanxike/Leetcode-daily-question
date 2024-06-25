/**
 * 可以证明：当存在多行(行数 > 2)满足答案。那么一定可以在这其中一定可以找出 1行 或者 2行 可以满足要求的答案。
 * 所以其实只需要找出矩阵中，是否存在 1行 或 2行 满足要求的答案即可。
 * 1 <= n <= 5, 可以把矩阵的每一行看作一个二进制数，
 * 一行满足条件，当且仅当这个二进制数等于 0；
 * 任意两行满足条件，当且仅当这两行的二进制数 AND 后的结果为 0.
 * 二进制数的数量至多有 2^n <= 32 个不同的可能，而行数 m <= 10^4 远大于 32。所以可以使用哈希表存储不同二进制数对应的行数列表。
 * @param grid 
 */
function goodSubsetofBinaryMatrix(grid: number[][]): number[] {
    const m = grid.length, n = grid[0].length
    const hash: number[][] = Array<number[]>(1 << n)
    for (let i = 0; i < m; i++) {
        const row = grid[i]
        let num = 0
        for (const b of row) {
            num <<= 1
            num += b
        }
        if (hash[num]) hash[num].push(i)
        else hash[num] = [i]
    }
    if (hash[0]) return [hash[0][0]]
    const toplimit = 1 << n
    for (let i = 1; i < toplimit; i++) {
        if (!hash[i]) continue
        for (let j = i + 1; j < toplimit; j++) {
            if (!hash[j]) continue

            if ((i & j) == 0) {
                const a = hash[i][0]
                const b = hash[j][0]
                return a <= b ? [a, b] : [b, a]
            }
        }
    }
    return []
};

console.log(goodSubsetofBinaryMatrix([[0,1,1,0],[0,0,0,1],[1,1,1,1]]))
console.log(goodSubsetofBinaryMatrix([[0]]))
console.log(goodSubsetofBinaryMatrix([[1,1,1],[1,1,1]]))