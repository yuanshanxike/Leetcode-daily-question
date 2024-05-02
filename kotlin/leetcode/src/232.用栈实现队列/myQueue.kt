import java.util.Stack

class MyQueue() {
    val stack1 = Stack<Int>() // 入队
    val stack2 = Stack<Int>() // 出队

    fun push(x: Int) {
        stack1.push(x)
    }

    fun pop(): Int {
        return withFillOutputStackIfNeed {
            stack2.pop()
        }
    }

    fun peek(): Int {
        return withFillOutputStackIfNeed {
            stack2.peek()
        }
    }

    fun empty(): Boolean {
        return stack1.isEmpty() && stack2.isEmpty()
    }

    private fun <T> withFillOutputStackIfNeed(call: () -> T): T {
        if (stack2.isEmpty()) {
            while (stack1.isNotEmpty()) {
                stack2.push(stack1.pop())
            }
        }
        return call()
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */