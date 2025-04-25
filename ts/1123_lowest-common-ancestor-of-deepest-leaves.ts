/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
    const h = 'h'
    function height(t: TreeNode | null): number {
        if (!t) return 0
        const lh = height(t.left)
        const rh = height(t.right)
        t[h] = Math.max(lh, rh) + 1
        return t[h]
    }

    height(root)

    let ans: TreeNode | null = null
    /**
     * 向高度更高的子树进行遍历，直到找到左右子树高度一致的节点。
     * 这个节点就是“最深叶节点的最近公共祖先”
     * @param t 
     * @returns 
     */
    function dfs(t: TreeNode) {
        if (t.left?.[h] == t.right?.[h]) {
            ans = t
            return
        } else if ((t.left?.[h] ?? 0) > (t.right?.[h] ?? 0)) {
            dfs(t.left!)
        } else {
            dfs(t.right!)
        }
    }

    if (root) dfs(root)

    return ans
};

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