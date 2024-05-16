/**思路：找到数组中最大的数（设为 m），然后再看其他所有数字之和（设为 s），与 m - 1 的大小关系。
 * 如果 s < m - 1，此时表示除最大元素外的所有数字以最稀疏的方式排列，把组成 m 的每一个 1 想象成一个隔板，
 * 那么，现在不能够在每对相邻的隔板之间填充一个从其他元素中拆分出来的 1，意味着对于 m，一定会有彼此相邻的
 * 隔板。那么回到题目，此时答案就是 s * 2 + 1;
 * 否则，s >= m - 1，此时上面所说的每对相邻的 m 隔板之间都能够被其他元素所填充。极端情况是：所有其他的每
 * 个元素都等于 m，意味着数组中所有元素都一样大。那么此时每个元素拆分出来的 1，可以在每个隔板的前面都放置
 * 1 个。回到题目，这种情况下答案就是 s + m。
 */
function numberOfWeeks(milestones: number[]): number {
    let max = 0
    let sum = 0
    for (let val of milestones) {
        max = val > max ? val : max
        sum += val
    }
    sum -= max
    if (sum < max - 1) return sum * 2 + 1
    else return sum + max
};

console.log(numberOfWeeks([1,2,3]))
console.log(numberOfWeeks([5,2,1]))
console.log(numberOfWeeks([50]))
console.log(numberOfWeeks([1,2,3,4,5]))
console.log(numberOfWeeks([1,2,4,9]))
console.log(numberOfWeeks([3,4,10,12]))