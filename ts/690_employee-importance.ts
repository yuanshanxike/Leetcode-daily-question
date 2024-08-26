/** Definition for Employee. */
class Employee {
    id: number
    importance: number
    subordinates: number[]
    constructor(id: number, importance: number, subordinates: number[]) {
        this.id = (id === undefined) ? 0 : id;
        this.importance = (importance === undefined) ? 0 : importance;
        this.subordinates = (subordinates === undefined) ? [] : subordinates;
    }
}

function getImportance(employees: Employee[], id: number): number {
    const idToidx: Record<number, number> = {}
    for (let i = 0; i < employees.length; i++) {
        idToidx[employees[i].id] = i
    }

    function dfs(id: number): number {
        const e = employees[idToidx[id]]
        if (!e) return 0
        let sum = e.importance
        for (const id of e.subordinates) {
            sum += dfs(id)
        }
        return sum
    }

    return dfs(id)
};