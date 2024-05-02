package source.`2129`.将标题首字母大写

class Solution {
    fun capitalizeTitle(title: String): String {
        val chars = "$title ".toCharArray()
        var curFirstLetterIdx = -1
        var letterSize = 0
        fun lowercaseLetter(low: Char): Char {
            letterSize++
            return low.lowercaseChar()
        }
        chars.forEachIndexed { index, c ->
            if (c == ' ') {
                if (letterSize > 2) {
                    chars[curFirstLetterIdx] = chars[curFirstLetterIdx].uppercaseChar()
                }

                curFirstLetterIdx = -1
                letterSize = 0
            } else if (curFirstLetterIdx == -1) {
                curFirstLetterIdx = index
                chars[index] = lowercaseLetter(c)
            } else {
                chars[index] = lowercaseLetter(c)
            }
        }
        return chars.joinToString("").substring(title.indices)
    }

    fun capitalizeTitle_0(title: String): String {
        val letters = title.split(" ").map { it.map { c -> c.lowercaseChar() }.toMutableList() }
        letters.forEach { chars ->
            if (chars.size > 2) {
                chars.set(0, chars[0].uppercaseChar())
            }
        }
        return letters.map { it.joinToString("") }.joinToString(" ")
    }

    /**
     * 还可以用 正则表达式，直接匹配长度大于2的单词的首字母转大写，没匹配上的转小写
     */
}

fun main() {
    Solution().apply {
        capitalizeTitle("capiTalIze tHe titLe").also(::println)
        capitalizeTitle_0("capiTalIze tHe titLe").also(::println)

        capitalizeTitle("First leTTeR of EACH Word").also(::println)
        capitalizeTitle_0("First leTTeR of EACH Word").also(::println)

        capitalizeTitle("First Letter of Each Word").also(::println)
        capitalizeTitle_0("First Letter of Each Word").also(::println)

        capitalizeTitle("i lOve leetcode").also(::println)
        capitalizeTitle_0("i lOve leetcode").also(::println)
    }
}