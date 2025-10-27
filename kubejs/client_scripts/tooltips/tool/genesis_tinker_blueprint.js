// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('kubejs:genesis_tinker_blueprint', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.genesis_tinker_blueprint.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.genesis_tinker_blueprint.shift.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.genesis_tinker_blueprint.shift.2`)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })
})


