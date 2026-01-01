// priority: 3000

/**
 * @param {Internal.List<any>} text 
 * @param {any[]} textLines 
 * @param {Number} initNum 
 * @returns 
 */
function AddTextLines(text, textLines, initNum) {
    textLines.forEach(line => {
        text.add(initNum++, line)
    })
    return initNum
}

/**
 * @param {Internal.List<any>} text 
 * @param {any[]} textLines 
 * @param {Number} initNum 
 * @returns 
 */
function AddTextFuncLines(text, textLines, item, initNum) {
    textLines.forEach(line => {
        if (typeof line == 'function') {
            let lineTexts = line(text, item)
            text.addAll(initNum, lineTexts)
            initNum += lineTexts.length
        } else {
            text.add(initNum++, line)
        }
    })
    return initNum
}

/**
 * @param {string} mobType 
 * @returns {Internal.MutableComponent}
 */
function GetMobNameByType(mobType) {
    return Text.translate('entity.' + mobType.replace(':', '.'))
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
            return
        }
        result.append(text).append(separator)
    })
    return result
}