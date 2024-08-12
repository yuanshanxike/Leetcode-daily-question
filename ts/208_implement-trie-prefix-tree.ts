class Trie {
    // 数组模拟动态添加节点
    readonly next: Record<string, number>[] = [] // 存在字符串中，当前字符对应的下一个节点
    readonly exit: Record<number, boolean> = {}  // 存在字符串的结束标志
    cnt = 0  // 节点计数，用来索引节点

    constructor() {}

    insert(word: string): void {
        let p: number = 0
        for (const c of word) {
            while (this.next.length <= p) {
                this.next.push({})
            }
            if (!this.next[p][c]) this.next[p][c] = ++this.cnt
            p = this.next[p][c]
        }
        this.exit[p] = true
    }

    search(word: string): boolean {
        let p = 0
        for (const c of word) {
            if (this.next[p] && this.next[p][c]) p = this.next[p][c]
            else return false
        }
        return this.exit[p] ? true : false
    }

    startsWith(prefix: string): boolean {
        let p = 0
        for (const c of prefix) {
            if (this.next[p] && this.next[p][c]) p = this.next[p][c]
            else return false
        }
        return true
    }
}

namespace L208 {
    let trie = new Trie;
    trie.insert("apple")
    console.log(trie.search("apple"))
    console.log(trie.search("app"))
    console.log(trie.startsWith('app'))
    trie.insert('app')
    console.log(trie.search('app'))
}
