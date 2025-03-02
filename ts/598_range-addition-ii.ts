/**
 * ops 中的每一个区间都是包括左上角的，遍历 ops 时记录 ai 和 bi 的最小值（所有矩阵的交集），
 * 最后返回 ai * bi 即可
 * @param m 
 * @param n 
 * @param ops 
 */
function maxCount(m: number, n: number, ops: number[][]): number {
    let minA = m, minB = n
    for (const op of ops) {
        minA = Math.min(minA, op[0])
        minB = Math.min(minB, op[1])
    }
    return minA * minB
};

console.log(maxCount(3, 3, [[2, 2], [3, 3]]))
console.log(maxCount(3, 3, [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]))
console.log(maxCount(3, 3, []))