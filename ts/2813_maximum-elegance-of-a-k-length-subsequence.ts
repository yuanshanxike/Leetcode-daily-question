/**
 * 反悔贪心
 * 思路：先对 items 按照 profit 进行从大到小的排序，贪心地先取前 k 个数，保证 maximum_elegance 的其中一个成分 total_profit 是最大值 （可以看作是一个局部最优解）;
 * 此时，如果选取后面 profit (与最后一个选取的元素 profit)相等或更小的 item，total_profit 不会变大了，但 distinct_categories 是有可能会因为舍弃的是一个原本重复种类的 item、加入的是一个新品种的 item 而继续增大的。
 * 后面舍弃了之前选择的 item，而重新选择一个新的 item 的过程叫做反悔。只要满足“total_profit 减小的幅度小于 distinct_categories 增大的幅度”，我们就可以执行这个反悔操作。
 * 怎么找到全局最优解呢？反悔过程中，统计 maximum_elegance 所产生值中的最大值。
 * 
 * 详细说明看：https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence/solutions/2375128/fan-hui-tan-xin-pythonjavacgo-by-endless-v2w1/
 * @param items 
 * @param k 
 * @returns 
 */
function findMaximumElegance(items: number[][], k: number): number {
    const n = items.length
    // 先贪心选出 k 个元素
    items.sort(([p1], [p2]) => p2 - p1)
    const categSet = new Set<number>()
    const duplicStack: number[] = []  // 存放重复品类中 profit 较小的 item.profit，且越靠近栈顶，profit 越小
    let totalProfit = 0
    for (let i = 0; i < k; i++) {
        const [profit, category]: number[] = items[i]
        if (categSet.has(category)) {
            duplicStack.push(profit)  // 说明已经存在相同种类更大 profit 的 item，属于是可以被删除的 item，所以加入栈中，以便按照 profit 从小到大的顺序进行删除
        } else {
            categSet.add(category)
        }
        totalProfit += profit
    }
    let ans = totalProfit + categSet.size ** 2
    // 如果遇到能使得 maximum_elegance 变大的 item，进行尝试进行反悔
    let p = duplicStack.length - 1
    for (let i = k; i < n; i++) {
        const [profit, category] = items[i]
        if (!categSet.has(category) && p >= 0) { // 遇到不能存在的新值，尝试反悔操作，看能不能得到更大的 maximum_elegance
            totalProfit += profit - duplicStack[p--]  // totalProfit 在反悔时只会减小（一定要弹出当前栈顶的重复最小 profit，因为如果这里不弹出，后面的 item.profit 更小，那么 totalProfit 会变得更小，同时也浪费了 distinct_categories 能够变得更大的可能性）
            categSet.add(category)
            ans = Math.max(ans, totalProfit + categSet.size ** 2)  // 二次函数随着自变量的增大，函数值增大非常快。即使 maximum_elegance 因为 totalProfit 的减小而暂时减小了，也有可能在下一次随着 distinct_categories 的变大而刷新最大值
        }
    }
    return ans
};

console.log(findMaximumElegance([[3,2],[5,1],[10,1]], 2))  // 17
console.log(findMaximumElegance([[3,1],[3,1],[2,2],[5,3]], 3)) // 19
console.log(findMaximumElegance([[1,1],[2,1],[3,1]], 3))  // 7
console.log(findMaximumElegance([[1,6],[10,1],[4,4],[8,1],[6,2],[10,1],[5,5],[4,4]], 5))  // 51
console.log(findMaximumElegance([[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]], 10))  // 137