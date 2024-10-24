/**
 * 前缀最大值统计每个玩家的一轮中每个玩家的连续获胜次数，如果连续获胜次数达到 k 则直接返回玩家编号；
 * 如果所有玩家比赛完一轮后，仍然没有出现连续赢 k 场的玩家。
 * 那么最终循环比赛后，会赢得第 k 场比赛胜利的选手一定是第一轮中最后获胜的玩家，因为他的技能等级一定是所有玩家中最高的，后面的比赛中会一直获得胜利。
 * @param skills 
 * @param k 
 */
function findWinningPlayer(skills: number[], k: number): number {
    let maxSkill = skills[0]
    let winCnt = 0
    let winIdx = 0
    for (let i = 1; i < skills.length; i++) {
        if (skills[i] > maxSkill) {
            maxSkill = skills[i]
            winCnt = 1
            winIdx = i
        } else {
            winCnt++
        }

        if (winCnt == k) return winIdx
    }

    return winIdx
};

console.log(findWinningPlayer([4,2,6,3,9], 2))
console.log(findWinningPlayer([2,5,4], 3))