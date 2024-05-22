function findWinners(matches: number[][]): number[][] {
    const ans0 = new Set<number>()
    const set1 = new Set<number>()
    const ans1 = new Set<number>()
    for (const [winner, loser] of matches) {
        ans0.add(winner)
        
        if (set1.has(loser)) {
            ans1.delete(loser)
        } else {
            set1.add(loser)
            ans1.add(loser)
        }
    }
    for (const [, loser] of matches) {
        ans0.delete(loser)
    }
    return [[... ans0].sort((a, b) => a - b), [... ans1].sort((a, b) => a - b)]
};

console.log(findWinners([[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]))  // [[1,2,10],[4,5,7,8]]
console.log(findWinners([[2,3],[1,3],[5,4],[6,4]]))  // [[1,2,5,6],[]]