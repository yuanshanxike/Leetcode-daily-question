/**
 * 思路其实就是二分查找。
 * 先想到了从可能取到的最长长度开始，每次长度去减少1去验证是否达到需要的段数。但是在数据了很大时会超时。
 * 考虑到随着剪裁长度的减小，其实能得到的段数是单调增加的（不需要是线性关系）
 * 此时就很自然可以知道，通过二分查找来优化，降低循环次数
 */
fun solution(a: MutableList<Int>, k: Int): Int {
    var l = 1
    var r = a.maxOrNull() ?: 1
    var length = 0
    var parts: Int

    while (l < r) {
        length = (l + r) / 2
        parts = 0
        for (L in a) {
            if (L >= length) {
                parts += L / length
            }
        }

        if (parts < k) {
            r = --length
        } else {
            l = ++length
        }
    }

    // re-verify
    parts = 0
    for (L in a) {
        parts += L / length
    }

    return if (parts < k) length - 1 else length
}