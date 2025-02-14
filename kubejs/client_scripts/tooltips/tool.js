// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('kubejs:glass_vial', (item, advanced, text) => {
        if (!item.nbt?.organSocres) return
        let lineNum = 1
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.glass_vial.2`)], lineNum)
            let scoreTooltipsList = []
            item.nbt.organSocres.getAllKeys().forEach(key => {
                let roundValue = FloorFix(item.nbt.organSocres[key], 2)
                let scoreString = Text.translate(`tooltips.kubejs.score_tag.${key}`).getString()
                let scoreTooltips = Text.translatable('tooltips.kubejs.glass_vial.3', Text.yellow(scoreString), Text.yellow(roundValue))
                scoreTooltipsList.push(scoreTooltips)
            })
            lineNum = AddForTextLines(text, scoreTooltipsList, lineNum)
            return
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.glass_vial.1`)], lineNum)
        }
    })
})