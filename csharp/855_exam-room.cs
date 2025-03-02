namespace L855;

using Interval = (int l, int r);
using IPriority = (int l, int dist);

public static class Extensions {
    public static int? Higher(this SortedSet<int> set, int t) {
        if (t + 1 > set.Max) return null;
        return set.GetViewBetween(t + 1, set.Max).Min;
    }

    public static int? Lower(this SortedSet<int> set, int t) {
        if (t - 1 < set.Min) return null;
        return set.GetViewBetween(set.Min, t - 1).Max;
    }
}

/// <summary>
/// 有序集合（维护有人坐的位置序列） + 优先队列（维护相邻两个人中点的最大距离） + 延迟删除（因为直接在优先队列中不容易删除，对于离开作为的人，先在较容易删除的有序集合中删除该人原本占据的位置，后续如果有人需要坐到与被删除位置相邻的中间位置上时，通过有序集合没有找到 [l, r] 中的任意 l 或 r，则这这个区间是非法的，此时从优先队列中删除）
/// 直观讲解：https://leetcode.cn/problems/exam-room/solutions/3029586/javapython3cyou-xu-ji-he-you-xian-dui-li-nlgg
/// </summary>
public class ExamRoom {
    private readonly SortedSet<int> seats;  // 存储当前有人的位置

    private readonly PriorityQueue<Interval, IPriority> maxHeap;  // 大顶堆，返回当前区间的中点距离最大的区间
    private readonly int N;  //  位置上限
    public ExamRoom(int n) {
        seats = [];
        maxHeap = new(Comparer<IPriority>.Create((a, b) => {
            // 函数返回正数的时候将a放在b的后面
            if (a.dist == b.dist) {
                return a.l.CompareTo(b.l);  // 区间相同的，区间靠前的优先返回（返回负数)
            } else {
                return b.dist.CompareTo(a.dist);  // 区间中点距离大的优先返回（返回正数）
            }
        }));
        
        N = n;
    }
    
    public int Seat() {
        if (seats.Count == 0) {  // 如果没有人，那么就坐在0位置
            seats.Add(0);
            maxHeap.Enqueue((0, 0), (0, 0));  // [l, r] 等于 [0, 0]，区间中点距离此时为 0
            return 0;
        }

        int l = 0, r = 0;  // 用来获取当前区间的中点距离最大的区间
        while (maxHeap.Count > 0) {
            (l, r) = maxHeap.Peek();
            // 找到首个区间端点都在 seats 中的区间
            // 因为有可能某个位置已经被删除，但对应的区间还没删除
            // 如果某个区间的左右端点都在 seats 中，且下一个位置是 r，那么这个区间就是未被删除的（合法的）
            int? higher = seats.Higher(l);  // 实际 l 的下一个有人坐的位置
            if (seats.Contains(l) && seats.Contains(r) && higher == r) {
                break;  // 该区间是合法区间
            }
            maxHeap.Dequeue();  // 否则堆顶记录的的最大区间是非法的，需要删除
        }

        int d = (r - l) / 2;  // 区间中间点的最大距离
        int ld = seats.Min, rd = N - 1 - seats.Max;  // 坐在坐在位置 0 和坐在位置 N-1 的距离
        
        int p;  // 用来获取最终坐下的位置
        if (d > ld && d >= rd) {  // 为什么是 “ d >= rd ” ？因为区间的中点距离相等时，要优先选择靠前面的区间
            // 坐在区间中点的距离最大
            p = l + d;
            // 原区间[l, r]被分为[l, p]和[p, r]
            maxHeap.Enqueue((l, p), (l, (p - l) / 2));
            maxHeap.Enqueue((p, r), (p, (r - p) / 2));
            maxHeap.Dequeue();  // 上面分成的两个新区间优先级一定小于原区间。把原区间删除（此时由于原区间在堆顶，能被立即删除）
        } else if (ld >= rd) {
            // 坐在位置 0 的距离最大
            p = 0;
            maxHeap.Enqueue((p, ld), (p, ld / 2));  // 多了一个区间 [0, 最左侧的座位]
        } else {
            // 坐在位置 N-1 的距离最大
            p = N - 1;
            maxHeap.Enqueue((p - rd, p), (p - rd, rd / 2));  // 多了一个区间 [最右侧的座位, N-1]
        }
        seats.Add(p);  // 添加这个被坐的位置
        return p;
    }
    
    public void Leave(int p) {
        if (p > seats.Min && p < seats.Max) {
            // 如果位置 p 不是有人坐的首个位置或最后一个位置，则一定是其左侧位置构成 [l,p]，右侧位置构成 [p,r] 两个区间
            // 删除位置 p，相当于少了两个区间 [l,p] 和 [p,r] , 多了区间 [l,r]
            // 但是优先队列删除元素不好执行，我们需要延迟删除
            int lower = seats.Lower(p) ?? seats.Min;
            int higher = seats.Higher(p) ?? seats.Max;
            maxHeap.Enqueue((lower, higher), (lower, (higher - lower) / 2));  // 所以这个函数中只会添加新增加的区间
        }
        seats.Remove(p);  // 删除这个座位
    }
}

/**
 * Your ExamRoom object will be instantiated and called as such:
 * ExamRoom obj = new ExamRoom(n);
 * int param_1 = obj.Seat();
 * obj.Leave(p);
 */