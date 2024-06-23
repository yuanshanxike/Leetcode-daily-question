package source. `520`.`检测大写字母`

class Solution {
    /**
     * 统计大写字母的数量，符合条件的字符串，要么大写字母数等于字符串长度，要么为 1，且是首字母，要么为 0
     */
    fun detectCapitalUse(word: String): Boolean {
        val n = word.length
        val cnt = word.filter { it in 'A' .. 'Z' }.length
        return cnt == n || cnt == 0 || cnt == 1 && word[0] in 'A' .. 'Z'
    }
}