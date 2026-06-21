// priority: 500
RegistryOrgan('kubejs:moew_nose')
    .addScore('chestcavity:luck', 1.5)
    .setCanSpawn(true)

const MoewLanguageCharCodeMap = ['呜', '喵', '~', '嗷', '！', '喵~ ']
const MoewLanguageBegin = '呜'

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.PlayerChatDecorateEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MoewNoseDecorateChat(customData, event, organItem, organIndex, slotType) {
    let msg = String(event.getMessage())
    let resMsg = MoewNoseEncode(msg)
    resMsg = MoewLanguageBegin + resMsg
    event.setMessage(Text.of(resMsg))
}


/**
 * 编码函数
 * @param {string} input 原始字符串
 * @returns {string} 编码后的字符串
 */
function MoewNoseEncode(input) {
    let encoded = ''
    const radix = MoewLanguageCharCodeMap.length
    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i).charValue()
        let baseStr = charCode.toString(radix)
        for (let j = 0; j < baseStr.length; j++) {
            let index = parseInt(baseStr[j], radix)
            encoded += MoewLanguageCharCodeMap[index]
        }
        encoded += ' '
    }
    return encoded.trim()
}

/**
 * 解码函数
 * @param {string} input 编码后的字符串
 * @returns {string} 原始字符串
 */
function MoewNoseDecode(input) {
    const radix = MoewLanguageCharCodeMap.length
    const words = input.split(' ')
    let decoded = ''

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let baseStr = ''
        for (let j = 0; j < word.length; j++) {
            let char = word[j]
            let index = MoewLanguageCharCodeMap.indexOf(char)
            baseStr += index.toString()
        }
        if (baseStr) {
            let charCode = parseInt(baseStr, radix)
            decoded += String.fromCharCode(charCode)
        }
    }
    return decoded.trim()
}
/**
 * 解码使用范例
 *if (resMsg.startsWith(MoewLanguageBegin)) {
 *   resMsg = resMsg.substring(MoewLanguageBegin.length)
 *   console.log(MoewNoseDecode(resMsg))
 *}
 */

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:moew_nose')
        .addOnlyStrategy('decorate_chat', MoewNoseDecorateChat)
)
