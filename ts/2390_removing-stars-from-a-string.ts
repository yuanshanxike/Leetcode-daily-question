function removeStars(s: string): string {
    const stack: string[] = []
    for (const c of s) {
        if (c == '*' && stack.length > 0 && stack[stack.length - 1] != '*') {
            stack.pop()
        } else {
            stack.push(c)
        }
    }
    return stack.join('')
};

console.log(removeStars("leet**cod*e"))
console.log(removeStars("erase*****"))
console.log(removeStars("*****erase"))