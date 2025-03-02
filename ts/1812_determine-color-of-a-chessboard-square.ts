function squareIsWhite(coordinates: string): boolean {
    const row = (coordinates[0].charCodeAt(0) - 'a'.charCodeAt(0)) % 2
    const col = (coordinates[1].charCodeAt(0) - '1'.charCodeAt(0)) % 2
    return (row ^ col) == 1
};

console.log(squareIsWhite('a1'))
console.log(squareIsWhite('h3'))
console.log(squareIsWhite('c7'))