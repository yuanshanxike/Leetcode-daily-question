/**
 * 通过组合数计算杨辉三角指定行
 * @param rowIndex 
 */
function getRow(rowIndex: number): number[] {
    const res: number[] = []
    for (let i = 0; i <= rowIndex; i++) {
        res.push(combine(rowIndex, i))
    }
    return res
};

function combine(n: number, m: number): number {
    if (m > Math.floor(n / 2)) m = n - m
    let bigRank = 1n
    for (let i = n; i >= n - m + 1; i--) {
        bigRank *= BigInt(i)
    }
    let smallRank = 1n
    for (let i = m; i >= 2; i--) {
        smallRank *= BigInt(i)
    }
    return Number(bigRank / smallRank)
}

console.log(getRow(3))
console.log(getRow(0))
console.log(getRow(1))
console.log(getRow(31))
console.log(getRow(33))