package source.`2765`.` 最长交替子数组`

class Solution {
    fun alternatingSubarray(nums: IntArray): Int {
        var maxLength = -1
        var curNum = 0
        var curLength = 0
        var flag = true

        nums.forEachIndexed { index, i ->
            if (index == 0) {
                curNum = i
                curLength = 1
            } else {
                if (i == curNum + if (flag) 1 else -1) {
                    flag = flag.not()
                    curNum = i
                    curLength++
                    if (curLength >= 2 && curLength > maxLength) {
                        maxLength = curLength
                    }
                } else {
                    if (i - curNum == 1) {
                        curLength = 2
                        flag = false
                    } else {
                        curLength = 1
                        flag = true
                    }
                    curNum = i
                }
            }
        }

        return maxLength.takeIf { it >= 2 } ?: -1
    }
}

fun main() {
    Solution().apply {
        alternatingSubarray(intArrayOf(2, 3, 4, 3, 4)).also(::println)
        alternatingSubarray(intArrayOf(4, 5, 6)).also(::println)
    }
}