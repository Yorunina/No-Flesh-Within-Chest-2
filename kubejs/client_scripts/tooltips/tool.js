// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('kubejs:glass_vial', (item, advanced, text) => {
        if (!item.hasNBT() || !item.getNbt().contains('organScores')) return
        let lineNum = 1
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.glass_vial.2`)], lineNum)
            let scoreTooltipsList = []
            item.nbt.organScores.getAllKeys().forEach(key => {
                let roundValue = FloorFix(item.nbt.organScores[key], 2)
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


    tooltip.addAdvanced('kubejs:biome_data_storage', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.biome_data_storage.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.biome_data_storage.shift.1`, ExperimentalWorldEditObeliskHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.biome_data_storage.shift.2`, RepairProtocolHover)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })

    tooltip.addAdvanced('kubejs:preset_structure_data_storage', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.preset_structure_data_storage.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.preset_structure_data_storage.shift.1`, ExperimentalWorldEditObeliskHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.preset_structure_data_storage.shift.2`, RepairProtocolHover)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })

    tooltip.addAdvanced('kubejs:extract_loot_data_storage', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.extract_loot_data_storage.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.extract_loot_data_storage.shift.1`, ExperimentalWorldEditObeliskHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.extract_loot_data_storage.shift.2`, RepairProtocolHover, ExperimentalWorldEditObeliskHover)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })

    tooltip.addAdvanced('kubejs:rule_structure_data_storage', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.rule_structure_data_storage.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.rule_structure_data_storage.shift.1`, ExperimentalWorldEditObeliskHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.rule_structure_data_storage.shift.2`, RepairProtocolHover)], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })

    tooltip.addAdvanced('kubejs:signal_launch_permit', (item, advanced, text) => {
        let lineNum = 1
        lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.signal_launch_permit.default.1`).gray()], lineNum)
        if (tooltip.isShift()) {
            let capacity = 0
            if (item.hasNBT() && item.getNbt().contains('capacity')) {
                capacity = item.getNbt().getInt('capacity')
            }
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift_holding.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.signal_launch_permit.shift.1`)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.signal_launch_permit.shift.2`, ExperimentalWorldEditObeliskHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.signal_launch_permit.shift.3`, RepairProtocolHover)], lineNum)
            lineNum = AddForTextLines(text, [Text.translatable(`tooltips.kubejs.signal_launch_permit.shift.4`, capacity.toFixed(0))], lineNum)
        } else {
            lineNum = AddForTextLines(text, [Text.translate(`tooltips.kubejs.tool.shift.1`)], lineNum)
        }
    })
})