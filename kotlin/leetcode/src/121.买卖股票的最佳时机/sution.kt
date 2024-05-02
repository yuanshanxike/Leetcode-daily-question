package source.`121`.买卖股票的最佳时机

import kotlin.math.max
import kotlin.math.min

class Solution {
    /**
     * 单调栈实现
     */
    fun maxProfit(prices: IntArray): Int {
        var maxIncome = 0
        val stack = mutableListOf<Int>()
        prices.forEach { price ->
            while (stack.isNotEmpty() && stack.last() >= price) {
                stack.removeLast()
            }
            stack.add(price)
            if (stack.size > 1) {
                maxIncome = max(maxIncome, stack.last() - stack.first())
            }
        }
        return maxIncome
    }

    /**
     * 状态机 dp：
     *           买入           卖出
     * 未持有(0)  --->  持有(1)  --->  清仓(2)
     *   ^                ^             ^
     * |_|              |_|           |_|
     *  不操作           不操作         不操作
     *
     * 定义 dp[i][0] 为前 i 天未持有的最大收益
     * 定义 dp[i][1] 为前 i 天持有的最大收益
     * 定义 dp[i][2] 为前 i 天清仓的最大收益
     *
     * 状态转移：
     * dp[i+1][0] = dp[i][0]
     * dp[i+1][1] = max(dp[i][0] - prices[i+1], dp[i][1])  // 买入
     * dp[i+1][2] = max(dp[i][1] + prices[i+1], dp[i][2])  // 清仓
     *
     * 边界条件（注意:dp[-1][]也可以表示第 0 天开始时的利润）：
     * dp[-1][0] = 0
     * dp[-1][1] = -inf  (初始化为负无穷，使得后面的值可以合法)
     * dp[-1][2] = 0
     *
     * 因为状态转移只是和前一个状态有关，所以可以用滚动数组来实现。
     * 而这里每种大状态(i)只对应三个子状态(0, 1, 2)，所以直接用三个变量来滚动储存即可。
     */
    fun maxProfit_state_dp(prices: IntArray): Int {
        val notHold = 0
        var hold = Int.MIN_VALUE
        var clearance = 0
        prices.forEach { price ->
            hold = max(notHold - price, hold)
            clearance = max(hold + price, clearance)
        }
        return clearance

    }

    /**
     * ？？ dp
     * 这道题用状态机器 dp 完全是没必要的。
     * 单次买卖的最大收益，无非就是 在最低点买入，最高点卖出。
     * 所以只需要：遍历时记录下最小价格，同时用当天价格减去这个最低价，并记录最大值就是答案
     */
    fun maxProfit_dp(prices: IntArray): Int {
        var minPrice = Int.MAX_VALUE
        var maxProfit = 0
        prices.forEach { price ->
            minPrice = min(price, minPrice)
            maxProfit = max(price - minPrice, maxProfit)
        }
        return maxProfit
    }
}