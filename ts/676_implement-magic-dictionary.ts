/** 字典树 + DFS */
class MagicDictionary {
    private static readonly MAX_NODES = 100 * 100 + 1

    // 数组模拟动态添加节点
    readonly next: Record<string, number>[] = Array.from({ length: MagicDictionary.MAX_NODES }, () => { return {} })  // next[字典树最大节点数][字符集大小(对于 ts/js 使用对象代替一维数组可以动态添加)]
    readonly exit: boolean[] = Array<boolean>(MagicDictionary.MAX_NODES).fill(false)  // 存在字符串的结束标志
    cnt = 0  // 节点计数，用来索引节点

    constructor() {}

    buildDict(dictionary: string[]): void {
        for (const str of dictionary) {
            let p: number = 0
            for (const c of str) {
                if (!this.next[p][c]) this.next[p][c] = ++this.cnt
                p = this.next[p][c] // 指向下一个(可能是新的)字符节点
            }
            this.exit[p] = true
        }
    }

    search(searchWord: string): boolean {        
        const dfs = (i: number, p: number, skipFlag: boolean): boolean => {
            if (i == searchWord.length) {  // 匹配完成所有字符
                return skipFlag ? false : this.exit[p]
            }
            const c = searchWord[i]
            let res = false
            for (const key in this.next[p]) {
                if (c == key) {  // 匹配上
                    res ||= dfs(i + 1, this.next[p][c], skipFlag)
                } else if (skipFlag) {  // 没匹配上单个字符，但还有跳过机会
                    res ||= dfs(i + 1, this.next[p][key], false)
                }
            }
            return res
        }

        return dfs(0, 0, true)

        // let p = 0
        // for (const c of searchWord) {
        //     console.debug(`${c}, next: ${this.next[p][c]}, exit: ${this.exit[p]}`)
        //     if (this.next[p][c]) p = this.next[p][c]
        //     else return false
        // }
        // console.debug(`p13: ${this.exit[13]}`)
        // return this.exit[p]
    }
}

namespace L676 {
    let obj = new MagicDictionary()
    obj.buildDict(["hello", "leetcode", "hollo"])
    console.log(obj.search('hello'))
    console.log(obj.search('hhllo'))
    console.log(obj.search('hell'))
    console.log(obj.search('leetcoded'))
    console.log(obj.search('leetcoda'))
    console.log(obj.search('leetcode'))
    console.log(obj.search('heetcode'))
}
