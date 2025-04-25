function countPrefixes(words: string[], s: string): number {
    const prefixSet = new Set<string>()
    for (let i = 1; i <= s.length; i++) {
        prefixSet.add(s.slice(0, i))
    }
    let ans = 0
    for (const word of words) {
        if (prefixSet.has(word)) {
            ans += 1
        }
    }
    return ans
};

console.log(countPrefixes(["a","b","c","ab","bc","abc"], "abc"))
console.log(countPrefixes(["a","a"], "aa"))