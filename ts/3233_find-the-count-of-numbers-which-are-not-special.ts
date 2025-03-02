/**
 * 根据题目定义，容易知道：如果一个数 x 是“特殊数字”，当且仅当 √x 是质数。
 * 因为题目定义：“① 对于任何数字 x，x 的所有正因数（除了 x 本身）被称为 x 的 真因数；② 如果一个数字恰好仅有两个 真因数，则称该数字为 特殊数字”，
 * 正整数中，除了 1 以外的数字都至少有 1 和 其本身 两个因数，除去自身，1、2、3 都只有一个真因素，不是特殊数字。
 * 在 x >= 4 的数字中，如果 √x 是一个素数，√x 只能分解出 1 和 √x 两个因数，所以具体到 x 就只会有 1 和 √x 两个真因数。
 * 
 * 因为 √x 和 x 呈正相关，对于 [l, r], 先剔除 [1, 3], 得到 [l', r']，只需要求出 [√l', √r'] 中的素数数量 n, r - l + 1 - n 就是非特殊数字的数量。
 * 为了求出 [√l', √r'] 中素数的数量，可以使用 埃氏筛，分别求出 < √l' 的素数数量 n1，<= √r' 的素数数量 n2，n2 - n1 就是素数的数量。
 * @param l 
 * @param r 
 */
function nonSpecialCount(l: number, r: number): number {
    // 埃氏筛
    function lessOrEqualPrimeCnt(x: number) {
        let cnt = x - 1
        const isPrime: boolean[] = Array.from({ length: x + 1 }, () => true)
        for (let i = 2; i ** 2 <= x; i++) {
            if (isPrime[i]) {
                for (let j = i ** 2; j <= x; j += i) {
                    if (isPrime[j]) {
                        isPrime[j] = false
                        cnt--
                    }
                }
            }
        }
        return cnt
    }

    let primeCnt = -1
    if (r <= 3) {
        primeCnt = 0
    } else if (l <= 3) {
        primeCnt = lessOrEqualPrimeCnt(Math.floor(Math.sqrt(r))) - lessOrEqualPrimeCnt(Math.floor(Math.sqrt(3))) 
    } else {
        primeCnt = lessOrEqualPrimeCnt(Math.floor(Math.sqrt(r))) - lessOrEqualPrimeCnt(Math.floor(Math.sqrt(l - 1)))
    }
    return r - l + 1 - primeCnt
};

console.log(nonSpecialCount(5, 7))
console.log(nonSpecialCount(4, 16))
console.log(nonSpecialCount(1, 3))
console.log(nonSpecialCount(2, 3))
console.log(nonSpecialCount(1, 2))
console.log(nonSpecialCount(1, 8))
console.log(nonSpecialCount(1, 100))
console.log(nonSpecialCount(1, 1e9))  // 999996599