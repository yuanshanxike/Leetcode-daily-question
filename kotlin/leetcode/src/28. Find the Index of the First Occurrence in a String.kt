/**
 * KMP
 */
class Solution_28 {
    fun strStr(haystack: String, needle: String): Int {
        val next = getNext(needle)
        var i = 0
        var j = 0

        if (haystack < needle)

        while (i < haystack.length && j < needle.length) {
            if (j == -1 || haystack[i] == needle[j]) {
                i++
                j++
            } else {
                j = next[j]
            }
        }

        return if (j == needle.length) i - needle.length else -1
    }

    private fun getNext(pattern: String): IntArray {
        val nextArray = IntArray(pattern.length)

        // 构件一对前后指针，分别表示后缀的开始位置和前缀的结束位置
        var i = 0
        var j = -1

        nextArray[0] = -1 // 没有匹配的时候，前缀后指针需要移动到 -1 的位置，表示没有匹配的前缀 (同时也是与主串比较时，主串指针前进的标志)

        while (i < pattern.length - 1) {
            if (j == -1 || pattern[j] == pattern[i]) {
                nextArray[++i] = ++j
            } else {
                j = nextArray[j]
            }
        }

        return nextArray
    }
}

fun main () {
//    print(Solution_28().getNext("issip").contentToString())
    print(Solution_28().strStr("mississippi", "issip"))
}