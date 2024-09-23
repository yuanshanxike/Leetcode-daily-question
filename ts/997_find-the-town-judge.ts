function findJudge(n: number, trust: number[][]): number {
    const trustCntArr: number[] = Array(n + 1).fill(0)
    const peopleSet = new Set<number>()
    let ans = -1
    for (const [people, judge] of trust) {
        trustCntArr[judge]++
        peopleSet.add(people)
    }
    for (let i = 1; i <= n; i++) {
        if (!peopleSet.has(i) && trustCntArr[i] == n - 1) {
            ans = i
        }
    }
    return ans
};

console.log(findJudge(2, [[1,2]]))
console.log(findJudge(3, [[1,3],[2,3]]))
console.log(findJudge(3, [[1,3],[2,3],[3,1]]))