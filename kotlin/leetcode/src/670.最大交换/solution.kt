package source.`670`.最大交换

class Solution {
//    /**
//     * 从最高位开始，找出最长递减序列。然后从剩余的序列中找出最大值，与递减序列中从左往右第一个小于其的值交换位置
//     */
//    fun maximumSwap(num: Int): Int {
//        var end = -1 // 从最高位到低位，递减序列的结束位置
//        var prefixMin = 10 // end 对应位置的数值
//        var isEnd = false // 前缀的递减序列是否结束
//
//        var suffixMax = 0 // 剩余序列中的最大值
//
//        val numStr = num.toString()
//
//        var sufMaxIdx = numStr.length // suffixMax 的位置
//
//        numStr.toCharArray().map { it.digitToInt() }.forEachIndexed { index, c ->
//            if (isEnd.not() && c < prefixMin) {
//                end = index
//                prefixMin = c
//            } else {
//                isEnd = true
//                if (c > suffixMax)
//            }
//        }
//    }

    fun maximumSwap(num: Int): Int {
        val numArray = num.toString().toCharArray().map { it.digitToInt() }
        // 先降序排序，这是这几个数字所能组合出来的最大数
        val descList = numArray.sortedDescending()
        // 原数每位与最大的数进行对比，要是不同，就先记下不同的位置，然后在原数中查询这个数字的位置
        // 这里需要贪心地尽可能地向后查找（因为把比需要放置的数越往后放置的话，能使得数字越大）
        // 找到后交换位置再输出 int
        var diffIdx = -1
        var diffNum = 10
        apply loop@{
            numArray.forEachIndexed { index, i ->
                if (descList[index] != i) {
                    diffIdx = index
                    diffNum = descList[index]
                    return@loop
                }
            }
        }
        if (diffIdx == -1) return num
        val targetIdx = numArray.subList(diffIdx + 1, numArray.size).indexOfLast { it == diffNum } + 1 + diffIdx
        val temp = numArray[diffIdx]
        val mutableList = numArray.toMutableList()
        mutableList[diffIdx] = numArray[targetIdx]
        mutableList[targetIdx] = temp
        return mutableList.joinToString("").toInt()
    }
}

fun main() {
    Solution().maximumSwap(2736).also(::println)
    Solution().maximumSwap(9973).also(::println)
}