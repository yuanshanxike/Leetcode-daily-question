/**
 * 方法一: 双向链表
 * 通过双向链表模拟光标进行实现
 */
// class TextEditor {
//     private cur: LinkNode = new LinkNode('Header')

//     addText(text: string): void {
//         const behindNode = this.cur.next
//         for (const char of text) {
//             const node = new LinkNode(char)
//             this.cur.next = node
//             node.prev = this.cur
//             this.cur = node
//         }
//         if (behindNode) {
//             behindNode.prev = this.cur
//             this.cur.next = behindNode
//         }
//     }

//     deleteText(k: number): number {
//         let deleted = 0
//         const lastRemainNode = this.cur.next
//         while (k > 0 && !this.cur.isHeader) {
//             this.cur = this.cur.prev!
//             k--
//             deleted++
//         }
//         if (lastRemainNode) {
//             lastRemainNode.prev = this.cur
//             this.cur.next = lastRemainNode
//         } else {
//             this.cur.next = null
//         }
//         return deleted
//     }

//     cursorLeft(k: number): string {
//         while (k > 0 && !this.cur.isHeader) {
//             this.cur = this.cur.prev!
//             k--
//         }
//         return this.getLeft()
//     }

//     cursorRight(k: number): string {
//         while (k > 0 && !this.cur.isTail) {
//             this.cur = this.cur.next!
//             k--
//         }
//         return this.getLeft()
//     }

//     private getLeft(): string {
//         let left: string[] = []
//         let cur = this.cur, timesLimit = 10
//         while (timesLimit > 0 && !cur.isHeader) {
//             left.push(cur.val)
//             cur = cur.prev!
//             timesLimit--
//         }
//         return left.reverse().join('')
//     }
// }

// class LinkNode {
//     val: string | 'Header'
//     prev: LinkNode | null
//     next: LinkNode | null

//     constructor(val: string = 'Header') {
//         this.val = val
//         this.prev = null
//         this.next = null
//     }

//     get isHeader(): boolean {
//         return this.val === 'Header'
//     }

//     get isTail(): boolean {
//         return this.next === null
//     }
// }


/**
 * 方法二: 对顶栈
 * 创建左右两个栈，头对头（栈顶对栈顶），光标的左右移动就相当于两个栈中的数据来回倒（左手倒右手，右手倒左手）。
 * 对于插入和删除操作，直接在左边那个栈上入栈出栈。
 */
class TextEditor {
    private leftStack: string[] = []
    private rightStack: string[] = []

    addText(text: string): void {
        this.leftStack.push(...text)
    }

    deleteText(k: number): number {
        const deleted = Math.min(k, this.leftStack.length)
        this.leftStack.splice(-deleted, deleted)
        return deleted
    }

    cursorLeft(k: number): string {
        while (this.leftStack.length > 0 && k > 0) {
            this.rightStack.push(this.leftStack.pop()!)
            k--
        }
        return this.leftStack.slice(-10).join('')
    }

    cursorRight(k: number): string {
        while (this.rightStack.length > 0 && k > 0) {
            this.leftStack.push(this.rightStack.pop()!)
            k--
        }
        return this.leftStack.slice(-10).join('')
    }
}