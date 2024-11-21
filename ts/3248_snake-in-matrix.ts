function finalPositionOfSnake(n: number, commands: string[]): number {
    const direction2Move: Record<string, number> = {
        'UP': -n,
        'RIGHT': 1,
        'DOWN': +n,
        'LEFT': -1
    }
    return commands.map((commad) => direction2Move[commad]).reduce((pos, delta) => pos + delta, 0)
};

console.log(finalPositionOfSnake(2, ["RIGHT","DOWN"]))
console.log(finalPositionOfSnake(3, ["DOWN","RIGHT","UP"]))