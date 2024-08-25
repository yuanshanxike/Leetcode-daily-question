function findPermutationDifference(s: string, t: string): number {
    const chrIdxMap: Record<string, number> = {}
    for (let i = 0; i < s.length; i++) {
        chrIdxMap[s[i]] = i
    }
    let ans = 0
    for (let i = 0; i < t.length; i++) {
        ans += Math.abs(i - chrIdxMap[t[i]])
    }
    return ans
};

console.log(findPermutationDifference('abc', 'bac'))
console.log(findPermutationDifference('abcde', 'edbac'))
console.log(findPermutationDifference('rwohu', 'rwuoh'))