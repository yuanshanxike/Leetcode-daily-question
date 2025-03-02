/**
 * 自定义排序
 * @param votes 
 */
function rankTeams(votes: string[]): string {
    const n = votes[0].length
    const rank: Record<string, number>[] = []
    for (let i = 0; i < n; i++) {
        const iRank: Record<string, number> = {}
        for (const vote of votes) {
            if (!iRank[vote[i]]) {
                iRank[vote[i]] = 1
            } else {
                iRank[vote[i]]++
            }
        }
        rank.push(iRank)
    }

    const teams = Array.from(votes[0])
    return teams.sort((t1, t2) => {
        for (const r of rank) {
            if (r[t1] && r[t2]) {
                if (r[t1] == r[t2]) continue
                else return r[t2] - r[t1]
            } else if (r[t1]) return -1
            else if (r[t2]) return 1
            else continue
        }

        return t1.charCodeAt(0) - t2.charCodeAt(0)  // 考虑完所有投票情况后仍然出现并列现象，则根据团队字母的字母顺序进行排名
    }).join('')
};

console.log(rankTeams(["ABC","ACB","ABC","ACB","ACB"]))
console.log(rankTeams(["WXYZ","XYZW"]))
console.log(rankTeams(["ZMNAGUEDSJYLBOPHRQICWFXTVK"]))
console.log(rankTeams(["BCA","CAB","CBA","ABC","ACB","BAC"]))