/**
 * 从哈希表映射构建并查集（虽然名字可以重复，但下标是唯一的）
 * @param accounts 
 */
function accountsMerge(accounts: string[][]): string[][] {
    const emailToIdx: Record<string, Set<number>> = {}
    const idxToEmail: Record<number, Set<string>> = {}
    const unionFindSet: number[] = new Array(accounts.length).fill(-1)

    function find(i: number): number {
        let idx = i
        while (i != -1) {
            idx = i
            i = unionFindSet[i]
            if (idx == i) return idx
        }
        return idx
    }

    function union(p: number, i: number) {
        const r = find(i)
        unionFindSet[r] = p
    }

    accounts.forEach((account, idx) => {
        const [id, ... emails] = account
        if (!idxToEmail[idx]) idxToEmail[idx] = new Set()
        for (const email of emails) {
            if (!emailToIdx[email]) {
                emailToIdx[email] = new Set()
            }
            for (const i of emailToIdx[email]) {
                union(idx, i)
                break // 只需要合并第一个下标对应的根节点，因为其他对应的下标之前已经被合并到此根节点之下
            }
            emailToIdx[email].add(idx)

            idxToEmail[idx].add(email)
        }
    })
    
    const ansMap: Record<number, Set<string>> = {}
    unionFindSet.forEach((p, idx) => {
        p = find(idx)
        
        if (!ansMap[p]) ansMap[p] = new Set<string>()
        idxToEmail[idx].forEach((e) => {
            ansMap[p].add(e)
        })
    })

    const ans: string[][] = []
    for (const idx in ansMap) {
        ans.push([accounts[+idx][0], ... [... ansMap[idx]].sort()])
    }
    
    return ans
};

console.log(accountsMerge([["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]))
console.log(accountsMerge([["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]))
console.log(accountsMerge([["Alex","Alex5@m.co","Alex4@m.co","Alex0@m.co"],["Ethan","Ethan3@m.co","Ethan3@m.co","Ethan0@m.co"],["Kevin","Kevin4@m.co","Kevin2@m.co","Kevin2@m.co"],["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe2@m.co"],["Gabe","Gabe3@m.co","Gabe4@m.co","Gabe2@m.co"]]))
console.log(accountsMerge([["David","David0@m.co","David1@m.co"],["David","David3@m.co","David4@m.co"],["David","David4@m.co","David5@m.co"],["David","David2@m.co","David3@m.co"],["David","David1@m.co","David2@m.co"]]))