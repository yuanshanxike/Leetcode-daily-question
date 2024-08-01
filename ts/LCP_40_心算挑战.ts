/**
//  * 规则是选取卡牌的数字总和为偶数时得分有效，那么为了使得得分有效，每次选择的数字为奇数的卡牌数量必定为偶数张。
//  * 
//  * cnt 为奇数时，假设选了 2N (N = 0, 1, 2, ..., (cnt - 1) / 2) 张奇数卡，偶数卡的数量为 cnt - 2N；
//  * cnt 为偶数时，假设选了 2N (N = 0, 1, 2, ..., cnt / 2) 张奇数卡，偶数卡的数量为 cnt - 2N。
//  * 
//  * 可见如果是要选择奇数卡牌的话，总是会以每次 2 张为单位（原子操作）进行选择的，
//  * 而对于偶数卡的选择，不会因为选择的数量而影响到得分的有效性，每次以 1 张为单位进行选择即可。
//  * 
//  * 递减排序后，延迟选择，将数字分奇偶，加入答案前设置一级缓存，奇数筹够两个一起放进去，偶数遇到新的才将缓存里面的放进去。
 * 
 * 这样做需要考虑“反悔贪心”，以上没有这层考虑的做法在处理 maxmiumScore([1,2,6,8,9], 3) 这样的数据时会得出错误的结果。
 * 
 * @param cards 
 * @param cnt 
 */
// function maxmiumScore(cards: number[], cnt: number): number {
//     let s = 0

//     cards.sort((a, b) => b - a)

//     let lastOdd = 0, lastEven = 0 // 奇数、偶数的一级缓存
//     for (const card of cards) {
//         if (card % 2 == 1) {  // 奇数
//             if (lastOdd == 0) {
//                 lastOdd = card
//             } else if (cnt > 1) {  // 防止多放奇数
//                 s += card + lastOdd  // 当前最大的两个奇数同时放入
//                 lastOdd = 0  // 奇数缓存变为空
//                 cnt -= 2
//             }
//         } else {  // 偶数
//             if (lastEven == 0) {
//                 lastEven = card
//             } else {
//                s += lastEven    // 放入当前最大的偶数
//                lastEven = card  // 缓存次大的偶数作为之后最大的偶数
//                cnt-- 
//             }
//         }
//         if (cnt == 1 && lastEven != 0) { // 只剩 1 个数字待放入时，只能放入偶数，查看偶数缓存
//             s += lastEven
//             cnt--
//         }
//         if (cnt == 0) return s  // 选够有效的卡牌后结束循环，直接返回结果
//     }

//     return 0  // 循环结束可能出现放不满(差着一个偶数或奇数)的情况，表示找不到有效的方案，返回 0
// };

/**
 * 排序后先取前(最大的) cnt 个数求和 s，
 * 如果 s 为偶数，符合题目要求的有效分数，直接返回；
 * 如果 s 为奇数，有两种可选做法使得分数变成偶数，且保证 s 变小后尽可能大：
 * ① 从选取的数中剔除一个最小的奇数，然后从未选的数中加入一个最大的偶数；
 * ② 从选取的数中剔除一个最小的偶数，然后从未选的数中加入一个最大的奇数。
 * 从两种做法中选择得到偶数最大的。
 * @param cards 
 * @param cnt 
 */
function maxmiumScore(cards: number[], cnt: number): number {
    cards.sort((a, b) => b - a)
    const upper = cards[0] + 1
    const lower = 0
    let minOdd = upper, minEven = upper
    const sum = cards.slice(0, cnt).reduce((acc, val) => {
        if (val % 2 == 1) {
            minOdd = Math.min(minOdd, val)
        } else {
            minEven = Math.min(minEven, val)
        }
        return acc + val
    }, 0)
    if (sum % 2 == 0) return sum
    else {
        let nextOdd = lower, nextEven = lower
        for (let i = cnt; i < cards.length; i++) {
            if (nextOdd != lower && nextEven != lower) break
            if (nextEven == lower && cards[i] % 2 == 0) nextEven = cards[i]
            if (nextOdd == lower && cards[i] % 2 == 1) nextOdd = cards[i]
        }

        let s = 0
        
        if (nextEven != lower && minOdd != upper) {
            s = Math.max(s, sum - minOdd + nextEven)
        }

        if (nextOdd != lower && minEven != upper) {
            s = Math.max(s, sum - minEven + nextOdd)
        }

        return s
    }
}

console.log(maxmiumScore([1,2,8,9], 3))
console.log(maxmiumScore([1,6,8,9], 3))
console.log(maxmiumScore([1,2,6,8,9], 3)) // 18 [1, 8, 9]  leetcode 上缺少这样的测试数据，导致上面“设置一级缓存”这样有缺陷的做法也能 AC
console.log(maxmiumScore([3,3,1], 1))
console.log(maxmiumScore([2,4,1], 1))
console.log(maxmiumScore([2,4,2], 3))
console.log(maxmiumScore([2,4,1], 3))
console.log(maxmiumScore([2,4,1,1,1], 3))  // 6 [4, 1, 1]
console.log(maxmiumScore([2,4,1,1,2], 3))  // 8
console.log(maxmiumScore([3,3,1], 2))
console.log(maxmiumScore([3,3,1], 3))