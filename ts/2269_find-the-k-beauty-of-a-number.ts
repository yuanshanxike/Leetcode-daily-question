function divisorSubstrings(num: number, k: number): number {
    const origin = num
    const mod = 10 ** k
    let ans = 0
    while (num != 0 && `${num}`.length >= k) {
        const divide = num % mod
        if (origin % divide == 0) ans++
        num = Math.floor(num / 10)
    }
    return ans
};

console.log(divisorSubstrings(240, 2))
console.log(divisorSubstrings(430043, 2))
console.log(divisorSubstrings(2, 1))
