package source.`122`.`买卖股票的最佳时机 II`

import kotlin.math.max

class Solution {
    /**
     * 状态机 DP:
     *
     *         买入
     * 未持有   --->   持有
     *   ^     <--      ^
     * |_|     卖出    |_|
     *不操作           不操作
     */
    fun maxProfit(prices: IntArray): Int {
        var notHold = 0
        var hold = Int.MIN_VALUE // 为了让 dp 正确初始化
        prices.forEach { p ->
            hold = max(hold, notHold - p)
            notHold = max(notHold, hold + p)
        }
        return notHold
    }

    /**
     * 贪心：
     * 因为每次只能买卖一股，
     * 所以只需要 连续上涨区间开始时候买入，区间结束时候卖出；
     * 下跌时候不操作就可以（不亏钱）
     */
}