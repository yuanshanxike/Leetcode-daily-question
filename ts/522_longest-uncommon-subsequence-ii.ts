namespace L522 {
    function findLUSlength(strs: string[]): number {
        const hashMap: Record<string, number> = {} // 记录相同字符串出现的重复次数
        for (const str of strs) {
            if (hashMap[str]) {
                hashMap[str]++
            } else {
                hashMap[str] = 1
            }
        }
        const pairs: [string, number][] = []
        for (const key in hashMap) {
            pairs.push([key, hashMap[key]])
        }
        pairs.sort(([s1], [s2]) => s2.length - s1.length)
        if (pairs[0][1] == 1) return pairs[0][0].length
        let ans = -1
        for (let i = 0; i < pairs.length; i++) {
            let [s, n] = pairs[i]
            if (n != 1) continue
            for (let j = 0; j < i; j++) {
                let [str] = pairs[j]
                if (isSubsequence(str, s)) {
                    ans = -1
                    break
                } else {
                    ans = s.length
                }
            }
            if (ans != -1) break
        }
        return ans
    };
    
    function isSubsequence(str: string, s: string): boolean {
        let pos = 0
        let ans = true
        for (const c of s) {
            const newPos = str.indexOf(c, Math.max(pos, 0))
            if (newPos < pos) {
                ans = false
            }
            pos = newPos + 1
        }
        return ans
    }

    console.log(findLUSlength(['aba','cdc','eae'])) // 3
    console.log(findLUSlength(['aaa','aaa','aa']))  // -1
    console.log(findLUSlength(['aaa','aa','aaa']))  // -1
    console.log(findLUSlength(['aabbcc','aabbcc','cb']))  // 2
    console.log(findLUSlength(['bbbb','bbbb','aa','a']))  // 2
    console.log(findLUSlength(['aabbcc','aabbcc','cb','abc']))  // 2
    console.log(findLUSlength(['aabbcc','aabbcc','bc','bcc','aabbccc']))  // 7
    console.log(findLUSlength(["abcabc","abcabc","abcabc","abc","abc","aab"]))  // -1
    console.log(findLUSlength(["abaa","abaa","eaec","eaec","eae","z"]))  // 1
}