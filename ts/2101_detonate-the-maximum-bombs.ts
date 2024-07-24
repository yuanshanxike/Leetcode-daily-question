/**
 * 爆炸半径较小的一颗炸弹要是能够引爆半径半径更大的一颗炸弹的话，爆炸半径更大的这颗炸弹也一定能够引爆爆炸半径小的这一颗炸弹
 * @param bombs 
 */
function maximumDetonation(bombs: number[][]): number {
    function bomb(target: number, bombedArr: boolean[]): number {
        let bombedCnt = 1
        bombedArr[target] = true
        const [x0, y0, r0] = bombs[target]
        bombs.forEach(([x, y], idx) => {
            if (!bombedArr[idx] && (x0 - x) ** 2 + (y0 - y) ** 2 <= r0 ** 2) {
                bombedCnt += bomb(idx, bombedArr)
            }
        })
        return bombedCnt
    }
    const n = bombs.length
    const bombedArr = new Array<boolean>(n)
    let ans = 1
    for (let i = 0; i < n; i++) {
        bombedArr.fill(false)
        ans = Math.max(ans, bomb(i, bombedArr))
    }
    return ans
};

console.log(maximumDetonation([[2,1,3],[6,1,4]]))
console.log(maximumDetonation([[1,1,5],[10,10,5]]))
console.log(maximumDetonation([[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]))