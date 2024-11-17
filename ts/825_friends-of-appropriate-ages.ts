/**
 * 双指针
 * 需要先对 ages 进行排序
 * @param ages 
 */
function numFriendRequests(ages: number[]): number {
    const n = ages.length
    let y = 0, x = 0
    ages.sort((a, b) => a - b)
    let ans = 0
    // 年龄大的人会发好友请求的比其年龄小的人的人数和
    while (x < n) {
        while (y < x && ages[y] <= ages[x] * 0.5 + 7) {
            y++
        }

        ans += x - y

        x++
    }

    // 与上面相反，统计从年龄相同的人群中，排在前面的人向后面的人发好友请求
    for (let i = 0; i < n - 1; i++) {
        if (ages[i] <= ages[i] * 0.5 + 7) continue
        let j = i
        while (ages[i] == ages[j + 1]) {
            j++
        }
        ans += (j - i) * (1 + 1 + (j - i - 1)) / 2  // 1 + 2 + 3 + ... + n
        i = j
    }
    return ans
};

console.log(numFriendRequests([16, 16]))
console.log(numFriendRequests([16, 16, 16]))
console.log(numFriendRequests([8,85,24,85,69]))
console.log(numFriendRequests([16, 17, 18]))
console.log(numFriendRequests([20,30,100,110,120]))
console.log(numFriendRequests([73,106,39,6,26,15,30,100,71,35,46,112,6,60,110]))