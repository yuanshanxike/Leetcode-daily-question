using Extension;

namespace L743 {
    public class Solution {
        /// <summary>
        /// Dijkstra 算法
        /// 答案为 k 到其余节点的最短路的最大值
        /// </summary>
        /// <param name="times"></param>
        /// <param name="n"></param>
        /// <param name="k"></param>
        /// <returns></returns>
        public int NetworkDelayTime(int[][] times, int n, int k) {
            List<(int, int)>[] g = Enumerable.Range(0, n + 1).Select(_ => new List<(int, int)>()).ToArray();
            foreach ((int u, int v, int w) in times) {
                if (g[u] == null) g[u] = [];
                g[u].Add((v, w));
            }
            int[] dist = new int[n + 1];
            for (int i = 1; i <= n; i++) {
                dist[i] = int.MaxValue;
            }
            dist[k] = 0;
            bool[] visited = new bool[n + 1];
            var minHeap = new PriorityQueue<int, int>(Comparer<int>.Create((w1, w2) => w1.CompareTo(w2)));
            minHeap.Enqueue(k, 0);
            while (minHeap.Count > 0) {
                minHeap.TryDequeue(out int cur, out int dis);

                if (visited[cur]) continue;
                visited[cur] = true;

                foreach ((int v, int w) in g[cur]) {
                    // 松弛操作
                    if (dist[cur] + w < dist[v]) {
                        dist[v] = dist[cur] + w;
                        minHeap.Enqueue(v, dist[v]);
                    }
                }
            }

            int costTime = dist.Max();

            return costTime == int.MaxValue ? -1 : costTime;
        }
    }
}