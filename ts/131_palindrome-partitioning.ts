function partition(s: string): string[][] {
    const result: string[][] = []
    const path: string[] = []

    function isPalindrome(i: number, j: number): boolean {
        while (i < j) {
            if (s[i] !== s[j]) return false
            i++
            j--
        }
        return true
    }

    /**
     * 枚举选哪个
     * 思路：从字符串的第一个字符开始，找到所有合法的回文字符串 p，
     * 从 p 的后面进行切割。接下来，右边剩余的字符串相当于一个新的字符串，
     * 其左边被切割过的都已经是回文字符串了，所以继续进行上述操作。
     * 子问题和原问题相似，可以使用递归解决。
     * 
     * @param i 
     * @returns 
     */
    function dfs(i: number) {
        if (i === s.length) {
            result.push([...path])  // 最后一个被分割的字符串也是回文的，则将当前路径加入结果
            return
        }

        for (let j = i; j < s.length; j++) {
            if (isPalindrome(i, j)) {
                path.push(s.slice(i, j + 1))
                dfs(j + 1)  // 只有当前字符串是回文，才进行分割
                path.pop()
            }
        }
    }

    dfs(0)
    return result
}

console.log(partition("aab"))
console.log(partition("a"))