/**
 * 要使得每笔交易按照任意顺序都能完成。我们需要考虑最坏情况下能完成每笔交易的初始资金。
 * 最坏情况下，我们必须先扛过每一笔亏损的交易，并能在盈利的交易前有足够的剩余资金去完成交易。
 * @param transactions 
 * @returns 
 */
function minimumMoney(transactions: number[][]): number {
    // const n = transactions.length
    let totalCost = 0  // 亏损的 transactions 的 cost - cashback 的总消耗
    let max = 0
    for (const [cost, cashback] of transactions) {
        totalCost += Math.max(0, cost - cashback)
        max = Math.max(max, Math.min(cost, cashback))
    }
    return totalCost + max
};

console.log(minimumMoney([[2, 1], [5, 0], [4, 2]]))
console.log(minimumMoney([[3,0],[0,3]]))