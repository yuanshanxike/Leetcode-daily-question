/**结束时间靠前的任务，需要把执行任务的时间尽量靠后安排，这样能尽可能地使得能够和后面的任务（结束时间靠后）有能够并行执行的相同时间。
 * 
 * 可优化的点在于 “检查可以并行执行的时间片”，可以使用'线段树'优化查找效率；
 * 更进一步地，“检查可以并行执行的时间片” 和 “剩余未执行时间片尽量安排到区间的最后执行” 两步可以合并成
 * 栈 + 二分查找 的方式：
 * 栈中保存的是 连续的在执行任务的时间片 所组成的闭区间，以及从栈底到这个元素的整个区间（包括当前区间的整段时间内）所涉及任务 during 的累计和（类似于前缀和）。
 * 因为保证栈内的区间是互不相交的，所以栈内的区间按照 start 和 end 都是升序排列的。
 * 二分查找用于快速找到迭代到的新区间的 start 在栈中闭区间内有重合的区间元素，
 * 这样就可以快速计算出“检查可以并行执行的时间片”，
 * 然后“剩余未执行时间片尽量安排到区间的最后执行”这一步就对应到了：
 * case 1：没有剩余未执行时间片 (一致，无事发生)；
 * case 2: 剩余未执行时间片会插入到闭区间的空隙中，这样就使得原本分离的多个闭区间合并成了一个闭区间。
 * 合并区间对应着栈顶元素的不断出队合并，最后把合并出来的新区间入队
 */
function findMinimumTime(tasks: number[][]): number {
    tasks.sort(([, e0], [, e1]) => e0 - e1) // sort the tasks in ascending order of end time
    let maxEnd = tasks[tasks.length - 1][1]
    // let runTaskArr = new Array<boolean>(maxEnd + 1).fill(false)
    let runTaskArr: boolean[] = Array.from({ length: maxEnd + 1 }, () => false)
    let ans = 0
    for (let [start, end, during] of tasks) {
        let foundMark = 0
        for (let i = 0; i < end - start + 1; i++) {  // 检查可以并行执行的时间片
            if (runTaskArr[start + i]) foundMark++
            if (foundMark >= during) break
        }
        for (let j = 0; foundMark < during; j++) {  // 剩余未执行时间片尽量安排到区间的最后执行
            if (!runTaskArr[end - j]) {
                runTaskArr[end - j] = true
                foundMark++
                ans++
            }
        }
    }
    return ans
};

console.log(findMinimumTime([[2,3,1],[4,5,1],[1,5,2]]))  // 2
console.log(findMinimumTime([[1,3,2],[2,5,3],[5,6,2]]))  // 4
console.log(findMinimumTime([[2,13,2],[6,18,5],[2,13,3]]))  // 5
console.log(findMinimumTime([[6,15,4],[3,7,1],[4,20,4]]))  // 4