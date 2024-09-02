/** “滑动窗口”典型应用 */
function maxConsecutiveAnswers(answerKey: string, k: number): number {
    const n = answerKey.length

    function maxLen(c: string) {
        let l = 0, r = 0
        let skip = 0
        let maxLen: number = 0
        for (; r < n; r++) {
            if (answerKey[r] != c) skip++
            while (skip > k) {
                if (answerKey[l++] != c) skip--
            }
            if (skip == k) maxLen = Math.max(maxLen, r - l + 1)
        }
        maxLen = Math.max(maxLen, r - l)
        return maxLen
    }

    return Math.max(maxLen('T'), maxLen('F'))
};

console.log(maxConsecutiveAnswers("TTFF", 2))
console.log(maxConsecutiveAnswers("TFFT", 1))
console.log(maxConsecutiveAnswers("TTFTTFTT", 1))
console.log(maxConsecutiveAnswers("TF", 1))