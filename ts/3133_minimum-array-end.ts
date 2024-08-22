/**
 * 根据 AND 不变大原理，已知所有元素最终 AND 结果是 x.
 * 可知数组中的最小元素一定是 x，并且其他的元素 & x == x，
 * 说明 x 中为 1 的 bit 位对应在其他元素中的相应位置也为 1.
 * 因为要求后一个元素要比前一个元素大，所以在保持上述位置为 1 的情况下，后面的数字可以从低位开始不断累加，相当于是构造一个自然序列，然后将序列中的元素的有效比特位拆分并填入到 x 中为 0 的比特位上去（从低到高）。
 * 相当于 x 中 bit == 1 的部分是实的，而 bit == 0 的位置是空，可以见缝插针。
 * 
 * 数组对应的序列（0，1，2，...，n - 1）的最后一个自然数是 n - 1，将 n - 1 的二进制见缝插针到 x 中即可。
 * 
 * 自然数序列，二进制拆分，见缝插针
 * 
 * @param n 
 * @param x 
 */
function minEnd(n: number, x: number): number {
    /******* 注意因为 js 一些机制的问题，number 如果使用到位运算会被 32 位截断，使用 bigint 才能正确计算，满足本题的数据范围 *******/
    const originMax: bigint = BigInt(n) - 1n
    let j = 0
    let last: bigint = BigInt(x)

    console.debug(`bit len: ${bitCount(originMax)}`)
    
    for (let i = 0; i < bitCount(originMax); i++) {
        while (bit(last, j)) {  // 找缝 (跳过 1，查找 0)
            j++
        }
        last |= bit(originMax, i) << BigInt(j)  // 插针
        j++
    }

    return Number(last)
};

function bitCount(num: bigint) {
    return num.toString(2).length
}

function bit(num: bigint, idx: number) {
    return num & (1n << BigInt(idx)) ? 1n : 0n
}

console.log(minEnd(3, 4))
console.log(minEnd(2, 7))
console.log(minEnd(100000000, 100000000))