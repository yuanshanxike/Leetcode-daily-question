namespace L1146;

public class SnapshotArray {

    private readonly List<Tuple<int, int>>[] snapshotArr;

    private int snapId = 0;

    public SnapshotArray(int length) {
        snapshotArr = new List<Tuple<int, int>>[length];
        for (int i = 0; i < length; i++)
        {
            snapshotArr[i] = [Tuple.Create(snapId, 0)];
        }
    }
    
    public void Set(int index, int val) {
        var idxSnapshotList = snapshotArr[index];
        var lastIdx = idxSnapshotList.Count - 1;
        if (idxSnapshotList.Last().Item1 == snapId)
        {
            idxSnapshotList[lastIdx] = Tuple.Create(snapId, val);
        } else {
            snapshotArr[index].Add(Tuple.Create(snapId, val));
        }
    }
    
    public int Snap() => snapId++;
    
    public int Get(int index, int snap_id) {
        var idxSnapshotList = snapshotArr[index];
        var target = Tuple.Create(snap_id, -1);
        Comparison<Tuple<int, int>> compare = (x, y) => {
            var (x1, _) = x;
            var (y1, _) = y;
            return x1 - y1;
        };
        var idx = idxSnapshotList.BinarySearch(0, idxSnapshotList.Count, target, Comparer<Tuple<int, int>>.Create(compare));
        if (idx < 0) idx = ~idx - 1; // 当查找的位置在指定版本无记录时，找到该位置历史记录中第一个比当前 snapId 版本小的历史版本数据
        return idxSnapshotList[idx].Item2;
    }
}