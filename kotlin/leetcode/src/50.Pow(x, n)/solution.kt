package source.`50`.`Pow(x, n)`

class Solution {
    fun myPow(x: Double, n: Int): Double =
        if (n >= 0) binPow(x, n.toUInt()) else 1.0 / binPow(x, n.unaryMinus().toUInt())

    /**
     * 快速幂
     * @n 非负
     */
    private fun binPow(x: Double, n: UInt): Double {
        var base = x
        var pow = n
        var res = 1.0
        while (pow > 0u) {
            if (pow and 1u == 1u) res *= base
            base *= base
            pow = pow.shr(1)
        }
        return res
    }
}

fun main() {
//    Solution().apply {
//        myPow(2.0, 10).also(::println)
//        myPow(2.1, 3).also(::println)
//        myPow(2.0, -2).also(::println)
//        
//        myPow(2.00000, -2147483648).also(::println)
////        myPow(2.00000, 2147483648).also(::println)
//        println(Int.MIN_VALUE.unaryMinus())
//        println(Int.MIN_VALUE.toUInt())
//        println(Int.MIN_VALUE.unaryMinus().toUInt())
//        println(Int.MAX_VALUE.unaryMinus())
//    }

//    var str = ""
//    var value = Int.MIN_VALUE + 1
//    repeat(Int.SIZE_BITS) { idx ->
//        str = (value and 1).toString() + str
//        if ((idx + 1) % 8 == 0) {
//            str = " $str"
//        }
//        value = value.shr(1)
//    }
//    println(str)

    // 模拟逻辑电路实现数字取反
    var value = Int.MIN_VALUE
    repeat(Int.SIZE_BITS) { idx ->
        value = value xor 1.shl(idx) // 反码
    }
    value++ // 补码
    println(value)
}