package source.`2402`.`会议室 III`

import java.util.PriorityQueue

class Solution {
    fun mostBooked(n: Int, meetings: Array<IntArray>): Int {
        // pair <EndTime, roomNo> 存放结束时间和房间号的优先队列（小根堆）
        val meetingQueue = PriorityQueue<Pair<Int, Int>>(n) { (a, b), (c, d) ->
            if (a != c) {
                a - c
            } else {  // 会议的结束时间相等时，返回编号最小的
                b - d
            }
        }
//        // pair <roomNo, useTimes> 存放房间号和使用次数的优先队列（大根堆）
//        val useTimesQueue = PriorityQueue<Pair<Int, Int>>(n) { (a, b), (c, d) ->
//            if (b != d) {
//                d - b
//            } else { // 被使用次数相等时，返回编号最小的
//                a - c
//            }
//        }
        val emptyRoomQueue = PriorityQueue<Int>(n) // 提供当前空闲且编号最小房间号的小根堆
        repeat(n) {
            emptyRoomQueue.offer(it)
        }
        // entry <roomNo, useTimes> (因为房间被多次使用并记录使用次数，最后找被使用次数最多的只需要一次遍历[O(1),O(1),O(1),...,O(n)]。而优先队列在这里使用的话，恰好次数恰好相反[O(n),O(n),O(n),...,O(1)]，所以这里使用 hash 会更高效)
        val hash = hashMapOf<Int, Int>()
        fun count(roomNo: Int) {
            hash[roomNo] = hash[roomNo]?.run { this + 1 } ?: 1 // 使用计数
        }

        fun handleFinishMeeting(curTime: Int)/*: Int*/ {
//            var maxEndTime = 0
            while (meetingQueue.isNotEmpty() && meetingQueue.peek().first <= curTime) {
                val (endTime, roomNo) = meetingQueue.poll()
                count(roomNo)
                emptyRoomQueue.offer(roomNo) // 腾出来的会议室放入空房间
//                maxEndTime = max(maxEndTime, endTime)
//                maxEndTime = endTime
            }
//            return maxEndTime
        }
        meetings.sortedBy { it[0] }.forEach {
            val curTime = it[0]
            handleFinishMeeting(curTime)

            if (emptyRoomQueue.isNotEmpty()) {
                val endTime = it[1]
                meetingQueue.offer(endTime to emptyRoomQueue.poll())
            } else { // 所有房间当前都被占用
                val meetingLength = it[1] - it[0]
                val (endTime, roomNo) = meetingQueue.poll()
                count(roomNo)
                emptyRoomQueue.offer(roomNo)
                meetingQueue.offer(endTime + meetingLength to emptyRoomQueue.poll()) // 取空房间中最小房间号的房间给新的会议
            }
        }

        handleFinishMeeting(500_000) // 使得所有会议结束

//        // 会议结束后，把 meetingQueue 中占用的会议室全部释放（出队）(其实此时队列中只有最有一个会议的会议室了)，并记录相应的使用次数
//        while (meetingQueue.isNotEmpty()) {
//            val (_, roomNo) = meetingQueue.poll()
//            count(roomNo)
//        }

        var maxUseRoomNo = 0
        var maxTimes = 0
        hash.entries.sortedBy { (roomNo, _) -> roomNo }.forEach { (roomNo, useTimes) ->
            println("roomNo: $roomNo, useTimes: $useTimes")
            if (useTimes > maxTimes) {
                maxTimes = useTimes
                maxUseRoomNo = roomNo
            }
        }
        return maxUseRoomNo
    }
}

fun main() {
    Solution().apply {
        mostBooked(2, arrayOf(intArrayOf(0, 10), intArrayOf(1, 5), intArrayOf(2, 7), intArrayOf(3, 4))).also(::println)
        mostBooked(3, arrayOf(intArrayOf(1, 20), intArrayOf(2, 10), intArrayOf(3, 5), intArrayOf(4, 9), intArrayOf(6, 8))).also(::println)
        mostBooked(2, arrayOf(intArrayOf(0, 10), intArrayOf(1, 2), intArrayOf(12, 14), intArrayOf(13, 15))).also(::println)
    }
}