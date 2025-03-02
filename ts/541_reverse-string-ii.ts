function reverseStr(s: string, k: number): string {
    const n = s.length
    const arr = s.split('')
    for (let i = 0; i < n; i += 2 * k) {
        let l = i, r = Math.min(i + k - 1, n - 1)
        while (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
            l++
            r--
        }
    }
    return arr.join('')
};

console.log(reverseStr("abcdefg", 2))
console.log(reverseStr("abcd", 2))
