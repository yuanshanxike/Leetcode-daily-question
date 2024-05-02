package source.`2865`.` 美丽塔 I`

import java.util.ArrayDeque
import kotlin.math.max

class SolutionByStack {
    /**
     * 利用 单调栈（Monotone Stack）
     * 但并不是直接在单调栈中放高度值，不然栈的入栈、出栈与之后要操作的数组下标很难对应起来
     * 栈里只放数组的下标，在栈外部根据单调栈的定义，操作栈中下标的入栈和出栈
     */
    fun maximumSumOfHeights(maxHeights: List<Int>): Long {
        var maxSum = 0L
        val stack = ArrayDeque<Int>() // 单调栈，但是以存数组元素的下标代替直接存数组的元素

        val prefix = LongArray(maxHeights.size) { 0L } // 前缀和 数组
        maxHeights.forEachIndexed { index, i ->
            while (stack.isNotEmpty() && maxHeights[stack.peek()] > i) { // 前缀需要是非递减的
                stack.pop()
            }

            if (stack.isEmpty()) {
                prefix[index] = (index + 1L) * i
            } else {
                // 目前当前的下标还没有加入到栈中，peek 到的就是符合要求的下标
                prefix[index] = prefix[stack.peek()] + (index - stack.peek()) * i.toLong()
            }
            stack.push(index) // 存放 maxHeights 的下标（当前位置的最大限制高度一定会使用，因为我们每次都是默认以当前 index 为山峰而求前缀的和）
        }

        stack.clear()

        val suffix = LongArray(maxHeights.size) { 0L } // 后缀和 数组
        val revMaxHeights = maxHeights.asReversed()
        revMaxHeights.forEachIndexed { revIndex, i ->
            while (stack.isNotEmpty() && revMaxHeights[stack.peek()] > i) { // 后缀需要是非递增的，但反过来就是非递减的
                stack.pop()
            }

            if (stack.isEmpty()) {
                suffix[revIndex] = (revIndex + 1L) * i
            } else {
                // 目前当前的下标还没有加入到栈中，peek 到的就是符合要求的下标
                suffix[revIndex] = suffix[stack.peek()] + (revIndex - stack.peek()) * i.toLong()
            }
            stack.push(revIndex) // 存放 maxHeights 的下标（当前位置的最大限制高度一定会使用，因为我们每次都是默认以当前 index 为山峰而求后缀的和）

            maxSum = max(maxSum, prefix[maxHeights.lastIndex - revIndex] + suffix[revIndex] - i)
        }

        return maxSum
    }


//    /**
//     * 利用 单调栈（Monotone Stack）
//     * 来使得“山体”的左半部分为 非递减
//     * 右半部分为 非递增
//     * DP（前后缀和不断计算的状态转移方程）
//     */
//    fun maximumSumOfHeights(maxHeights: List<Int>): Long {
//        var maxSum = 0L
//        val mStack = MonotoneStack()
//        // 计算以每个元素作为山顶时的前缀和
//        val prefix = LongArray(maxHeights.size) { 0L } // 前缀和数组
//        maxHeights.forEachIndexed { index, i ->
//            val popNum = mStack.push(i)  // TODO：此处有 bug，每次 pop 的个数和 prefix 的下标不是简单运算对等关系，即使是累加，在某些 case 也是有问题的。
//            prefix.getOrNull(index - 1)
//                    ?.also { lastSum ->
//                        if (i >= maxHeights[index - 1]) {
//                            prefix[index] = lastSum + i
//                            println("first dp")
//                        } else {
//                            prefix[index] = i * (popNum + 1) + (prefix.getOrNull(index - 1 - popNum) ?: 0)
//                            println("second dp, popNum:$popNum, presum:${prefix.getOrNull(index - 1 - popNum) ?: 0}")
//                        }
//                    } ?: apply { prefix[index] = i.toLong() }
//        }
//
//        mStack.clear()
//
//        // 一样的方式计算后缀和
//        val suffix = LongArray(maxHeights.size) { 0L } // 后缀和数组
//        val revMaxHeights = maxHeights.reversed()
//        revMaxHeights.forEachIndexed { index, i ->
//            val popNum = mStack.push(i) // TODO：此处有 bug，每次 pop 的个数和 suffix 的下标不是简单运算对等关系，即使是累加，在某些 case 也是有问题的。
//            suffix.getOrNull(index - 1)
//                    ?.also { lastSum ->
//                        if (i >= revMaxHeights[index - 1]) {
//                            suffix[index] = lastSum + i
//                            println("first dp")
//                        } else {
//                            suffix[index] = i * (popNum + 1) + (suffix.getOrNull(index - 1 - popNum) ?: 0)
//                            println("second dp, popNum:$popNum, sufsum:${suffix.getOrNull(index - 1 - popNum) ?: 0}")
//                        }
//                    } ?: apply { suffix[index] = i.toLong() }
//            // 对于 i 处，sum = prefix[i] + suffix[i] - maxHeights[i]
//            // 但是这里处理后缀和数组时，对数组做了反转，所以这里位置应该是一个互补的关系:
//            // sum = prefix[lastIndex - i] + suffix[i] - maxHeights[lastIndex - i]
//            println("pre:${prefix[maxHeights.lastIndex - index]} ; suf:${suffix[index]} ; i:$i ; heightLast:${revMaxHeights.getOrNull(index - 1)}")
//            maxSum = max(maxSum, prefix[maxHeights.lastIndex - index] + suffix[index] - i)
//        }
//        return maxSum
//    }
//
//    private class MonotoneStack {
//        private val stack = mutableListOf<Int>()
//
//        /**
//         * 非单调递减栈
//         * @return num of poped elements
//         */
//        fun push(n: Int): Int {
//            var num = 0
////            for (i in stack.lastIndex downTo 0) {
////                if (stack[i] <= n) {
////                    stack.add(n)
////                    break
////                } else {
////                    pop()
////                    num++
////                }
////            }
//
//            var idx = stack.lastIndex
//            while (idx >= 0) {
//                if (stack[idx] <= n) {
//                    stack.add(n)
//                    break
//                } else {
//                    pop()
//                    num++
//                    idx--
//                }
//            }
//            if (stack.isEmpty()) stack.add(n)
//            return num
//        }
//
//        fun pop(): Int = stack.removeLast()
//
//        fun clear() = stack.clear()
//    }
}

fun main() {
    SolutionByStack().apply {
        maximumSumOfHeights(listOf(5, 3, 4, 1, 1)).also(::println)
        maximumSumOfHeights(listOf(6, 5, 3, 9, 2, 7)).also(::println)
        maximumSumOfHeights(listOf(3, 2, 5, 5, 2, 3)).also(::println)
    }
}