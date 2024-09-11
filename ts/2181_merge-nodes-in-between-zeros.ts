/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function mergeNodes(head: ListNode | null): ListNode | null {
    let headNode: ListNode | null = null
    let curNode: ListNode | null = null
    while (head) {
        if (head!.val == 0) {
            if (head!.next != null) {
                const newNode = new ListNode(0, null)
                if (curNode) curNode!.next = newNode
                curNode = newNode
                if (!headNode) headNode = curNode
            }
        } else {
            curNode!.val += head!.val
        }
        head = head!.next
    }
    return headNode
};