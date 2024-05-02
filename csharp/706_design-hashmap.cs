namespace L706;

public class MyHashMap {

    private class Node(int key, int val)
    {
        internal int key = key;
        internal int val = val;
        internal Node? left = null;
        internal Node? right = null;
    }

    private readonly Node?[] nodes;

    private const int MOD = 769;  // 为了尽可能避免冲突，应当将 MOD 取为一个质数。

    public MyHashMap() {
        nodes = new Node[MOD];
    }
    
    public void Put(int key, int value) {
        var hash = key % MOD;
        var root = nodes[hash];
        if (root == null)
        {
            nodes[hash] = new Node(key, value);
        }
        else
        {
            var find = BinarySearch(root, key);
            if (find.key < key)
            {
                find.right = new Node(key, value);
            }
            else if (key < find.key)
            {
                find.left = new Node(key, value);
            }
            else // key == find.key
            {
                find.val = value;
            }
        }
    }
    
    public int Get(int key) {
        var hash = key % MOD;
        var root = nodes[hash];
        if (root == null) return -1;
        var find = BinarySearch(root, key);
        return  find.key == key ? find.val : -1;
    }
    
    public void Remove(int key) {
        if (Get(key) != -1) {
            var hash = key % MOD;
            var root = nodes[hash];
            nodes[hash] = Remove(root, key);
        }
    }

    private Node BinarySearch(Node root, int key)
    {
        if (root.key == key) return root;  // 找到
        else if (key < root.key)
        {
            if (root.left != null) return BinarySearch(root.left, key);
            else return root;
        }
        else // root.key < key
        {
            if (root.right != null) return BinarySearch(root.right, key);
            else return root;
        }
    }

    private Node? Remove(Node? root, int key)
    {
        if (root == null) return null;
        if (key < root.key) root.left = Remove(root.left, key);
        else if (root.key < key) root.right = Remove(root.right, key);
        // root.key == key
        else if (root.left != null && root.right != null)
        {
            var find = BinarySearch(root.right, key);  // 查找右子树中最小的数（也就是刚好比 key 大一点的数）
            root.key = find.key;
            root.val = find.val;
            root.right = Remove(root.right, root.key);
        }
        else
        {
            root = root.left ?? root.right;
        }
        return root;
    }
}



// 开放地址法
public class MyHashMap_Open_Addressing {
    private const int MAX_OPT_TIMES = (int)1e4 + 9;

    private const int OFFSET = 1;  // 地址冲突时的偏移量

    // <key, value, isDeleted>
    private readonly Tuple<int, int, bool>?[] arr = new Tuple<int, int, bool>[MAX_OPT_TIMES];

    public void Put(int key, int value) {
        var hash = Hash(key);
        arr[hash] = Tuple.Create(key, value, false);
    }

    public int Get(int key) {
        var hash = Hash(key);
        var node = arr[hash];
        if (node != null)
        {
            var (_, val, isDeleted) = node;
            return isDeleted ? -1 : val;
        }
        return -1;
    }

    public void Remove(int key) {
        var hash = Hash(key);
        // arr[hash] = null;  // 删除不能简单地置为 null，否则将导致地址冲突的其他 key (未被删除的)在调用 GET() 时可能获取到 -1;
        var node = arr[hash];
        if (node != null) {
            var (_, val, _) = node;
            arr[hash] = Tuple.Create(key, val, true);
        }
    }

    private int Hash(int key) {
        int hash;
        for (hash = key % MAX_OPT_TIMES; arr[hash] != null && arr[hash]?.Item1 != key; hash += OFFSET) {
            hash %= MAX_OPT_TIMES;  // 取模防止越界
        }
        return hash;
    }
}