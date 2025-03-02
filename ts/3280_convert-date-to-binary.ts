function convertDateToBinary(date: string): string {
    return date.split('-').map((digit) => (+digit).toString(2)).reduce((preStr, curNumStr, idx, arr) => preStr + curNumStr + (idx == arr.length - 1 ? '' : '-'), '')
};

console.log(convertDateToBinary('2080-02-29'))
console.log(convertDateToBinary('1900-01-01'))