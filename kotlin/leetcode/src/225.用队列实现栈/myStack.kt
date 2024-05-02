package source.`225`.用队列实现栈

import java.util.LinkedList
import java.util.Queue

/*class MyStack0() {
    private val queue1 = ArrayDeque<Int>()

    private val queue2 = ArrayDeque<Int>()

    private var cur = 1  // 栈顶指针所在的队列 

    fun push(x: Int) {
        //        execEasy { (a, b) ->
        //            a.addLast(x)
        //        }
        when (cur) {
            1 -> queue1.addLast(x)
            2 -> queue2.addLast(x)
        }
    }

    fun pop(): Int {
        //        return execEasy { (a, b) ->
        //            b.removeFirst()
        //        }
        return adaptSatck(true).removeFirst()
    }

    fun top(): Int {
        //        return execEasy(true) { (a, b) ->
        //            b.first()
        //        }
        return adaptSatck().first()
    }

    fun empty(): Boolean {
        return queue1.isEmpty() && queue2.isEmpty()
    }

    private fun adaptSatck(isPop: Boolean = false): ArrayDeque<Int> {
        val a: ArrayDeque<Int>
        val b: ArrayDeque<Int>
        when (cur) {
            1 -> {
                a = queue1
                b = queue2
                if (isPop) cur = 2
            }

            else -> { // 2
                a = queue2
                b = queue1
                if (isPop) cur = 1
            }
        }
        while (a.size > 1) {
            b.addLast(a.removeFirst())
        }
        return a
    }

//    private inline fun <T> execEasy(
//        justInquire: Boolean = false,
//        crossinline call: (Pair<ArrayDeque<Int>, ArrayDeque<Int>>) -> T
//    ): T {
//        val a: ArrayDeque<Int>
//        val b: ArrayDeque<Int>
//        if (queue1.size >= queue2.size) {
//            a = queue1
//            b = queue2
//        } else {
//            a = queue2
//            b = queue1
//        }
//        val t = call(a to b)
//        if (justInquire.not()) {
//            while (a.size > 1) {
//                b.addLast(a.removeFirst())
//            }
//        }
//        return t
//    }

}*/

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/**
 * 通过两个队列实现:
 * 要让队列（先进先出）变为栈（后进先出），
 * 就要使得每次进入队列中的元素放到最前面。
 * 我们可以先将进队元素放到一个空的队列（对外只进队），
 * 再把另一个存放元素的队列（对外只出队）中的所有元素出队再入队到这个只有新进元素的队列，
 * 最后交换这两个队列对象的引用。
 *
 * 这样就能保证所有后进元素都在新进元素的前面，也就可以优先出队（构成栈的逆序）
 */
class MyStack2() {
    private var a = LinkedList<Int>()
    private var b = LinkedList<Int>()

    fun push(x: Int) {
        b.offer(x)
        while (a.isNotEmpty()) {
            b.offer(a.poll())
        }
        val temp = a
        a = b
        b = temp
    }

    fun pop(): Int {
        return a.poll()
    }

    fun top(): Int {
        return a.peek()
    }

    fun empty(): Boolean {
        return a.isEmpty()
    }
}

/**
 * 只通过一个队列实现:
 * 要让队列（先进先出）变为栈（后进先出），
 * 就要使得每次进入队列中的元素放到最前面。
 * 新元素入队之前，要记录下已经在队中元素的数量，
 * 新元素入队后，将上面记录下数量的元素出队再入队。
 *
 * 这样就能保证所有后进元素都在新进元素的前面，也就可以优先出队（构成栈的逆序）
 */
class MyStack() {
    private var queue: Queue<Int> = LinkedList()

    fun push(x: Int) {
        val n = queue.size
        queue.offer(x)
        repeat(n) {
            queue.offer(queue.poll())
        }
    }

    fun pop(): Int {
        return queue.poll()
    }

    fun top(): Int {
        return queue.peek()
    }

    fun empty(): Boolean {
        return queue.isEmpty()
    }
}