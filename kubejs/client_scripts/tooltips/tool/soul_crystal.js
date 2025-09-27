
// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('kubejs:soul_crystal', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.soul_crystal.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.soul_crystal.shift.1`)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
        if (item.hasNBT()) {
            let nbt = item.getNbt()
            if (tooltip.isAlt() && nbt.contains('EntityType')) {
                lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.alt_holding.1`)], lineNum)
                lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.soul_crystal.alt.1`, GetMobNameByType(nbt.getString('EntityType')).gold())], lineNum)
            } else {
                lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.alt.1`)], lineNum)
            }
        }
    })
})