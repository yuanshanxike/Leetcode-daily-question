class UnionFind {
    private parent: number[]

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i)
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x])
        }
        return this.parent[x]
    }

    union(from: number, to: number) {
        this.parent[this.find(from)] = this.find(to)
    }
}

/**
 * 问题是求从 p 位置开始，到达其他非 banned 位置的最短路。
 * 可以考虑使用广度优先搜索（BFS）来解决这个问题，每次计算下一步可以到达的位置。
 * 
 * 对于一个位置 i，其通过翻转，一步可以到达的位置是一组公差为 2 的等差数列。
 * 可以想象一开始，i 在长度为 k 的窗口的最右侧，翻转后的位置是 i - k + 1，然后窗口右移一格，翻转后的位置变成 ((i + 1) - k + 1) + 1 = i - k + 3，
 * 直到 i 到达窗口的左侧，此时翻转后的位置是 i + k - 1.
 * 因此，对于一个位置 i，其通过翻转，一步可以到达的位置是 [i - k + 1, i + k - 1] 之间的所有位置。
 * 
 * 但需要注意：如果 i 在 arr 的左边界或右边界附近时，一步可达的范围并不一定是 [i - k + 1, i + k - 1]，
 * 同样利用翻转的对称性考虑左右边界的情况，可以得到一步可达的最小位置受到 k - 1 - i = k - i - 1 的限制；同样一步可达的最大位置受到 (n - k) + (n - 1 - i) = 2n - k - i - 1 的限制。
 * 因此 i 翻转后的最小值为 max(i - k + 1, k - i - 1)，最大值为 min(i + k - 1, 2n - k - i - 1)。
 * 
 * 所以在 BFS 时，可以使用平衡树（有序集合）来存储还没有访问过的位置（不包含 p 和 banned 位置）。
 * 同时因为从任意位置出发，一步可达的位置是公差为 2 的等差数列（要么全为奇数，要么全为偶数），所以为了方便维护，使用两棵平衡树分别存储奇数位置和偶数位置的未访问位置。
 * 之后，只需要从 p 位置开始，不断访问下一步可以到达的位置，直到所有位置都被访问过为止。(BFS)
 * 
 * 标准 js 库中没有提供有序集合，改用 并查集 来记录已经访问过的位置。
 * 
 * @param n 
 * @param p 
 * @param banned 
 * @param k 
 */
function minReverseOperations(n: number, p: number, banned: number[], k: number): number[] {
    const indices = new UnionFind(n + 2)  // 多开两个位置，方便处理边界情况（n 和 n + 1 作为哨兵节点）
    indices.union(p, p + 2)  // 删除 p 位置 (表示如果访问到 p 时，会直接重定向到 p + 2 的位置，也就是会跳过 p)
    for (const b of banned) {
        indices.union(b, b + 2)  // 删除 banned 位置
    }

    const ans = new Array(n).fill(-1)
    ans[p] = 0
    // BFS
    const queue = [p]
    while (queue.length > 0) {
        const i = queue.shift()!
        const min = Math.max(i - k + 1, k - i - 1)
        const max = Math.min(i + k - 1, 2 * n - k - i - 1)
        for (let j = indices.find(min); j <= max; j = indices.find(j + 2)) {  // 每次循环快速跳到 >= j+2 的下一个下标
            ans[j] = ans[i] + 1  // 从 i 处一步能到达的位置
            queue.push(j)
            indices.union(j, max + 2)  // 删除 j 位置（指向下一个没有被删除的位置，即 max + 2）
        }
    }
    return ans
};

console.log(minReverseOperations(4, 0, [1, 2], 4))
console.log(minReverseOperations(5, 0, [2, 4], 3))
console.log(minReverseOperations(4, 2, [0, 1, 3], 1))