/**
 * 方法一：
 * 枚举滑动窗口长度进行统计
 * 时间复杂度：O(n^2)。可以通过 3305
 * @param word 
 * @param k 
 */
// function countOfSubstrings(word: string, k: number): number {
//     const vowels = ['a', 'i', 'u', 'e', 'o'] as const
//     type Vowel = typeof vowels[number]  // 'a' | 'i' | 'u' | 'e' | 'o'

//     function isVowel(c: string): c is Vowel {
//         return vowels.some((v) => v == c)
//     }

//     const n = word.length
//     const hashCnt: Record<Vowel, number> = {
//         'a': 0,
//         'i': 0,
//         'u': 0,
//         'e': 0,
//         'o': 0
//     }
//     const hasAllVowel = () => {
//         let res = true
//         for (const k in hashCnt) {
//             if (isVowel(k)) {
//                 res &&= hashCnt[k] > 0
//             }
//         }
//         return res
//     }

//     let ans = 0

//     for (let i = 5 + k; i <= n; i++) {
//         let consonantCnt = 0
//         let l = 0, r = 0
//         hashCnt.a = 0
//         hashCnt.i = 0
//         hashCnt.u = 0
//         hashCnt.e = 0
//         hashCnt.o = 0
//         while (r < n) {
//             let c = word[r]
//             if (isVowel(c)) {
//                 hashCnt[c]++
//             } else {
//                 consonantCnt++
//             }

//             if (r - l + 1 > i) {
//                 c = word[l]
//                 if (isVowel(c)) {
//                     hashCnt[c]--
//                 } else {
//                     consonantCnt--
//                 }
//                 l++
//             }

//             if (r - l + 1 == i) {
//                 ans += hasAllVowel() && consonantCnt == k ? 1 : 0
//             }
//             r++
//         }
//     }
//     return ans
// };

/**
 * 方法二：
 * 恰好型滑动窗口：转换成两个至少型滑动窗口
 * （其中一个滑动窗口为至少包含 k 个辅音字母，另一个滑动窗口为至少包含 k + 1 个辅音字母。两个滑动窗口都保证所有的元音字母至少出现一次）
 * 至少包含 k 个辅音字母的次数 - 至少包含 k + 1 个辅音字母的次数 = 恰好包含 k 个辅音字母的次数
 * 时间复杂度：O(n)
 * @param word 
 * @param k 
 */
function countOfSubstrings(word: string, k: number): number {
    const vowels = ['a', 'i', 'u', 'e', 'o'] as const
    type Vowel = typeof vowels[number]

    function isVowel(c: string): c is Vowel {
        return vowels.some((v) => v == c)
    }

    const n = word.length

    function countAtLast(k: number): number {
        const hashCnt = new Map<Vowel, number>()
        let consonantCnt = 0
        let l = 0
        let ans = 0
        for (let r = 0; r < n; r++) {
            const inChr = word[r]
            if (isVowel(inChr)) {
                hashCnt.set(inChr, (hashCnt.get(inChr) || 0) + 1)
            } else {
                consonantCnt++
            }

            // 维护滑动窗口，表示“恰好不满足‘至少’的数量要求”
            while (hashCnt.size == 5 && consonantCnt >= k) {
                const outChr = word[l]
                
                if (isVowel(outChr)) {
                    hashCnt.set(outChr, (hashCnt.get(outChr) || 0) - 1)
                    if (hashCnt.get(outChr) == 0) {
                        hashCnt.delete(outChr)
                    }
                } else {
                    consonantCnt--
                }

                l++
            }

            // 此时滑动窗口中的元素个数恰好不满足要求，l 在左边（之前）的位置时时满足要求的
            ans += l  // 左边 (0, 1, 2, 3, ..., l-1) 共 l 个位置到 r 的这些区间是满足“至少”的数量要求的。l == 0 的情况也适用，此时还没有找到符合要求的数量
        }
        return ans
    }

    return countAtLast(k) - countAtLast(k + 1)  // cnt(>= k) - cnt(>= k - 1) = cnt(k)
}

console.log(countOfSubstrings('aeioqq', 1))
console.log(countOfSubstrings('aeiou', 0))
console.log(countOfSubstrings('ieaouqqieaouqq', 1))
console.log(countOfSubstrings('iqeaouqi', 2))