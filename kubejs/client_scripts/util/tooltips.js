// priority: 1000
/**
 * @param {$List$Type<any>} text 
 * @param {String[]} textLines 
 * @param {Number} initNum 
 * @returns 
 */
function AddForTextLines(text, textLines, initNum) {
    for (let i = 0; i < textLines.length; i++) {
        text.add(initNum++, textLines[i])
    }
    return initNum
}

/**
 * 
 * @param {string} separator 
 * @param {Internal.MutableComponent[]} list 
 */
function JoinWithSeparator(separator, list) {
    let result = Text.empty()
    list.forEach((text, index) => {
        if (index == list.length - 1) {
            result.append(text)
            return result
        }
        result.append(text).append(separator)
    })
    return result
}