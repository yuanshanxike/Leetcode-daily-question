package source.`1239`.` 串联字符串的最大长度`

import kotlin.math.max

class Solution {
    /**
     * 对于数组中的每个元素，可以选择或者不选。
     * （就像二叉树一样，每层可以表示一个数组元素，可以选择它或不选就是二叉树的两个分叉）
     * 通过DFS递归回溯，就可以枚举所有 case
     * 预先对每个元素判断是否有重复字母
     */
    fun maxLength(arr: List<String>): Int {
        ans = 0
        // 先把字符串转换到二进制，有26位，0表示不选，1表示选中
        // 对于自身没有重复字符的字符串，加入到数组中
        val masks = arr.map { str ->
            var mask = 0
            apply loop@{
                str.forEach { c ->
                    val ch = c - 'a'
                    if (mask.shr(ch) and 1 == 0) {
                        mask += 1.shl(ch)
                    } else {
                        mask = 0
                        return@loop
                    }
                }
            }
            mask.takeIf { it > 0 }
        }.filterNotNull()

        backtrack(masks, 0, 0)
        return ans
    }

    private var ans = 0

    /**
     * DFS ()查找
     */
    private fun backtrack(arr: List<Int>, pos: Int, mask: Int) {
        // 每次完成时，与缓存的长度取最大值
        if (pos == arr.size) {
            ans = max(ans, Integer.bitCount(mask))
            return
        }
        // DFS 剪枝
        if (mask and arr[pos] == 0) { // 没有重复的字母
            backtrack(arr, pos + 1, mask or arr[pos]) // （可以）选
        }
        backtrack(arr, pos + 1, mask) // （可以）不选
    }
}

fun main() {
    Solution().apply {
        maxLength(listOf("un", "iq", "ue")).also(::println)
        maxLength(listOf("cha", "r", "act", "ers")).also(::println)
        maxLength(listOf("abcdefghijklmnopqrstuvwxyz")).also(::println)
        maxLength(listOf("aaaaaaaaa")).also(::println)
    }
}