/**
 * 线段树二分
 * 本题只有单点修改，没有区间更新，无需懒标记。
 */
class BookMyShow {
    private n: number
    private m: number

    private min: number[]
    private sum: number[]

    constructor(n: number, m: number) {
        this.n = n
        this.m = m
        const size = 2 << (32 - Math.clz32(n))  // 比 4n 更小
        this.min = Array(size).fill(0)
        this.sum = Array(size).fill(0)
    }

    // 单点更新：把(整个区间中的)下标 i 上的元素值增加 val
    // o 表示当前区间节点的下标。l 和 r 分别是区间的左右端点（下标）
    private update(o: number, l: number, r: number, i: number, val: number) {
        if (l == r) {  // 找到了下标为 i 的元素（长度为 1 的区间）
            this.min[o] += val
            this.sum[o] += val
            return
        }
        const m = Math.floor((l + r) / 2)
        if (i <= m) {
            this.update(o * 2, l, m, i, val)  // i 在其左半区间时，更新左半区间（在堆中，o 的左孩子是 o * 2）
        } else {
            this.update(o * 2 + 1, m + 1, r, i, val)  // i 在其右半区间时，更新右半区间（在堆中，o 的右孩子是 o * 2 + 1）
        }
        // pushUp
        this.min[o] = Math.min(this.min[o * 2], this.min[o * 2 + 1])
        this.sum[o] = this.sum[o * 2] + this.sum[o * 2 + 1]
    } 

    // 返回区间 [L,R] 内的元素和
    private querySum(o: number, l: number, r: number, L: number, R: number): number {
        if (L <= l && r <= R) {  // 如果当前查询(递归)到的区间是目标区间的子集，直接返回当前区间的元素和
            return this.sum[o]
        }
        let res = 0
        const m = Math.floor((l + r) / 2)
        if (L <= m) { // 目标区间与当前查询区间的左半区间可能有交集
            res += this.querySum(o * 2, l, m, L, R)
        }
        if (m < R) { // 目标区间与当前查询区间的右半区间可能有交集
            res += this.querySum(o * 2 + 1, m + 1, r, L, R)
        }
        return res
    }

    // 返回区间 [0,R] 中 <= val 的最靠左的位置，不存在时返回 -1
    private findFirst(o: number, l: number, r: number, R: number, val: number): number {
        if (this.min[o] > val) {
            return -1  // 整个区间的元素值都大于 val
        }
        if (l == r) {
            return l
        }
        const m = Math.floor((l + r) / 2)
        // 注意：这里因为 L == 0, 恒满足 L <= m, 所以不用判断是否和左半区间有交集，因为一定是有的
        if (this.min[o * 2] <= val) {  // 如果当前查找区间左半区间的最小值 <= val，则需要查找的最小位置一定在左半区间中
            return this.findFirst(o * 2, l, m, R, val)
        } else if (R > m) {  // 否则，如果与右半区间可能有交集，递归右半区间
            return this.findFirst(o * 2 + 1, m + 1, r, R, val)
        } else return -1
    }

    gather(k: number, maxRow: number): number[] {
        const r = this.findFirst(1, 0, this.n - 1, maxRow, this.m - k)  // （堆中的根节点存放在下标为 1 的位置）在 [0, maxRow] 的区间上查找当前所坐人数 <= m - k 的排
        if (r < 0) return []
        const c = this.querySum(1, 0, this.n - 1, r, r) // 第 r 排已坐人数，等于下一个紧凑安排的座位编号
        this.update(1, 0, this.n - 1, r, k)  // 在第 r 排安排座位
        return [r, c]
    }

    scatter(k: number, maxRow: number): boolean {
        // [0,maxRow] 排的已坐人数之和
        const s = this.querySum(1, 0, this.n - 1, 0, maxRow)
        if (s > this.m * (maxRow + 1) - k) {
            return false  // 空位不够安排
        }
        // 从第一排没有被安排满的排开始安排
        let i = this.findFirst(1, 0, this.n - 1, maxRow, this.m - 1)
        while (k) {
            const setCnt = Math.min(this.m - this.querySum(1, 0, this.n - 1, i, i), k)  // 每排安排就坐的人数是 空座 和 剩余人数 中的最小值
            this.update(1, 0, this.n - 1, i, setCnt)  // 安排就坐
            k -= setCnt  // 减去本排就坐人数
            i++  // 下一排
        }
        return true
    }
}

/**
 * Your BookMyShow object will be instantiated and called as such:
 * var obj = new BookMyShow(n, m)
 * var param_1 = obj.gather(k,maxRow)
 * var param_2 = obj.scatter(k,maxRow)
 */