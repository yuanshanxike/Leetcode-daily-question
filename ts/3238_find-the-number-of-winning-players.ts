function winningPlayerCount(n: number, pick: number[][]): number {
    const playerBall: number[][] = Array.from({ length: n }, () => Array(11).fill(0))
    const wonPlayer: boolean[] = Array(n).fill(false)
    let winCnt = 0
    for (const [x, y] of pick) {
        if (!wonPlayer[x] && ++playerBall[x][y] > x) {
            winCnt++
            wonPlayer[x] = true
        }
    }
    return winCnt
};

console.log(winningPlayerCount(4, [[0,0],[1,0],[1,0],[2,1],[2,1],[2,0]]))
console.log(winningPlayerCount(5, [[1,1],[1,2],[1,3],[1,4]]))
console.log(winningPlayerCount(5, [[1,1],[2,4],[2,4],[2,4]]))