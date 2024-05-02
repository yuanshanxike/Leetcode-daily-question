package source.`299`.猜数字游戏

class Solution {
    fun getHint(secret: String, guess: String): String {
        val hash = IntArray(10) { 0 }  // <digit, times>
        val isBulls = BooleanArray(secret.length) { false }
        var bulls = 0
        secret.forEachIndexed { index, c ->
            if (c == guess[index]) {
                bulls++
                isBulls[index] = true
            } else {
                hash[c.digitToInt()]++
            }
        }
        var cows = 0
        guess.forEachIndexed { index, c ->
            val digit = c.digitToInt()
            if (isBulls[index].not() && hash[digit] > 0) {
                cows++
                hash[digit]--
            }
        }
        return "${bulls}A${cows}B"
    }
}