// function similarPairs(words: string[]): number {
//     const map = new Map<string, number>()
//     for (const word of words) {
//         const sortedWord = Array.from(new Set(word.split(''))).sort().join('')
//         map.set(sortedWord, (map.get(sortedWord) || 0) + 1)
//     }
//     return Array.from(map.values()).reduce((acc, curr) => acc + curr * (curr - 1) / 2, 0)   // 累加每种字符串对应数量的 nC2
// };

// 使用位运算来优化 set 和 string
function similarPairs(words: string[]): number {
    const map = new Map<number, number>()
    for (const word of words) {
        let mask = 0
        for (const char of word) {
            mask |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0))
        }
        map.set(mask, (map.get(mask) || 0) + 1)
    }
    return Array.from(map.values()).reduce((acc, curr) => acc + curr * (curr - 1) / 2, 0)
};



console.log(similarPairs(["aba", "aabb", "abcd", "bac", "aabc"]))
console.log(similarPairs(["aabb", "ab", "ba"]))