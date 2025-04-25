// /**
//  * 前后缀分解
//  * @param s 
//  */
// function minimumCost(s: string): number {
//     const n = s.length
//     let lastBit = '#'
//     let curCost = 0, lastCost = 0
//     const preCosts: number[] = []
//     for (let i = 0; i < n; i++) {
//         const c = s[i]
//         if (c != lastBit) {
//             if (lastBit != '#') lastCost = preCosts[i - 1]
//             lastBit = c
//         }
//         curCost = i + 1 + lastCost
//         preCosts.push(curCost)
//     }

//     lastBit = '#'
//     curCost = lastCost = 0
//     const sufCosts = Array(n).fill(0)
//     for (let i = n - 1; i >= 0; i--) {
//         const c = s[i]
//         if (c != lastBit) {
//             if (lastBit != '#') lastCost = sufCosts[i + 1]
//             lastBit = c
//         }
//         sufCosts[i] = n - i + lastCost
//     }

//     let min = Infinity
//     // 双指针
//     let r = 0
//     for (let l = r; l < n; l = r) {
//         // if (s[l] == '0') {
//         //     r++
//         //     continue
//         // }

//         // r = l
//         while (r < n && s[l] == s[r]) {
//             r++
//         }
//         min = Math.min(min, (l > 0 ? preCosts[l - 1] : 0) + (r < n ? sufCosts[r] : 0))
//     }

//     return min
// };

/**
 * 脑筋急转弯
 * 
 * 注意到两个相邻的字符，如果不相同，可以以这两个字符的中心为分界，选择左边或右边进行反转，然后得到相同的两个相邻字符。
 * 同时，在对一段字符进行反转时，对于相邻两个字符，原本如果就相同，反转后仍然保持相同；如果原本就不同，那么反转后仍然不同。
 * 所以对于不同的相邻两个字符，我们必然对其一边进行反转。每次只要贪心地选择字符串长度最短的一边进行反转，就能够保证最终达成一致所需的消耗最小。
 * @param s 
 * @returns 
 */
function minimumCost(s: string): number {
    let cost=0;
    for(let i = 1; i < s.length; i++) {
        if(s[i] !== s[i - 1]) {
            cost += Math.min(i, s.length - i);
        }
    }
    return cost;
};

console.log(minimumCost('0011'))
console.log(minimumCost('010101'))
console.log(minimumCost('010101000111001'))