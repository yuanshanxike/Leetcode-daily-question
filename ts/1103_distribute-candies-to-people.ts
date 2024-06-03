function distributeCandies(candies: number, num_people: number): number[] {
    const ans = new Array<number>(num_people)
    const times = Math.floor(Math.sqrt(candies * 2))  // 根据等差数列求和的公式变化得到
    const lastRemain = candies - times * (times + 1) / 2
    const fullRound = Math.floor(times / num_people)
    const remainTimes = times % num_people
    for (let i = 0; i < num_people; i++) {
        const round = i < remainTimes ? fullRound + 1 : fullRound
        ans[i] = ((i + 1) * 2 + num_people * (round - 1)) * round / 2
    }
    // lastRemain 大于或等于 0 表示按照 “每次多给一个” 的规则分发后还有剩余，则把剩余的都给下一个（剩余的糖果数量不满足 “每次多给一个” 的规则）
    //            小于 0 表示最后一个人也按照 “每次多给一个” 的规则分发，但是糖果数量不够了，需要在对其分发的数量上减去 lastRemain，才能得到其实际分发的数量
    // remainTimes 需要取模、remainTimes - 1 需要取正模 来保证在合法位置操作数据
    const idx = lastRemain >= 0 ? remainTimes % num_people :
        ((remainTimes - 1) % num_people + num_people) % num_people
    ans[idx] += lastRemain
    return ans
};

console.log(distributeCandies(7, 4))
console.log(distributeCandies(7, 5))
console.log(distributeCandies(10, 3))
console.log(distributeCandies(100, 3))
console.log(distributeCandies(999, 4))
console.log(distributeCandies(800, 40))