/**
 * 可以对所有名字按照 首字母 或者 后缀 进行分组。
 * 按照题目要求，相同分组中的名字不能相互组合；不同分组间 后缀 或者 首字母 相同的名字也不能相互组合。
 * 
 * 这里采用对相同首字母的 ideas 分到同一个组（最多26组）的方式进行求解。
 * 需要统计不同集合中相同后缀元素的数量（这两个集合的交集个数），求解这两个集合中的 ideas 所能构成的合法公司名字数量时，需要对每个集合的元素数量先减去交集个数后，再使用乘法原理统计构成名字的数量。
 * 通过二重循环枚举所有的分组对，累加计算答案。
 * 因为和选取的顺序相关，最后统计得到的结果需要 x2，相当于计算的是排列数。
 * @param ideas 
 */
function distinctNames(ideas: string[]): number {
    const groups: Record<string, Set<string>> = {}
    // ideas 分组
    for (const idea of ideas) {
        const first = idea[0]
        const suffix = idea.slice(1)  // 只会把后缀(除了首字母的子字符串)放入到集合中，方便后续比较
        if (groups[first]) {
            groups[first].add(suffix)
        } else {
            groups[first] = new Set([suffix])
        }
    }
    // 枚举统计合法方案数
    const firstArr = Object.keys(groups)
    let ans = 0
    for (let i = 0; i < firstArr.length; i++) {
        const aSet = groups[firstArr[i]]
        for (let j = i + 1; j < firstArr.length; j++) {
            const bSet = groups[firstArr[j]]
            // 求交集数量
            let m = 0
            aSet.forEach((a) => {
                if (bSet.has(a)) m++
            })

            // 排除交集后的乘法原理计算数量
            ans += (aSet.size - m) * (bSet.size - m)
        }
    }
    return ans * 2  // x2 (通过组合数求排列数) 可以放最后
};

console.log(distinctNames(["coffee","donuts","time","toffee"]))
console.log(distinctNames(["lack","back"]))