using System.Security.Cryptography;

namespace L705;

/// <summary>
/// 可以借鉴 JVM 中，Hash 表的实现，
/// 散列到一个不算太大的数组范围内，取模找到该元素在数组中的放置位置，
/// 对于撞 key 的情况，在相同位置撞 key 数小于 8 时，存为 链表，大于 8 时存为红黑树
/// （红黑树的实现太过复杂了(主要指的是代码量)，这里直接使用二叉搜索树代替单链表和红黑树来进行实现）
/// </summary>
public class MyHashSet
{

    private class Node(int val)
    {
        internal int val = val;
        internal Node? left = null;
        internal Node? right = null;
    }

    private readonly Node?[] nodes;

    // private const int MAX_DUPLICATE_KEY_NUM = 1 << 9;

    // private const int MOD = (int)1e6 / MAX_DUPLICATE_KEY_NUM;
    private const int MOD = 769;  // 为了尽可能避免冲突，应当将 MOD 取为一个质数。

    public MyHashSet()
    {
        nodes = new Node[MOD];
    }

    public void Add(int key)
    {
        var hash = key % MOD;
        var root = nodes[hash];
        var newNode = new Node(key);
        if (root == null)
        {
            nodes[hash] = newNode;
        }
        else
        {
            var find = BinarySearch(root, key);
            if (find.val < key)
            {
                find.right = newNode;
            }
            else if (key < find.val)
            {
                find.left = newNode;
            }
        }
    }

    public void Remove(int key)
    {
        // var iKey = key % MOD;
        // var root = nodes[iKey];
        // if (root != null) {
        //     var find = BinarySearch(root, key);
        //     if (find.val != key) return; // 不存在需要删除的节点
        //     else {
        //         Remove(find);
        //     }
        // } else return;

        if (Contains(key))
        {
            var hash = key % MOD;
            var root = nodes[hash];
            nodes[hash] = Remove(root, key);
        }
    }

    public bool Contains(int key)
    {
        var hash = key % MOD;
        var root = nodes[hash];
        if (root == null) return false;
        return BinarySearch(root, key).val == key;
    }

    /// <summary>
    /// 返回 key 或者 当前二叉查找树中刚好比它小 或者 刚好比它大的数对应的节点
    /// </summary>
    /// <param name="root"></param>
    /// <param name="key"></param>
    /// <returns></returns>
    private Node BinarySearch(Node root, int key)
    {
        if (root.val == key) return root;  // 找到
        else if (key < root.val)
        {
            if (root.left != null) return BinarySearch(root.left, key);
            else return root;
        }
        else
        { // root.val < key
            if (root.right != null) return BinarySearch(root.right, key);
            else return root;
        }
    }

    /***********************************这种做法不太好用代码实现（node 为叶子节点的情况没有实现）*******************************************/
    // /// <summary>
    // /// 从二叉查找树中删除节点时，可以在需要被删除节点的左子树中取最靠右的节点的值对其进行替换后再删除这个最靠右的这个节点；
    // /// 或者在其右子树中取最靠左的节点值对其进行替换后在删除这个最靠左的节点。
    // /// 
    // /// 两种做法都是正确的，这里我们采用“在右子树中找最左”的方式。
    // /// 因为每次找到的这个“最左”节点，并不能保证是叶子节点（不是叶子节点不好处理删除操作），
    // /// 所以我们遇到要删除的节点不是叶子节点的话，就递归替换值
    // /// 
    // /// 找到的这个“最左”节点，一定是没有左孩子的
    // /// </summary>
    // /// <param name="node"></param>
    // private void Remove(Node node) {
    //     var root = node.right;
    //     if (root != null) {
    //         var min = BinarySearch(root, node.val);
    //         node.val = min.val;
    //         if (min.val == node.right?.val) node.right = null;
    //         else Remove(min);
    //     } else {
    //         root = node.left;
    //         if (root != null) {
    //             var min = BinarySearch(root, node.val);
    //             node.val = min.val;
    //             if (min.val == node.left?.val) node.left = null;
    //             else Remove(min);
    //         }
    //     }
    // }

    /// <summary>
    /// 懒惰删除结点
    /// </summary>
    /// <param name="root"></param>
    /// <param name="key"></param>
    /// <returns></returns>
    private Node? Remove(Node? root, int key)
    {
        if (root == null) return null;
        if (key < root.val) root.left = Remove(root.left, key);
        else if (root.val < key) root.right = Remove(root.right, key);
        // root.val == key
        else if (root.left != null && root.right != null)
        {
            root.val = BinarySearch(root.right, key).val; // 查找右子树中最小的数（也就是刚好比 key 大一点的数）
            root.right = Remove(root.right, root.val);
        }
        else
        {
            root = root.left ?? root.right;
        }
        return root;
    }
}


// 分桶数组 做法（兼顾时间可空间效率，同时也是用到位运算）
public class MyHashSet_bucket {

    private const int INT_BIT_COUNT = sizeof(int) * 8;

    // 每个 int 是一个数据桶（能装(表示) 32 个元素），至少需要 ⌈10^6 / 32⌉ 个这样的桶
    private readonly int[] buckets = new int[(int)1e6 / INT_BIT_COUNT + 1];

    public void Add(int key) {
        var (idx, offset) = Pos(key);
        buckets[idx] |= 1 << offset;
    }

    public void Remove(int key) {
        var (idx, offset) = Pos(key);
        buckets[idx] &= ~(1 << offset);
    }

    public bool Contains(int key) {
        var (idx, offset) = Pos(key);
        return (buckets[idx] >> offset & 1) == 1;
    }

    private Tuple<int, int> Pos(int key) {
        var idx = key / INT_BIT_COUNT; // 计算出所在桶的编号
        var offset = key % INT_BIT_COUNT; // 计算出在桶中的位置
        return Tuple.Create(idx, offset);
    }
}