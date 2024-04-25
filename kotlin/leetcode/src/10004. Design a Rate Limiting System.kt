fun main(args: Array<String>) {
    // Try adding program arguments via Run/Debug configuration.
    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.

    RateLimiter(3, 5).also { limter ->
        println("${
            limter.shouldAllow(1)
        },${
            limter.shouldAllow(1)
        },${
            limter.shouldAllow(2)
        },${
            limter.shouldAllow(3)
        },${
            limter.shouldAllow(8)
        }")
    }
}

/* 滑动窗口 */
class RateLimiter(private val n: Int,private val t: Int) {

    private val deque = ArrayDeque<Int>(mutableListOf())

    fun shouldAllow(timestamp: Int): Boolean {
        while (deque.isNotEmpty() && deque.first() <= timestamp - t)
            deque.removeFirst()
        return if (deque.size < n) {
            deque.addLast(timestamp)
            true
        } else false
    }
}

/**
* Your RateLimiter object will be instantiated and called as such:
* var obj = RateLimiter(n, t)
* var param_1 = obj.shouldAllow(timestamp)
*/