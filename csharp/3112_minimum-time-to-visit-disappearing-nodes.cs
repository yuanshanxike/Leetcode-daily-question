using Extension;

namespace L3112;

public class Solution {
    /// <summary>
    /// 根据 disappear 的限制跑 Dijkstra 算法
    /// </summary>
    /// <param name="n"></param>
    /// <param name="edges"></param>
    /// <param name="disappear"></param>
    /// <returns></returns>
    public int[] MinimumTime(int n, int[][] edges, int[] disappear) {
        // 邻接表
        var g = new List<(int v, int len)>[n];
        g = g.Select(_ => new List<(int v, int len)>()).ToArray();
        foreach (var (u, v, len) in edges) {
            g[u].Add((v, len));
            g[v].Add((u, len));
        }
        var dis = new int[n]; // 最短距离数组
        Array.Fill(dis, -1);
        dis[0] = 0;
        PriorityQueue<int, int> pq = new(Comparer<int>.Create((x, y) => x - y));  // 稀疏图使用优先队列方式的 Dijkstra 算法（含有已经确定了最短路径的节点和它们相邻的节点）
        pq.Enqueue(0, 0);
        while (pq.TryDequeue(out int x, out int dx)) {
            if (dx > dis[x]) continue;   // dx 为（从起点到）已经被更新过距离的节点的旧距离
            foreach (var (y, len) in g[x]) { // 更新(已经确定了最小距离的节点的)相邻节点的最小距离
                int newDis = dx + len;
                if (newDis < disappear[y] && (dis[y] == -1 || newDis < dis[y])) {
                    dis[y] = newDis;
                    pq.Enqueue(y, newDis);
                }
            }
        }
        return dis;
    }

}