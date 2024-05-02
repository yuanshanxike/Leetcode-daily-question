/**
 * Definition for a QuadTree node.
 * class Node(var `val`: Boolean, var isLeaf: Boolean) {
 *     var topLeft: Node? = null
 *     var topRight: Node? = null
 *     var bottomLeft: Node? = null
 *     var bottomRight: Node? = null
 * }
 */

class Node(var value: Boolean, var isLeaf: Boolean) {
    var topLeft: Node? = null
    var topRight: Node? = null
    var bottomLeft: Node? = null
    var bottomRight: Node? = null
}

/**
 * The `Solution` class provides functionality to intersect two QuadTree structure and construct a new QuadTree based on the intersection.
 *
 * Inside the `Solution` class, the primary method is:
 * `intersect(quadTree1: Node?, quadTree2: Node?): Node?`
 *
 * This method accepts two QuadTree node parameters and returns a new QuadTree Node which is constructed out of the intersection of these two QuadTrees.
 *
 * First, it checks if the first QuadTree (quadTree1) is a leaf. If it is, and the value is true, it returns a new Node with value 'true' and 'isLeaf' as true. If the value is false,
 * it returns the second QuadTree (quadTree2).
 *
 * If the second QuadTree (quadTree2) is a leaf, then the method calls itself, interchanging the position of quadTree1 and quadTree2.
 *
 * Next, it recursively carries out the intersection operation on the topLeft, topRight, bottomLeft, and bottomRight segments of the QuadTrees.
 * After that, it checks if all the intersected segments are leaf nodes with the same value, and if true, it returns a new Node with the common leaf value and 'isLeaf' as true.
 * Else, it constructs a new Node with the logical 'OR' of values of quadTree1 and quadTree2 if they are not null and 'isLeaf' as false, assigning the intersected segments appropriately.
 */

class Solution {
    fun intersect(quadTree1: Node?, quadTree2: Node?): Node? {
        if (quadTree1?.isLeaf == true) {
            // 1 | x = 1; 0 | x = x 
            return if (quadTree1.value)
            // equar quadTree1
                Node(true, true)
            else
                quadTree2?.run {
                    Node(value, isLeaf).also {
                        it.topLeft = topLeft
                        it.topRight = topRight
                        it.bottomLeft = bottomLeft
                        it.bottomRight = bottomRight
                    }
                }
        }
        if (quadTree2?.isLeaf == true)
            return intersect(quadTree2, quadTree1)
        val qtl = intersect(quadTree1?.topLeft, quadTree2?.topLeft)
        val qtr = intersect(quadTree1?.topRight, quadTree2?.topRight)
        val qbl = intersect(quadTree1?.bottomLeft, quadTree2?.bottomLeft)
        val qbr = intersect(quadTree1?.bottomRight, quadTree2?.bottomRight)
        // if qtl/qtr/qbl/qbr are both leaf node, and they含む values are 全部同じなら、become to a 1*1 matrix
        return if (qtl?.isLeaf == true && qtr?.isLeaf == true && qbl?.isLeaf == true && qbr?.isLeaf == true &&
                qtl.value == qtr.value && qtl.value == qbl.value && qtl.value == qbr.value) {
            Node(qtl.value, true)
        } else {
            Node(quadTree1!!.value or quadTree2!!.value, false).apply {
                topLeft = qtl
                topRight = qtr
                bottomLeft = qbl
                bottomRight = qbr
            }
        }
    }
}

fun main() {
//    Solution().intersect()
}