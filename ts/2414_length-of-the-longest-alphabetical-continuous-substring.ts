function longestContinuousSubstring(s: string): number {
    const n = s.length
    let left = 0, right = 0
    let ans = 0
    while (right < n) {
        while (right < n - 1 && s.charCodeAt(right + 1) - s.charCodeAt(right) == 1) {
            right++
        }
        ans = Math.max(right - left + 1, ans)
        right++
        left = right
    }
    return ans
};

console.log(longestContinuousSubstring("abacaba"))
console.log(longestContinuousSubstring("abcde"))