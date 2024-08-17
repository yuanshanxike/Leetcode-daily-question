function checkRecord(s: string): boolean {
    return s.indexOf('A') == s.lastIndexOf('A') && !s.includes('LLL')
};

console.log(checkRecord('PPALLP'))
console.log(checkRecord('PAPLLP'))
console.log(checkRecord('PPALLL'))