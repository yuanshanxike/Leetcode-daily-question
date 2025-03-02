/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    let found = false
    function dfs(cur: TreeNode | null, ptr: ListNode | null) {
        if (ptr == null) found = true

        if (found || !cur) return  // 如果已经找到了就终止继续向更深处递归，递归到叶子节点时同样需要返回

        if (ptr && cur.val == ptr.val) {  // 递归进行路径匹配
            dfs(cur.left, ptr.next)
            dfs(cur.right, ptr.next)
        }

        // 条件 ptr === head 保证了递归栈回退到链表指针指向链表头时（此时树的指针也对应回退到了本次匹配链表头的节点处）
        if (!found && ptr === head) {   // 只有在 递归路径匹配失败 且 在链表指针指向链表头 时，才尝试从新节点（左、右孩子）开始对链表进行从头匹配。否则在每次有部分路径匹配时，都还会在 匹配出错 或者 匹配完成 后，重新从路径上的每一个节点出发再进行对链表的从头匹配，这是重复且没有必要的操作，会导致时间复杂度变成指数级别的。
            // 当前节点为起点的路劲匹配失败，让其左右孩子从头(链表从头开始)进行尝试。
            dfs(cur.left, head)
            dfs(cur.right, head)
        }
    }

    dfs(root, head)

    return found
};

// function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
//     function dfs(cur: TreeNode | null, ptr: ListNode | null): boolean {
//         if (ptr == null) return true
//         if (cur == null) return false

//         return cur.val == ptr.val && (dfs(cur.left, ptr.next) || dfs(cur.right, ptr.next)) || 
//                ptr === head && (dfs(cur.left, head) || dfs(cur.right, head))
//     }

//     return dfs(root, head)
// }