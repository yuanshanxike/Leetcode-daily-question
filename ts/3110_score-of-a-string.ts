function scoreOfString(s: string): number {
    let lastAscii = -1, ans = 0
    for (const chr of s) {
        if (lastAscii != -1) {
            ans += Math.abs(chr.charCodeAt(0) - lastAscii)
        }
        lastAscii = chr.charCodeAt(0)
    }
    return ans
};

console.log(scoreOfString('hello'))
console.log(scoreOfString('zaz'))