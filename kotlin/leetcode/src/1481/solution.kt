package `1481`

import java.util.PriorityQueue
import java.util.TreeMap

class Solution {
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        if (k == arr.size) return 0
        if (k == arr.lastIndex) return 1
        
        val queue = PriorityQueue<Int>()
        // <num, number of num>
        val hash = HashMap<Int, Int>()
        arr.forEach {
            hash[it]?.also { value ->
                hash[it] = value + 1
            } ?: apply {
                hash[it] = 1
            }
        }
        
        var kTemp = k
        var variety = hash.size
        hash.values.forEach { queue.offer(it) }
        while (kTemp > 0 && queue.isNotEmpty()) {
            kTemp -= queue.poll()
            if (kTemp >= 0) {
                variety--
            } else {
                break
            }
        }
        
        return  variety
        
//        TreeMap<Float, Int>()
//        
//        hash.toSortedMap { a, b ->  }
    }
}

fun main() {
    Solution().apply {
        findLeastNumOfUniqueInts(intArrayOf(5,5,4), 1).also(::println)
        findLeastNumOfUniqueInts(intArrayOf(4,3,1,1,3,3,2), 3).also(::println)
    }
}