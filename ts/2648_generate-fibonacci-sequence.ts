/**
 * 方法一：迭代
 */
// function* fibGenerator(): Generator<number, any, number> {
//     let first = 0
//     yield first

//     let second = 1

//     while (true) {
//         yield second;
//         [first, second] = [second, first + second]
//     }
// };

/**
 * 方法二：递归
 */
function* fibGenerator(first: number = 0, second: number = 1): Generator<number, any, number> {
    yield first
    yield* fibGenerator(second, first + second)  // yield* 是委托给另一个可迭代对象的语法，这里委托给自身实现递归
}

const fibGen = fibGenerator()
console.log(fibGen.next().value)
console.log(fibGen.next().value)
console.log(fibGen.next().value)
console.log(fibGen.next().value)
console.log(fibGen.next().value)
console.log(fibGen.next().value)

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */