

package source.`2663`.` 字典序最小的美丽字符串`

class Solution {
    /**
    * 因为题目有说 s 是美丽字符串, 所以 s 的任意子串都是非回文的。
    * 现在需要修改字符串，只考虑每次仅修改一个字符。
    * 因为我们需要字典序尽量小，所以对于每次修改，会尽量去选择修改最后一个字符，使其 “+1”。
    * 此时分为产生进位或者没有进位两种 case。
    * 不产生进位：对于最后一个字符的改变，有可能出现的回文串只有 最后两个字符 或 最后的三个字符（因为他们的前面所有字符不能够构成回文串，而且后面的回文串拼接上前面的非回文串后，不能够产生新的回文串）。
    * 那么从后往前只改变一个字符时，只需要检查它和前面两个相邻字符是非相同，不相同则没有产生回文串，是美丽字符串。
    * 产生进位：最后一个字符变成 'a'，前一个字符 “+1”。
    * 无论什么 case，产生变化后都需要用上述的检测方法，进行回文串检测。假如 “+1” 的字符（不包括由于产生进位变成 'a' 的）导致产生了回文串，
    * 说明还没找到需求的字符串，需要再对其进行 “+1” 操作，然后再进行检测......
    * 直到 s 中的最后一个字符完成检测（返回结果） 或者 s 中的第一个字符产生进位（触发边界，找不到符合需求的字符串，返回 ""）
    *
    * Q:为什么不先在 “变成'a'的字符” 的位置进行回文检测？
    * A:需要保证字典序尽可能小，'a' 保证了低位是最小字典序。如果被进位而 “+1” 的字符处有回文的话，先被增加的 'a'，在其前一位增加时，需要重新置为 'a' 进行检查。
    * 所以直接先检测被进位字符处收否产生回文，可以避免一些无效、多余的计算。
    */
    fun smallestBeautifulString(s: String, k: Int): String {
        val n = s.length
        val mod = 'a' + k
        val str = s.toMutableList()
        var i = n - 1  // 初始指向最后一个字符
        str[i]++  // 先加一
        
        fun checkPalindromic(i: Int) = i > 0 && str[i] == str[i - 1] || i > 1 && str[i] == str[i - 2] 
        
        while (i < n) {
            if (str[i] < mod) {
                if (checkPalindromic(i)) {
                    // 有回文
                    str[i]++
                } else {
                    i++
                }
            } else {
                if (i == 0) return ""
                str[i] = 'a'
                str[--i]++
            }
        }
        return str.joinToString("")
    }
}

fun main() {
    val s = Solution()
    println(s.smallestBeautifulString("abcz", 26))
    println(s.smallestBeautifulString("dc", 4))
    println(s.smallestBeautifulString("dacd", 4))
}