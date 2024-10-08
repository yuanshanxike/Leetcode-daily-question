function destCity(paths: string[][]): string {
    const endPoints = new Set<string>()
    const startPoints = new Set<string>()
    for (const [from, to] of paths) {
        startPoints.add(from)
        endPoints.add(to)
    }

    for (const start of startPoints) {
        endPoints.delete(start)
    }
    return endPoints.keys().next().value
}

console.log(destCity([["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]))
console.log(destCity([["B","C"],["D","B"],["C","A"]]))
console.log(destCity([["A","Z"]]))