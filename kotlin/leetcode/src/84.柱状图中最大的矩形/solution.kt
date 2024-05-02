package source.`84`.柱状图中最大的矩形

import java.util.Stack
import kotlin.math.max

class Solution {
    /**
     * 对于以每一根柱子为高，能构成的最大矩形面积：
     * 一定是从它开始，向左找到第一根高度比它小的柱子；向右找到第一根高度比它小的柱子。
     * 这两根柱子中间的柱子所构成的宽度为底的矩形面积。
     *
     * 为了能够足够高效地找出上述任意一个柱子（从它开始，第一个）比它小的两边的柱子。
     * 对于每一边（左或右）这样的柱子，我们可以分别借助单调栈的特性，在 O(n) 的时间内，预处理除去 第一个比它小柱子 和 这个柱子 之间，高度大于等于它的其他柱子。
     * 那么我们只需要正向和方向，分别对数组遍历，并进行单调栈预处理，用共计两个数组分别记录下每个柱子左边和右边第一根比它矮的柱子的下标。
     */
    fun largestRectangleArea(heights: IntArray): Int {
        val left = IntArray(heights.size) { -1 } // 考虑边界情况：最左端的柱子（idx: 0）的左端第一个（idx: -1）比它小的柱子（不会通过单调栈计算出来，需要初始设置）
        val stack = Stack<Int>()
        for (i in heights.indices) {
            while (stack.isNotEmpty() && heights[i] <= heights[stack.peek()]) {
                stack.pop()
            }
            if (stack.isNotEmpty()) {
                left[i] = stack.peek()
            }
            stack.push(i)
        }

        val right =
            IntArray(heights.size) { heights.size } // 考虑边界情况：最右端的柱子（idx: heights.lastIndex）的右端第一个（idx: heights.size）比它小的柱子（不会通过单调栈计算出来，需要初始设置）
        stack.clear()
        for (i in heights.lastIndex downTo 0) {
            while (stack.isNotEmpty() && heights[i] <= heights[stack.peek()]) {
                stack.pop()
            }
            if (stack.isNotEmpty()) {
                right[i] = stack.peek()
            }
            stack.push(i)
        }

        var maxArea = 0
        heights.forEachIndexed { idx, height ->
            maxArea = max(maxArea, height * (right[idx] - left[idx] - 1))
        }
        return maxArea
    }
}