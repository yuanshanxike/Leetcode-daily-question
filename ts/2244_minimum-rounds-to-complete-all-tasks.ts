/**每轮可以完成 2 个或者 3 个相同难度级别的任务，意味着只要相同难度级别的任务总数只要不是 1，都能够完成所有的任务。
 * 因为每次只完成 2 个任务的话，就可以完成所有出现偶数次的任务；此时只需要把最后一轮完成的 2 个任务换成是完成 3 个任务，
 * 就能够完成除 1 以外所有的奇数次任务。（相当于对所有偶数 -2+3 == +1）
 * 
 * 每次一定是倾向于完成更多的任务，所以可以用任务数 mod 3，结果可能是 0,1,2：
 * 结果为 0 时，轮数 == 任务数量 / 3;
 * 结果为 1 时，轮数 == 任务数量 / 3 + 1 (把最后一轮完成的 3 个任务换成 2 个任务，再加一轮完成 2 个任务)
 * 结果为 2 时，轮数 == 任务数量 / 3 + 1 (前面每轮都完成 3 个任务，最后一轮完成 2 个任务)
 */
function minimumRounds(tasks: number[]): number {
    let hash: HashMap = {}
    // 哈希计数
    for (let task of tasks) {
        if (hash[task] == undefined) {
            hash[task] = 1
        } else {
            hash[task]++
        }
    }
    // 计算答案
    let ans = 0
    for (let task in hash) {
        if (hash[task] == 1) return -1
        if (hash[task] % 3 != 0) ans += 1
        ans += Math.floor(hash[task] / 3)
    }
    return ans
};

type HashMap = {
    [n in number]: number
}

console.log(minimumRounds([2,2,3,3,2,4,4,4,4,4]))
console.log(minimumRounds([2,3,3]))