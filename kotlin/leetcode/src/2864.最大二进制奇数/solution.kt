package source.`2864`.最大二进制奇数

class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        var oneNum = 0
        s.forEach {
            if (it == '1') oneNum++
        }
        val chars = CharArray(s.length) { '0' }
        repeat(oneNum - 1) {
            chars[it] = '1'
        }
        chars[chars.lastIndex] = '1'
        return chars.joinToString("")
    }
}