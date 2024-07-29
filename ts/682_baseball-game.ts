function calPoints(operations: string[]): number {
    const stack: number[] = []
    operations.forEach((c) => {
        switch (c) {
            case 'C':
                stack.pop()
                break
            case 'D':
                stack.push(stack[stack.length - 1] * 2)
                break
            case '+':
                let b = stack[stack.length - 1]
                let a = stack[stack.length - 2]
                stack.push(a + b)
                break
            default:
                stack.push(+c)
                break
        }
    })
    return stack.reduce((sum, cur) => sum + cur, 0)
};

console.log(calPoints(["5","2","C","D","+"]))
console.log(calPoints(["5","-2","4","C","D","9","+","+"]))
console.log(calPoints(["1"]))