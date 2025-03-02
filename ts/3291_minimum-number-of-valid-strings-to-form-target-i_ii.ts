namespace L3291 {
    /**
     * 前缀哈希处理 + 划分型 DP (暴力 DP，枚举了所有的划分情况)
     * TLE
     * @param words
     * @param target
     * @returns
     */
    // function minValidStrings(words: string[], target: string): number {
    //     const prefixSet: Set<string> = new Set<string>()
    //     for (const word of words) {
    //         for (let i = 1; i <= word.length; i++) {
    //             prefixSet.add(word.substring(0, i))
    //         }
    //     }

    //     const memo: Record<string, number> = {}
    //     /**
    //      *
    //      * @param target
    //      * @returns 组成 target 所需要的最少次数
    //      */
    //     function form(target: string): number {
    //         if (prefixSet.has(target)) return 1

    //         if (memo[target] != undefined) return memo[target]

    //         let minTimes = target.length + 1
    //         for (let i = 1; i < target.length; i++) {
    //             const left = target.substring(0, i)
    //             const right = target.substring(i, target.length)

    //             const lTimes = form(left)
    //             const rTimes = form(right)

    //             if (lTimes != -1 && rTimes != -1) {
    //                 minTimes = Math.min(lTimes + rTimes, minTimes)
    //             }
    //         }

    //         memo[target] = minTimes < target.length + 1 ? minTimes : -1
    //         return memo[target]
    //     }

    //     return form(target)
    // };


    /**
     * 字典树 + 序列型 DP
     * 
     * 字典树又叫做前缀树，合适解决多个字符串前缀的问题。
     * 因为有字典树的制约，从 target 中划分的一些无效字符串会被终止继续递归(划分)，从而对比上面的做法有显著的剪枝优化。
     */
    function minValidStrings(words: string[], target: string): number {
        const n = target.length
        // 创建字典树
        const trie = new Trie
        for (const word of words) {
            trie.insert(word)
        }

        const f: number[] = Array(n).fill(0)  // f[i] 会保存 dfs(i) 的结果，是记忆体
        function dfs(i: number): number { // dfs(i) 表示从 i 开始的后缀字符串需要由合法字符串(words 的前缀)连接的最少次数
            if (i == n) return 0

            if (f[i]) return f[i]

            let node: Trie | null = trie
            f[i] = Infinity
            for (let j = i; j < n; j++) {
                const chrIdx = target[j].charCodeAt(0) - 'a'.charCodeAt(0)
                if (!node?.children[chrIdx]) break  // 不是合法字符串，终止该划分下的尝试
                node = node.children[chrIdx]
                f[i] = Math.min(f[i], dfs(j + 1) + 1)  // 在字典树上的任意非空节点中断都是合法的连接，下一个新连接的字符串需要重新从根节点开始寻找。（"dfs(j + 1)"后的"+ 1"表示：将当前 for 循环得到的合法字符串计入连接）
            }
            return f[i]
        }
        dfs(0)
        return f[0] < Infinity ? f[0] : -1
    }

    class Trie {
        children: (Trie | null)[] = Array(26).fill(null)  // 本题字符集的取值范围是 26 个小写字母

        insert(word: string) {
            let node: Trie = this
            for (const c of word) {
                const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
                if (!node.children[i]) {
                    node.children[i] = new Trie
                }
                node = node.children[i]!
            }
        }
    }

    console.log(minValidStrings(["abc", "aaaaa", "bcdef"], "aabcdabc"))
    console.log(minValidStrings(["abababab", "ab"], "ababaababa"))
    console.log(minValidStrings(["abcdef"], "xyz"))
    console.log(minValidStrings(["aacbaa", "bc", "ac"], "babbbabbba"))
}


/**
 * z 函数 + 将问题转换为「跳跃游戏ii」
 * 
 * z 函数 的核心思想：Z-Box 之内的元素我们可以保证与字符串前缀长度相同的部分完全一致，
 * 那么如果该位置下标加上 z[i - boxL] 不超过 Z-Box 的右边界，可以直接 copy z[i - boxL] 的值到 z[i], 此时一定满足：z[i] == z[i - boxL].
 * 如果该位置的下标加上 z[i - boxL] 超过了右边界，则先把 boxR - i + 1 (i 到 box 右边界的距离。可以保证这些字符一定是和前缀一致的) 赋给 z[i],
 * 然后再暴力检测后续的字符是否依然匹配。所有和前缀相等的字符匹配完成后，需要更新 box 的范围(左右边界都会向右移动)，然后再对下一个 i 计算 z[i].
 * @param words 
 * @param target 
 */
function minValidStrings(words: string[], target: string): number {
    function zAlgorithm(target: string, text: string): number[]  {
        const s = target + '#' + text
        const len = s.length
        const z: number[] = Array(len).fill(0)
        let boxL: number, boxR: number  //  z-box 左右边界（闭区间）
        boxL = boxR = 0;

        for (let i = 1; i < len; i++) {
            if (i <= boxR) {
                z[i] = Math.min(z[i - boxL], boxR - i + 1)  // Z-Box 的能优化复杂度的关键
            }

            while (i + z[i] < len && s[z[i]] == s[i + z[i]]) {  // 这里就是暴力枚举比较，和朴素算法一致
                // 暴力比较相等时，可以扩展 box 的大小
                boxL = i
                boxR = i + z[i]

                z[i]++
            }
        }
        return z
    }

    // 「跳跃游戏ii」的算法
    function jump(maxJumps: number[]): number {
        let times = 0
        let curR = 0, nextR = 0
        for (let i = 0; i < maxJumps.length; i++) {
            nextR = Math.max(i + maxJumps[i], nextR)

            if (i == curR) {
                if (i == nextR) return -1  // 此时即使再建造新的桥也已经不能再往右移动了，返回不可达(-1)
                
                curR = nextR
                times++
            }
        }
        return times
    }

    const n = target.length
    const maxJumps = Array(target.length).fill(0)
    for (const word of words) {
        const z = zAlgorithm(word, target)
        const offset = word.length + 1  // 跳过目标串 word 的长度 加上 一个 ‘#’ 的字符长度
        for (let i = 0; i < n; i++) {
            maxJumps[i] = Math.max(maxJumps[i], z[offset + i])  // 对于每一个 word，计算 z 数组后用来更新 maxJumps
        }
    }
    return jump(maxJumps)
}

console.log(minValidStrings(["abc","aaaaa","bcdef"], "aabcdabc"))
console.log(minValidStrings(["abababab","ab"], "ababaababa"))
console.log(minValidStrings(["abcdef"], "xyz"))
console.log(minValidStrings(["aacbaa","bc","ac"], "babbbabbba"))