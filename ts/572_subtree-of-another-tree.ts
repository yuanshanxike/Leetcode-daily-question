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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (root == null) return false

    if (equalsDfs(subRoot, root)) return true
    if (isSubtree(root.left, subRoot)) return true
    if (isSubtree(root.right, subRoot)) return true
    return false
};

/**判断两棵树是否严格相等 */
function equalsDfs(subRoot: TreeNode | null, root: TreeNode | null): boolean {
    if (subRoot == null && root == null) return true
    if (subRoot?.val != root?.val) return false
    if (!equalsDfs(subRoot?.left ?? null, root?.left ?? null)) return false
    if (!equalsDfs(subRoot?.right ?? null, root?.right ?? null)) return false
    return true
}