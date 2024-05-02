package source.`365`.` 水壶问题`

import kotlin.math.max
import kotlin.math.min

class Solution {
    /**
     * 仔细想，这道题其实是求最大公约数
     */
    fun canMeasureWater(jug1Capacity: Int, jug2Capacity: Int, targetCapacity: Int): Boolean {
        if (targetCapacity > jug1Capacity + jug2Capacity) return false

        var temp1 = max(jug1Capacity, jug2Capacity)
        var temp2 = min(jug1Capacity, jug2Capacity)
        while (temp1 != temp2) {
            val temp = temp1 - temp2
            temp1 = max(temp2, temp)
            temp2 = min(temp2, temp)
        }

        return targetCapacity % temp1 == 0
    }
}

fun main() {
    Solution().apply {
        canMeasureWater(3, 5, 4).also(::println)
        canMeasureWater(2, 6, 5).also(::println)
        canMeasureWater(1, 2, 3).also(::println)
    }
}