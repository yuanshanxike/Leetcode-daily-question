/** 统计缺失的数字很容易能想到 哈希计数。
 * 如果数组中的数字没有缺失和重复，那么所有这些数字将会构成等差数列。
 * 因为同时也知道等差数列的最大和最小值，可以很方便地用求和公式得出原数列的和：
 * S = (1 + n^2) * n^2 / 2
 * 
 * 重复数字为 a，缺失数字为 b，通过遍历矩阵可以得到所有元素的累加和为 S'，那么有：
 * S' - a + b = S = (1 + n^2) * n^2 / 2
 * (其中，a 通过遍历时哈希计数得到)，可以求出 b
 */
function findMissingAndRepeatedValues(grid: number[][]): number[] {
    const n = grid.length
    let originalSum = (1 + n * n) * n * n / 2
    let set = new Set<number>()
    let a: number
    let sum = 0
    for (const arr of grid) {
        for (const x of arr) {
            if (set.has(x)) a = x
            else set.add(x)
            sum += x
        }
    }
    let b = originalSum - sum + a!!
    return [a!!, b]
};

console.log(findMissingAndRepeatedValues([[1,3],[2,2]]))
console.log(findMissingAndRepeatedValues([[9,1,7],[8,9,2],[3,4,6]]))

/** 还可以通过等差数列的平方和公式：S2 = n(n + 1)(2n + 1) / 6
 * 可得到 S'2 - a^2 + b^2 = S2
 * 进而可以计算出 a^2 - b^2 = (a + b) * (a - b) == S'2 - S2,
 * 上面已经计算出了 a - b = S' - S
 * 那么 a + b = (S'2 - S2) / (S' - S).
 * 联立两个式子就可以得到 a 和 b 的值
 */