/**
 * 因为 a, b 的取值范围在 [0, √c] 之间，
 * 因此直接 枚举 的时间复杂度为 O(√c) < 10^5, 能够通过。
 * a 和 b 具有对称关系，因此只需要枚举到 (a|b)^2 <= c/2 即可。
 * @param c 
 */
function judgeSquareSum(c: number): boolean {
    if (Number.isInteger(Math.sqrt(c))) return true
    
    for (let n = 1; n ** 2 <= c / 2; n++) {
        if (Number.isInteger(Math.sqrt(c - n ** 2))) return true
    }
    return false
};

console.log(judgeSquareSum(5))
console.log(judgeSquareSum(3))
console.log(judgeSquareSum(6))
console.log(judgeSquareSum(7))
console.log(judgeSquareSum(8))
console.log(judgeSquareSum(4294967296))