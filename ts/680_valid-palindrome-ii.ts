function validPalindrome(s: string): boolean {
    // let skip = 0
    // let left = 0, right = s.length - 1
    // while (left < right) {
    //     if (s[left] !== s[right]) {
    //         console.debug(s[left], s[right], left, right)
    //         skip++
    //         if (skip > 1) return false
    //         if (s[left + 1] === s[right]) left++
    //         else right--
    //     } else {
    //         left++
    //         right--
    //     }
    // }
    function checkPalindrome(l: number, r: number, skip: number): boolean {
        if (l >= r) return true

        if (skip <= 0 && s[l] != s[r]) return false
        else if (s[l] == s[r]) return checkPalindrome(l + 1, r - 1, skip)
        else return checkPalindrome(l + 1, r, skip - 1) || checkPalindrome(l, r - 1, skip - 1)
    }
    return checkPalindrome(0, s.length - 1, 1)
    // return true
};

console.log(validPalindrome("aba"))
console.log(validPalindrome("abca"))
console.log(validPalindrome("abc"))