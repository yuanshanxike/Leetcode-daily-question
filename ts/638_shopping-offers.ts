/**
 * 因为由多个状态，且数据规模较小，可以考虑使用 状压 dp：
 * need 的最大数量是 10 (0b1010)，最多有 6 种不同的商品.
 * 那么，可以将所购买的不同商品的数量，压缩到一个最多 4 * 6 = 24 位的整数中。
 * @param price 
 * @param special 
 * @param needs 
 */
function shoppingOffers(price: number[], special: number[][], needs: number[]): number {
    const n = price.length
    const mod = (1 << 4) - 1

    const memo: Record<number, number> = {}

    /**
     * 
     * @param state 剩余需要的每种商品数量压缩成的状态
     * @param i 迭代到的大礼包编号
     */
    function dfs(state: number): number {
        if (state <= 0) return 0

        if (memo[state] != undefined) return memo[state]

        let min = price.reduce((sum, p, idx) => {
            return sum + p * (state >> idx * 4 & mod)
        }, 0)
        for (const sp of special) {
            let canUse = true   // 当前的大礼包是否满足所包含的每种物品数不高于剩余需求数
            let tryState = state  // 模拟购买了当前大礼包，对剩余的需求数进行减小
            for (let j = 0; j < n; j++) {
                const resJ = state >> j * 4 & mod
                canUse &&= resJ >= sp[j]

                tryState = tryState & ~(mod << j * 4)  // 对应剩余数量置零
                tryState |= (resJ - sp[j]) << j * 4  // 设置正确的对应剩余数量
            }

            if (canUse) {
                min = Math.min(dfs(tryState) + sp[n], min)
            }
        }

        memo[state] = min

        return min
    }

    const initSate = needs.reduce((sum, need, idx) => {
        return sum + (need << idx * 4)
    }, 0)
    return dfs(initSate)
};

console.log(shoppingOffers([2,5], [[3,0,5],[1,2,10]], [3,2]))
console.log(shoppingOffers([2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1]))