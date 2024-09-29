/**
 * 直到 k 买到自己预期的票数 tickets[k]，
 * 他前面的人 x 会轮回 min(tickets[k], tickets[x]) 次，
 * 他后面的人 y 会轮回 min(tickets[k] - 1, tickets[y]) 次。
 * 
 * 答案等于上面三种次数的累加
 */
function timeRequiredToBuy(tickets: number[], k: number): number {
    const ticket = tickets[k]
    let ans = 0
    for (let i = 0; i < tickets.length; i++) {
        if (i <= k) {
            ans += Math.min(ticket, tickets[i])
        } else {
            ans += Math.min(ticket - 1, tickets[i])
        }
    }
    return ans
};

console.log(timeRequiredToBuy([2,3,2], 2))
console.log(timeRequiredToBuy([5,1,1,1], 0))
console.log(timeRequiredToBuy([84,49,5,24,70,77,87,8], 3))