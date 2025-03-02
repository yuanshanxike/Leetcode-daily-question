/**
 * 滑动窗口 + 字符 hash 计数
 * @param word1 
 * @param word2 
 */
function validSubstringCount(word1: string, word2: string): number {
    const letterCntArr = Array(26).fill(0)
    let needMacthCnt = 0 // word2 中还需要匹配的字母种类数
    for (const letter of word2) {
        const pos = letter.charCodeAt(0) - 'a'.charCodeAt(0)
        if (letterCntArr[pos] == 0) {
            needMacthCnt++
        }
        letterCntArr[pos]++
    }

    const letterSet = Array(26).fill(0)
    let l = 0, r = 0  // [l, r)
    let cnt = 0
    const lIdx = (offset: number = 0) => word1[l + offset].charCodeAt(0) - 'a'.charCodeAt(0)
    let firstMatched = false
    while (r < word1.length) {
        const rIdx = word1[r].charCodeAt(0) - 'a'.charCodeAt(0)
        letterSet[rIdx]++
        r++

        if (letterSet[rIdx] == letterCntArr[rIdx]) {
            needMacthCnt--  // 随着滑动窗口的变大，需要匹配的字母种类数量一定不会变大。为了能正确维护“needMacthCnt”的数值，仅在某种字母在 word1 中出现的次数刚好等于在 word2 中出现的次数时，才去把还需匹配的字母种类数量 -1
        }

        if (needMacthCnt == 0) {  // 哈希匹配成功。一旦 needMacthCnt 变为 0，之后的滑动窗口操作一定会保证窗口对应的子字符串是符合要求的
            if (!firstMatched) {  // 第一次哈希匹配成功时进行数量统计
                cnt += word1.length - r + 1
                firstMatched = true
            }

            while (letterSet[lIdx()] - 1 >= letterCntArr[lIdx()]) {  // 之后只有当 l 发生变动(右移)时才进行数量统计（避免了子字符串的重复统计）
                letterSet[lIdx()]--
                l++

                cnt += word1.length - r + 1  // 当前滑动窗口对应的子字符串是符合要求的，再加上后面剩余字符串中的任意前缀也是符合要求的，这些情况都需要被统计
            }
        }
    }
    return cnt
};

console.log(validSubstringCount('bcca', 'abc'))
console.log(validSubstringCount('abcabc', 'abc'))
console.log(validSubstringCount('abcabc', 'aaabc'))

