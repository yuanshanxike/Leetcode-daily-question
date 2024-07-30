function fallingSquares(positions: number[][]): number[] {
    // 暴力枚举做法（因为坐标范围太大，不能实质性地去对每个整数坐标进行计算）:
    const heights: number[] = []  // 每个方块依次下落后顶部的高度
    positions.forEach(([left, sl], i) => {
        const right = left + sl
        heights[i] = sl // 底部区域没有重合的方块时，下落后高度为自身的边长
        // *循环找重合底部区域的方块并计算顶部高度最大值的逻辑可以通过 有序集合 进行优化
        for (let j = 0; j < i; j++) { // 检测重合，同时统计这个方块能到达的最大顶部高度
            const [left0, sl0] = positions[j]
            const right0 = left0 + sl0
            if (left < right0 && right > left0) {  // 两个方块横坐标有重合部分的条件
                heights[i] = Math.max(heights[i], heights[j] + sl)
            }
        }
    })
    // 此时，heights[i] 表示下落完成后，第 i 个方块的顶部高度
    // 再遍历一次数组，在 heights 中更新前 i 个方块下落完成后的最大高度，就是题目要求的答案
    heights.forEach((cur, idx) => {
        if (idx > 0) heights[idx] = Math.max(heights[idx - 1], cur)
    })
    return heights
};

/**线段树做法 (动态开点 + 懒标记 的线段树) */
namespace L699 {
    class Node {
        left: Node | null = null
        right: Node | null = null
        l: number
        r: number
        mid: number
        v: number = 0  // 区间内的最大高度
        tag: number = 0 // v 的懒惰标记
    
        constructor (left: number, right: number) {
            this.l = left
            this.r = right
            this.mid = (left + right) >> 1
        }
    }
    
    class SegmentTree {
        private root: Node = new Node(1, 1e8 + 1e6 + 1)  // 题目的坐标数据范围

        // 区间更新
        public modify(l: number, r: number, v: number) {
            this.modifyNode(l, r, v, this.root)
        }

        // 区间更新 (将区间 [l, r] 上的值修改为 v)
        private modifyNode(l: number, r: number, v: number, node: Node) {
            if (l > r) return
            if (l <= node.l && node.r <= r) {  // 节点对应区间命中需要修改的区间
                node.v = v     // 修改节点值（对应区间的高度）
                node.tag = v   // 懒标记整个符合条件的子区间 (当向下继续寻找目标区间时，设置子区间的高度)，而不是继续把范围精确到长度为 1 的子区间
                return
            }
            // node 对应的整个区间不是修改范围的子集，继续把区间左右分治寻找
            this.pushdown(node)
            if (l <= node.mid) {
                this.modifyNode(l, r, v, node.left!)
            }
            if (node.mid < r) {
                this.modifyNode(l, r, v, node.right!)
            }
            this.pushup(node)
        }

        // 向下更新 node 节点所在区间的左右子节点的值和懒惰标记
        private pushdown(node: Node) {
            if (!node.left) {
                node.left = new Node(node.l, node.mid)
            }
            if (!node.right) {
                node.right = new Node(node.mid + 1, node.r)
            }
            if (node.tag) {  // 如果节点被标记了懒惰标记
                const left = node.left
                const right = node.right
                // 将懒标记下传到子节点（同时，子区间应用上次设置的高度值）
                left.tag = node.tag, left.v = node.tag
                right.tag = node.tag, right.v = node.tag
                node.tag = 0  // 清空当前节点的懒标记
            }
        }

        // 向上更新 node 节点区间值，节点的区间值等于该节点左右子节点中的最大高度值
        private pushup(node: Node) {
            node.v = Math.max(node.left!.v, node.right!.v)
        }

        // 区间查询
        public query(l: number, r: number): number {
            return this.queryNode(l, r, this.root)
        }

        private queryNode(l: number, r: number, node: Node): number {
            if (l > r) return 0
            if (l <= node.l && node.r <= r) {
                return node.v
            }
            this.pushdown(node)
            let v = 0
            if (l <= node.mid) {
                v = Math.max(v, this.queryNode(l, r, node.left!))
            }
            if (r > node.mid) {
                v = Math.max(v, this.queryNode(l, r, node.right!))
            }
            return v
        }
    }
    
    export function fallingSquares(position: number[][]): number[] {
        const ans: number[] = []
        const tree = new SegmentTree()
        // let mx = 0
        position.forEach(([left, sl]) => {
            const right = left + sl - 1  // 将方块的底边范围，抽象为左闭右开的区间线段，这样可以保证相邻紧贴着的两个方块可以下落到正确的高度
            const height = tree.query(left, right) + sl
            // 方法一：每次记录对应下落区间是否更新了当前最大高度值
            // mx = Math.max(mx, height)
            // ans.push(mx)
            // tree.modify(left, right, height)

            // 方法二：每次更新对应区间后，查询整个区间范围的最大高度
            tree.modify(left, right, height)
            ans.push(tree.query(1, 1e8 + 1e6 + 1))
        })
        return ans
    }
}

console.log(L699.fallingSquares([[1,2],[2,3],[6,1]]))
console.log(L699.fallingSquares([[100,100],[200,100]]))