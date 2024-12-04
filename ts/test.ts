function genDupFileName(fileName: string): string {
    // 正则匹配文件名和扩展名
    const fileNameRegex = /^(.*?)(\((\d+)\))?$/
    const match = fileName.match(fileNameRegex)

    if (!match) {
        throw new Error('Invalid file name format')
    }

    console.debug(match)

    const baseName = match[1] // 文件名主部分
    const currentNumber = match[3] ? parseInt(match[3], 10) : 0 // 当前数字

    const updatedFileName = `${baseName}(${currentNumber + 1})`

    return updatedFileName
}

console.log(genDupFileName('music'))
console.log(genDupFileName('music(1)'))