namespace L1705;

/// <summary>
/// 因为每天最多只能吃一个苹果，策略上可以选择先吃快要到期(腐烂)的苹果，
/// 把到期(腐烂)时间更晚的苹果留在之后的日期去吃，能使得可以吃上苹果的日期最多。
/// 这是一个 贪心 的策略。为了能够在任何日期里快速地取到最早要到期(腐烂)的苹果，可以使用 优先队列 来维护每天采摘批次的苹果，
/// 以到期(腐烂)日期为优先级（越早到期(腐烂)越优先），当天采摘的苹果数量为值放入到优先队列中。
/// 如果堆顶的苹果批次到期了，直接 poll，否则吃一颗，该批次的苹果数量减少 1。
/// 此外如果堆顶批次的苹果被吃完，也需要被 poll。
/// 重复上述操作，直到堆空。
/// 
/// 注意：由于不能提前吃到未长出来的苹果，需要使用 在线算法，即: 放入优先队列和统计吃苹果要同时计算（在一个循环中），不能分开进行离线计算
/// </summary>
public class Solution {
    public int EatenApples(int[] apples, int[] days) {
        var minHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => a - b));
        int n = apples.Length;
        int ans = 0;
        // for (int i = 0; i < n || minHeap.Count > 0; i++) {  // i 为自然日
        //     if (i < n && apples[i] > 0) {  // 没有产出苹果就不需要入队
        //         minHeap.Enqueue(apples[i], i + days[i] - 1);  // 计算到期(腐烂)日期作为优先级
        //     }

        //     int cnt, term;
        //     while (minHeap.TryPeek(out cnt, out term) && (cnt <= 0 || term < i)) {  //  丢弃空的批次和腐烂的苹果
        //         minHeap.Dequeue();
        //     }

        //     if (minHeap.TryDequeue(out cnt, out term)) {
        //         // 吃掉一颗未腐烂的苹果
        //         if (cnt > 1) {  // 防止 0 颗苹果入队
        //             minHeap.Enqueue(cnt - 1, term);
        //         }
        //         ans++;
        //     }
        // }


        // 优化：n 个苹果遍历结束后，可以一次直接吃完堆顶批次的所有苹果（吃到腐烂前的那一天，或把数量都吃完，两者取最小值）。
        /** 优化实现 **/
        int i = 0;
        for (; i < n; i++) {  // i 为自然日
            if (apples[i] > 0) {  // 没有产出苹果就不需要入队
                minHeap.Enqueue(apples[i], i + days[i] - 1);  // 计算到期(腐烂)日期作为优先级
            }

            int cnt, term;
            while (minHeap.TryPeek(out cnt, out term) && (cnt <= 0 || term < i)) {  //  丢弃空的批次和腐烂的苹果
                minHeap.Dequeue();
            }

            if (minHeap.TryDequeue(out cnt, out term)) {
                // 吃掉一颗未腐烂的苹果
                if (cnt > 1) {  // 防止 0 颗苹果入队
                    minHeap.Enqueue(cnt - 1, term);  // 还可以进一步用指针优化堆顶数据减 1，而不用每次减 1 后再入队
                }
                ans++;
            }
        }

        while (minHeap.Count > 0) {
            int cnt, term;
            while (minHeap.TryPeek(out cnt, out term) && (cnt <= 0 || term < i)) {  //  丢弃空的批次和腐烂的苹果
                minHeap.Dequeue();
            }

            if (minHeap.TryDequeue(out cnt, out term)) {
                // 吃掉该批次所有未腐烂的苹果
                int k = Math.Min(cnt, term - i + 1);
                i += k;
                ans += k;
            }
        }
        /****/

        return ans;
    }
    
}