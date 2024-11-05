function losingPlayer(x: number, y: number): string {
    const times = Math.min(x, Math.floor(y / 4))
    return times % 2 ? 'Alice' : 'Bob'
};

console.log(losingPlayer(2, 7))
console.log(losingPlayer(4, 11))