class SkipListNode {
    val: number
    next: (SkipListNode | null)[]
    constructor(val: number, level: number) {
        this.val = val
        this.next = new Array(level + 1).fill(null)
    }

    get level(): number {
        return this.next.length - 1
    }
}

const MAX_LEVEL = 15

class Skiplist {
    private head: SkipListNode = new SkipListNode(-1, MAX_LEVEL)  // 头哨兵节点，最大层数为 15 约等于 log2(20000)

    private update: (SkipListNode | null)[] = new Array(MAX_LEVEL).fill(null)  // 用于记录每层需要更新的节点

    /**
     * 搜索第 0 层最后一个小于 target 的节点
     * @param target 
     * @returns 
     */
    private searchLastNodeInternal(target: number): SkipListNode {
        let curr: SkipListNode = this.head
        for (let i = MAX_LEVEL; i >= 0; i--) {
            while (curr && curr.next[i] && curr.next[i]!.val < target) {
                curr = curr.next[i]!
            }
            this.update[i] = curr  // 记录每层需要更新的节点
        }
        return curr
    }

    search(target: number): boolean {
        return this.searchLastNodeInternal(target)?.next[0]?.val == target
    }

    add(num: number): void {
        this.update.fill(null)
        let level = 0
        while (Math.random() < 0.5 && level < MAX_LEVEL) {  // 随机生成层数，设置概率 p = 0.5。且层数不能超过最大层数
            level++
        }
        const newNode = new SkipListNode(num, level)  // 需要插入的新节点
        this.searchLastNodeInternal(num) // 收集需要更新的节点
        // 插入新节点
        for (let i = 0; i <= level; i++) {
            newNode.next[i] = this.update[i]!.next[i]
            this.update[i]!.next[i] = newNode
        }
    }

    erase(num: number): boolean {
        this.update.fill(null)
        const lastNode = this.searchLastNodeInternal(num)
        if (lastNode.next[0]?.val != num) {
            return false
        }
        const deletedNode = lastNode.next[0]!
        for (let i = 0; i <= deletedNode.level; i++) {
            this.update[i]!.next[i] = deletedNode.next[i]
        }
        return true
    }
}