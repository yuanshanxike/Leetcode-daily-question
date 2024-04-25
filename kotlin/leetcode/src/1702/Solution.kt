package `1702`

class Solution {
    fun maximumBinaryString(binary: String): String {
        val n = binary.length
        val template = CharArray(n) { '1' }
        if (binary == template.joinToString(separator = "")) return binary
        var prefixMaskLength = 0
        var maskSize = 0
        var hasZeroBlocker = false
        binary.forEach {
            if (it == '1') {
                maskSize++
                if (hasZeroBlocker.not()) prefixMaskLength++
            } else if (hasZeroBlocker.not() && it == '0') {
                hasZeroBlocker = true
            }
        }
        // 0 -> n - 1
        // 1 -> n - 2
        // 2 -> n - 3
        val nonPrefixMaskSize = maskSize - prefixMaskLength
        return template.also { it[n - 1 - nonPrefixMaskSize] = '0' }.joinToString(separator = "")
    }
}

fun main() {
    val s = Solution();
    s.maximumBinaryString("000110").also(::println)
    s.maximumBinaryString("01").also(::println)
    s.maximumBinaryString("111101").also(::println)
    s.maximumBinaryString("101101").also(::println)
    s.maximumBinaryString("0").also(::println)
    s.maximumBinaryString("1").also(::println)
}