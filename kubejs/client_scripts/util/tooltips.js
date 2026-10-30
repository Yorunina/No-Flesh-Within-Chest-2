// priority: 3000

/**
 * 在指定位置插入提示行，返回下一行的插入位置。
 * @param {Internal.List<Internal.Component>} text
 * @param {Internal.Component[]} textLines
 * @param {number} initNum
 * @returns {number}
 */
function AddTextLines(text, textLines, initNum) {
    textLines.forEach(line => {
        text.add(initNum++, line)
    })
    return initNum
}

/**
 * 展开动态提示行并插入列表，返回下一行的插入位置。
 * @param {Internal.List<Internal.Component>} text
 * @param {Array<Internal.Component | ((lines: Internal.List<Internal.Component>, item: Internal.ItemStack) => Internal.Component[])>} textLines
 * @param {Internal.ItemStack} item
 * @param {number} initNum
 * @returns {number}
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
 * 使用分隔符连接文本组件。
 * @param {string} separator
 * @param {Internal.MutableComponent[]} list
 * @returns {Internal.MutableComponent}
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

/**
 * 生成按时间轮换显示一行文本的提示回调。
 * @param {Internal.MutableComponent[]} tooltips
 * @param {number} [intervalMs=1000]
 * @param {number} [phase=0]
 * @returns {(text: Internal.List<Internal.Component>, item: Internal.ItemStack) => Internal.MutableComponent[]}
 */
function RotatingTooltip(tooltips, intervalMs, phase) {
    intervalMs = intervalMs || 1000
    phase = phase || 0
    return function (text, item) {
        // 用系统时钟算当前索引，每 intervalMs 毫秒切换一次，循环
        let index = Math.floor((Date.now() - phase) / intervalMs) % tooltips.length
        if (index < 0) index += tooltips.length
        return [tooltips[index]]
    }
}

const ItemDirectionNames = ['up', 'down', 'left', 'right']

/**
 * 读取物品保存的方向并生成提示行。
 * @param {Internal.List<Internal.Component>} lines
 * @param {Internal.ItemStack} item
 * @returns {Internal.MutableComponent[]}
 */
function ItemDirectionTooltip(lines, item) {
    let state = item.getOrCreateTag().getInt('direction_state')
    if (state < 0 || state >= ItemDirectionNames.length) state = 0
    let direction = Text.translatable('direction.kubejs.' + ItemDirectionNames[state]).yellow()
    return [Text.translatable('tooltips.kubejs.' + item.id.split(':')[1] + '.default.1', direction)]
}
