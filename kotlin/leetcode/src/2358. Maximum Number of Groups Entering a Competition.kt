class Solution {
    fun maximumGroups(grades: IntArray): Int =
        grades.size.toLong().let {
            // 通过二分查找搜索分组数
            var l: Long = 1.toLong()
            var r: Long = it //分组数最多不会超过学生人数
            var nGroup: Long = (1 + it) / 2
            loop@ while (l < r) {
                val nStudent = nGroup * (1 + nGroup) / 2 // 等差数列（自然数数列）前n项和
                if (nStudent > it) {
                    r = nGroup - 1
                } else {
                    // 此时有可能是对的，需要进一步验证
                    if (nStudent == it || nStudent + nGroup + 1 > it) break@loop
                    l = nGroup + 1
                }
                nGroup = (l + r) / 2
            }

            nGroup.toInt()
        }
}

/**
 * 假设有6个学生，成绩分别是{10 ,6, 12, 7, 3, 5} 排序后为{3, 5, 6, 7, 10, 12}
 * 则只需要按照顺序并按照题目要求从前到后1人{3}，2人{5, 6}，3人{7, 10, 12}分成三组，就满足题目的分组要求，并能取到最大组数。
 *
 * 如果有5个学生也类似，排序后{3, 5, 6, 7, 10}
 * 1人{3}，2人{5, 6}, 剩余的两个学生不能组成一组，不满足题目要求，所以要插入第二组里面，从而满足题目要求。
 *
 * 所以不用看每个学生具体的成绩，也就不需要排序，题解只和人数相关。
 * 同时，需要知道，按照 1, 2, 3, 4...（人） 这样的自然数序列分组，是在满足题目条件的情况下能达到的最大组数。
 * 排序后按照顺序以上述方式取人数是能直接满足后面组分数比前一组大的，所以也就不需要排序。
 */

fun main(args: Array<String>) {
    val s = Solution()
    println("${s.maximumGroups(intArrayOf(10,6,12,7,3,5))}")
    println("${s.maximumGroups(intArrayOf(8,8))}")
}