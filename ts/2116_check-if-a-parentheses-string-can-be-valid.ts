/**
 * 把左括号当成 1，右括号当成 -1，前缀和要始终为 >= 0 合法。
 * 如果遇到前缀和小于 0，查看对应 locked 是否为 0，如果为 0，前缀和 +2;
 * 否则返回 false
 * @param s 
 * @param locked 
 */
// function canBeValid(s: string, locked: string): boolean {
//     const n = s.length
//     let needChange = false
//     const prefix = Array(n).fill(0)
//     for (let i = 0; i < n; i++) {
//         const c = s[i]
//         if (c == '(') {
//             prefix[i] = (prefix[i - 1] || 0) + 1
//         } else {
//             prefix[i] = (prefix[i - 1] || 0) - 1
//         }

//         if (prefix[i] < 0) needChange = true

//         // if (prefix[i] < 0) {
//         //     if (locked[i] == '1') {
//         //         console.debug('return < 0')
//         //         return false
//         //     }
//         //     else prefix[i] += 2  // ')' => '('
//         // }
//     }

//     console.debug(prefix)

//     if (prefix[n - 1] == 0 && !needChange) return true

//     if (prefix[n - 1] % 2 != 0) return false
//     const needReduceTimes = prefix[n - 1]
//     let delta = 0
//     for (let i = 0; i < n; i++) {
//         if (prefix[i] < 0) {
            
//         } 
//     }

//     // if (prefix[n - 1] % 2 != 0) return false  // 通过改变括号不能使得 valid = 0
//     // else if (prefix[n - 1] == 0) return true

//     // 如果 valid > 0, 需要从前面（包括最后一个 s 的字符中）找 valid / 2 个 '(' 变为 ')', 这些位置需要满足 prefix[i] - 2 * m >= 2
//     // let degression = 0
//     // for (let i = 0; i < n; i++) {
//     //     if (prefix[i] >= degression + 2 && locked[i] == '0') {
//     //         degression += 2
//     //     }
//     // }

//     // return prefix[n - 1] == degression
// };

// /**
//  * 
//  * @param s 
//  * @param locked 
//  */
// function canBeValid(s: string, locked: string): boolean {
//     const n = s.length

//     if (n % 2 == 1) return false  // 首先排除奇数长度的 s，这不可能正确匹配括号使得有效

//     let valid = 0
//     const prefixSums: number[] = []
//     const plusIdxes: number[] = []
//     const minusIdxes: number[] = []
//     for (let i = 0; i < n; i++) {
//         if (s[i] == '(') {
//             valid++
//             if (locked[i] == '0') minusIdxes.push(i)
//         } else {
//             valid--
//             if (locked[i] == '0') plusIdxes.push(i)
//         }

//         prefixSums.push(valid)
//     }

//     // console.debug(prefixSums)
//     // console.debug(`plus: ${plusIdxes}`)
//     // console.debug(`minus: ${minusIdxes}`)

//     const min = Math.min(... prefixSums)
//     const minIdx = prefixSums.indexOf(min)
//     // 找到所有元素 >= prefixSums[n - 1] 的最长后缀
//     // let j = n - 1
//     // while (j >= 0 && prefixSums[j] >= prefixSums[n - 1]) {
//     //     j--
//     // }
//     // const plusStartIdx = j + 1

//     // 先升
//     let plus = 0, cursor = 0
//     if (min < 0) {
//         let i = 0
//         while (plusIdxes[i] <= minIdx && plus + min < 0) {
//             // console.debug('升')
//             cursor = plusIdxes[i++]
//             plus += 2
//         }
//         if (plus + min < 0) return false
//     }
//     // console.debug(plus)
//     // console.debug(minIdx)

//     for (let i = n - 1; i >= 0; i--) {
//         if (prefixSums[i] == min) {
//             cursor = i
//             break
//         }
//     }

//     // 再降
//     if (prefixSums[n - 1] + plus == 0) return true
//     else {  // prefixSums[n - 1] + plus > 0
//         // cursor = Math.max(cursor, plusStartIdx)
//         // console.debug(`cursor: ${cursor}`)
//         let minus = 0
//         for (let i = 0; i < minusIdxes.length; i++) {
//             if (minusIdxes[i] >= cursor && prefixSums[minusIdxes[i]] + plus >= -minus + 2) {
//                 minus -= 2
//                 if (prefixSums[n - 1] + plus + minus == 0) return true
//             }
//         }
//         return false
//     }
    

//     // // 求 prefixSums 的后缀最小值
//     // let min = Infinity
//     // const suffixMins = Array(n).fill(Infinity)
//     // for (let i = n - 1; i >= 0; i--) {
//     //     min = Math.min(min, prefixSums[i])
//     //     suffixMins[i] = min
//     // }

//     // if (suffixMins[0] == 0 && prefixSums[n - 1] == 0) return true

//     // if (suffixMins[0] < 0) {
//     //     let idx = prefixSums.indexOf(suffixMins[0])

//     // }
// }

/**
 * 逆向思维
 * @param s 
 * @param locked 
 * @returns 
 */
function canBeValid(s: string, locked: string): boolean {
    const n = s.length
    
    // 奇数长度不可能有效
    if (n % 2 === 1) return false
    
    // 从左到右检查：确保任意位置(所有前缀)不会有过多的右括号
    let open = 0, close = 0, free = 0
    for (let i = 0; i < n; i++) {
        if (locked[i] === '0') {
            free++
        } else if (s[i] === '(') {
            open++
        } else {
            close++
        }
        
        // 如果右括号数量超过左括号+自由位置，则无法平衡
        if (close > open + free) return false
    }
    
    // 从右到左检查：确保任意位置(所有后缀)不会有过多的左括号
    open = 0; close = 0; free = 0
    for (let i = n - 1; i >= 0; i--) {
        if (locked[i] === '0') {
            free++
        } else if (s[i] === ')') {
            close++
        } else {
            open++
        }
        
        // 如果左括号数量超过右括号+自由位置，则无法平衡
        if (open > close + free) return false
    }
    
    return true
};

console.log(canBeValid('))()))', '010100'))
console.log(canBeValid('()()', '0000'))
console.log(canBeValid(')', '0'))
console.log(canBeValid('(((())(((())', '111111010111'))
console.log(canBeValid('(((())', '111111'))
console.log(canBeValid(')(', '00'))
console.log(canBeValid('())()))()(()(((())(()()))))((((()())(())', '1011101100010001001011000000110010100101'))