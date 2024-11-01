/**
 * 回溯（因为数组对应位置元素可以被直接覆盖，不用恢复现场）
 * @param n 
 */
// function validStrings(n: number): string[] {
//     const ans: string[] = []
//     const path: number[] = []

//     function fillStrArr(i: number) {
//         if (i == n) {
//             ans.push(path.join(''))  // 注意 join 需要 O(n) 时间
//             return
//         }

//         path[i] = 1  // 填 1 没有限制
//         fillStrArr(i + 1)

//         if (i == 0 || path[i - 1] == 1) {
//             path[i] = 0   // 填 0 要求不能有连续
//             fillStrArr(i + 1)
//         }
//     }

//     fillStrArr(0)
//     return ans
// };

/**
 * 方法二：位运算
 * （省去 arr -> string join 的 O(n) 复杂度）
 */
function validStrings(n: number): string[] {
    const ans: string[] = []
    const mask = (1 << n) - 1
    for (let x = 0; x <= mask; x++) {
        if (((x >> 1) & x) === 0) {  // x 的二进制中没有相邻的 1
            const validStr = (x ^ mask).toString(2)  // 取反后得到的数没有相邻的 0
            ans.push(validStr.padStart(n, '0'))
        } 
    }
    return ans
}

console.log(validStrings(3))
console.log(validStrings(1))