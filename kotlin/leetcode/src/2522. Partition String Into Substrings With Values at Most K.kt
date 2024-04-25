import kotlin.math.log10
import kotlin.math.min
import kotlin.text.digitToInt

class Solution2522 {
    fun minimumPartition(s: String, k: Int): Int {
        val kLength = log10(k.toDouble()).toInt() + 1
        var minP = 0
        var start = 0 //　待完成 partition 的部分的开始位置
        if (kLength > 1) {
            while (start < s.length) {
                val p = s.substring(start, min(start + kLength, s.length)).toInt()
                start += kLength - if (p > k) 1 else 0 // 每次贪心取数，尽可能取和 k 位数相同的长度，如果取不了就减少一位
                minP++
            }
        } else {
            apply hitotsunobaai@{
                s.forEach {
                    if (it.digitToInt() > k) {
                        minP = -1
                        return@hitotsunobaai
                    } else {
                        minP++
                    }
                }
            }
        }
        return minP
    }
}

fun main() {
    val s = Solution2522()
    println(s.minimumPartition("238182", 5))
    println(s.minimumPartition("1", 1))
    println(s.minimumPartition("1829727651", 10))
}