function breakPalindrome(palindrome: string): string {
    const n = palindrome.length
    if (n == 1) return ''
    // 先判断高位能不能通过变成 'a' 来降低字典序
    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (palindrome[i] != 'a') {
            return palindrome.slice(0, i) + 'a' + palindrome.slice(i + 1)
        }
    }
    // else all chars is 'a'，此时字典序最小，不能通过降低字典序来破坏回文结构，那么让最低位 +1 来破坏回文，且使得字典序增加的幅度最小
    return palindrome.slice(0, -1) + 'b'
};

console.log(breakPalindrome('abccba'))
console.log(breakPalindrome('a'))
console.log(breakPalindrome('aa'))
console.log(breakPalindrome('aaa'))
console.log(breakPalindrome('aaaa'))