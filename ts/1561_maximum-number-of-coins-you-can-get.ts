// /**
//  * 排序 + 双指针 + 贪心
//  * @param piles 
//  * @returns 
//  */
// function maxCoins(piles: number[]): number {
//     piles.sort((a, b) => a - b)
//     let left = 0, right = piles.length - 1
//     let res = 0
//     while (left < right) {
//         res += piles[right - 1]
//         right -= 2  // Alice 和 我 取最大的两堆
//         left += 1  // Bob 取最小的那堆
//     }
//     return res
// };

/**
 * 贪心的简洁写法
 * 要使得我取到的数量最大，Bob 最终一定是取了 piles 排序后的前 1 / 3，而 Alice 和 我 在更大的 2 / 3 中交替取
 * @param piles 
 */
function maxCoins(piles: number[]): number {
    piles.sort((a, b) => a - b)
    const n = piles.length
    let res = 0
    for (let i = n / 3; i < n; i += 2) {
        res += piles[i]
    }
    return res
}

console.log(maxCoins([2, 4, 1, 2, 7, 8]))
console.log(maxCoins([2, 4, 5]))
console.log(maxCoins([9, 8, 7, 6, 5, 1, 2, 3, 4]))
