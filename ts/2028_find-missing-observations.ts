function missingRolls(rolls: number[], mean: number, n: number): number[] {
    // 确定丢失数据和的上限和下限
    let m = rolls.length
    let sum = rolls.reduce((acc, point) => acc + point)
    let remain = (n + m) * mean - sum
    if (remain < n * 1 || remain > n * 6) return []
    // 分配丢失数据
    let avg = Math.floor(remain / n)
    let mod = remain % n
    let ans: number[] = []
    for (let i = 0; i < n; i++) {
        ans.push(avg)
    }
    let idx = 0
    while (mod--) {
        ans[idx++]++
    }
    return ans
};

console.log(missingRolls([3,2,4,3], 4, 2))
console.log(missingRolls([1,5,6], 3, 4))
console.log(missingRolls([1,2,3,4], 6, 4))
console.log(missingRolls([1], 3, 1))