function getSmallestString(s: string): string {
    const chrArr = [... s]
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i].charCodeAt(0) > s[i + 1].charCodeAt(0) && ((+s[i] ^ +s[i + 1]) & 1) == 0) {
            chrArr[i + 1] = s[i]
            chrArr[i] = s[i + 1]
            return chrArr.join('')
        }
    }
    return s
};

console.log(getSmallestString('45320'))
console.log(getSmallestString('001'))