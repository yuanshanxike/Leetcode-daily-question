function minChanges(n: number, k: number): number {
    if ((n & k) != k) return -1
    let ans = 0
    for (let i = 0; i <= 32 - Math.clz32(n); i++) {
        if (((n >> i) & 1) != ((k >> i) & 1)) {
            ans++
        }
    }
    return ans
};

console.log(minChanges(13, 4))
console.log(minChanges(21, 21))
console.log(minChanges(14, 13))