namespace L2070 {
    /**
     * 在线算法（对于 queries）
     * 排序 + 前缀最大值 + 二分查找
     * @param items 
     * @param queries 
     */
    function maximumBeauty(items: number[][], queries: number[]): number[] {
        const n = items.length
        items.sort(([price0], [price1]) => price0 - price1)
        let maxBeauty = 0
        for (const item of items) {
            const [, beauty] = item
            maxBeauty = Math.max(beauty, maxBeauty)
            item[1] = maxBeauty
        }

        const ans: number[] = []
        for (const q of queries) {
            // 二分查找（左闭右开）
            // 红：<= q, 蓝：> q
            let l = 0, r = n
            while (l < r) {
                const mid = (l + r) >> 1
                const [price] = items[mid]
                if (price <= q) {
                    l = mid + 1
                } else {
                    r = mid
                }
            }

            const idx = l - 1
            ans.push(idx >= 0 ? items[idx][1] : 0)
        }
        return ans
    };

    console.log(maximumBeauty([[1, 2], [3, 2], [2, 4], [5, 6], [3, 5]], [1, 2, 3, 4, 5, 6]))
    console.log(maximumBeauty([[1, 2], [1, 2], [1, 3], [1, 4]], [1]))
    console.log(maximumBeauty([[10, 1000]], [5]))
}