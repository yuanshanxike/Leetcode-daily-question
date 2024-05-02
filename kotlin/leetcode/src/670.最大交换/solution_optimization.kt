package source.`670`.最大交换

class SolutionOptimization {
    /** 贪心（不用对数组排序）（有些动态规划的思想）
     * 设整数 num 从右向左的数字分别为 (d(0), d(1), d(2), ... ,d(n-1)).
     * 假设 j,k 位置上的数字进行交换，满足 0<=j<k<n,...
     * 要使得交换后数字能够变大，要保证 d(j) > d(k)
     * 而且在满足 j 尽可能大、k 尽可能小的前提下，j 越靠右，而 k 越靠左效果会越好
     */
    fun maximumSwap(num: Int): Int {
        val digitList = mutableListOf<Int>()
        var numTemp = num
        while (numTemp != 0) {
            digitList.add(numTemp % 10)
            numTemp /= 10
        }

        // 把当前后缀的最大值换到当前后缀的开头数位，无可厚非是一种最佳的选择，但是最大的数如果在开头的位置，则进行不了这一操作
        val swapIndexArray = IntArray(digitList.size) // // 从右往左，记录可交换的位置；不用交换（最大值为前缀的头部），则值为-1
        var maxValue = -1
        var vIdx = -1  // maxValue 对应的位置
        digitList.forEachIndexed { index, i ->
            if (i > maxValue) {
                maxValue = i
                vIdx = index
                swapIndexArray[index] = -1  // 当前后缀的最大值是当前头部元素，则不用交换 
            } else if (i == maxValue) {
                swapIndexArray[index] = -1  // 当前后缀的最大值与当前头部值相等，也不用交换 
            } else {
                swapIndexArray[index] = vIdx // 当前后缀的最大值不是当前头部元素，则记录可交换的（当前最大值）位置
            }
        }

        // 从左往右过一遍原数字，找到可交换的地方，交换一次就停止循环
        apply {
            repeat(swapIndexArray.size) { index ->
                val cur = swapIndexArray.lastIndex - index
                swapIndexArray[cur]
                        .takeIf { it > -1 }
                        ?.also { swapIdx ->
                            swap(digitList[cur], digitList[swapIdx]).also { (a, b) ->
                                digitList[cur] = a
                                digitList[swapIdx] = b
                            }
                            return@apply
                        }
            }
        }

        var newNum = 0
        var power = 1
        digitList.forEachIndexed { index, i ->
            if (index > 0) power *= 10
            newNum += i * power
        }
        return newNum
    }

    fun swap(a: Int, b: Int) = Pair(b, a)
}

fun main() {
    SolutionOptimization().apply {
        maximumSwap(2736).also(::println)
        maximumSwap(9973).also(::println)
        maximumSwap(98368).also(::println)
    }
}