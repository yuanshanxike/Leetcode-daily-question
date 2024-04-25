package `2788`

class Solution2788 {
    fun splitWordsBySeparator(words: List<String>, separator: Char): List<String> =
        words.flatMap {
            it.split(separator).filterNot { str -> str == "" }
        }
}

fun main() {
    val words = listOf("one.two.three","four.five","six")
    val separator = '.'
    println(Solution2788().splitWordsBySeparator(words, separator))

    val words1 = listOf("\$easy\$", "\$problem\$")
    val separator1 = '$'
    println(Solution2788().splitWordsBySeparator(words1, separator1))

    val words2 = listOf("|||")
    val separator2 = '|'
    println(Solution2788().splitWordsBySeparator(words2, separator2))
}