function removeTrailingZeros(num: string): string {
    const n = num.length
    let last = 0
    for (let i = n - 1; i >= 0; i--) {
        if (num[i] == '0') {
            last++
        } else break
    }
    return num.substring(0, n - last)
};

console.log(removeTrailingZeros('51230100'))
console.log(removeTrailingZeros('123'))