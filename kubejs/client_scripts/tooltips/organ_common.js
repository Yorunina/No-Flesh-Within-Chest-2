// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvancedToAll((item, advanced, text) => {
        if (!item.hasTag('kubejs:organ')) return

        let lineNum = 1
        let organTagTooltipsList = []
        let nbt = item.getOrCreateTag()
        let itemMaxStackSizeStr = item.getMaxStackSize().toFixed(0)
        item.getTags().toArray().forEach(/**@param {Internal.TagKey} tag*/tag => {
            let tagLocation = String(tag.location())
            if (!OrganTagMap[tagLocation]) return
            organTagTooltipsList.push(OrganTagMap[tagLocation])
        })
        if (organTagTooltipsList.length > 0) {
            lineNum = AddTextLines(text, [Text.of('🔎  ').append(JoinWithSeparator('   ', organTagTooltipsList))], lineNum)
        }

        let scoreTooltipsList = []
        let organData = ChestCavityUtils.lookupOrgan(item, null)
        if (organData) {
            organData.organScores.forEach((score, value) => {
                let roundValue = FloorFix(value, 2)
                let scoreString = Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`)
                    .hover([
                        Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`).gold(),
                        NewLine,
                        Text.translate(`tooltips.kubejs.score_tag.hover.${score.toString()}`)
                    ])
                    .yellow().underlined()

                let scoreTooltips = Text.translatable('tooltips.kubejs.common_organ.1', Text.yellow(itemMaxStackSizeStr), Text.yellow(roundValue), scoreString)
                scoreTooltipsList.push(scoreTooltips)
            })
        }

        if (nbt.contains('potentialOrganData')) {
            let potentialOrganData = nbt.getCompound('potentialOrganData')
            let potentialAttributeNum = potentialOrganData.size()
            for (let i = 0; i < potentialAttributeNum; i++) {
                scoreTooltipsList.push(Text.translatable('tooltips.kubejs.common_organ.1', Text.yellow(itemMaxStackSizeStr), Text.yellow('0').obfuscated(), Text.translatable('tooltips.kubejs.score_tag.potential_score').yellow().obfuscated()))
            }
        }

        let customToolTips = OrganTooltipRegistryMap[item.id] ? OrganTooltipRegistryMap[item.id] : new MultiStateTooltip(item.id)

        if (customToolTips.defaultTooltips.length > 0) {
            lineNum = AddTextFuncLines(text, customToolTips.defaultTooltips, item, lineNum)
        }

        switch (true) {
            case tooltip.isShift():
                if (customToolTips.shiftTooltips.length + scoreTooltipsList.length > 0) {
                    lineNum = AddTextLines(text, [customToolTips.shiftHoldingDescription], lineNum)
                    lineNum = AddTextLines(text, scoreTooltipsList, lineNum)
                    lineNum = AddTextFuncLines(text, customToolTips.shiftTooltips, item, lineNum)
                    return
                }
                break
            case tooltip.isCtrl():
                if (customToolTips.ctrlTooltips.length > 0) {
                    lineNum = AddTextLines(text, [customToolTips.ctrlHoldingDescription], lineNum)
                    lineNum = AddTextFuncLines(text, customToolTips.ctrlTooltips, item, lineNum)
                    return
                }
                break
            case tooltip.isAlt():
                if (customToolTips.altTooltips.length > 0) {
                    lineNum = AddTextLines(text, [customToolTips.altHoldingDescription], lineNum)
                    lineNum = AddTextFuncLines(text, customToolTips.altTooltips, item, lineNum)
                    return
                }
                break
        }

        if (customToolTips.shiftTooltips.length + scoreTooltipsList.length > 0) {
            lineNum = AddTextLines(text, [customToolTips.shiftDescription], lineNum)
        }

        if (customToolTips.ctrlTooltips.length > 0) {
            lineNum = AddTextLines(text, [customToolTips.ctrlDescription], lineNum)
        }

        if (customToolTips.altTooltips.length > 0) {
            lineNum = AddTextLines(text, [customToolTips.altDescription], lineNum)
        }

        if (item.hasTag('chestcavity:cannot_remove')) {
            lineNum = AddTextLines(text, [Text.translatable('tooltips.kubejs.cannot_remove_organ')], lineNum)
        }
    })


    tooltip.addAdvancedToAll((item, advanced, text) => {
        if (!item.hasTag('kubejs:pseudo_organ')) return

        let lineNum = 1
        let scoreTooltipsList = []
        let organData = ChestCavityUtils.lookupOrgan(item, null)
        if (organData) {
            organData.organScores.forEach((score, value) => {
                let roundValue = RoundFix(value, 2)
                let scoreString = Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`).getString()
                let scoreTooltips = Text.translatable('tooltips.kubejs.common_organ.1', Text.yellow(item.getMaxStackSize().toFixed(0)), Text.yellow(roundValue), Text.yellow(scoreString))
                scoreTooltipsList.push(scoreTooltips)
            })
        }

        if (tooltip.isShift()) {
            if (scoreTooltipsList.length > 0) {
                text.add(lineNum++, Text.translatable('tooltips.kubejs.pseudo_organ.shift_holding.1'))
                text.addAll(lineNum, scoreTooltipsList)
                lineNum += scoreTooltipsList.length
            }
            return
        }

        if (scoreTooltipsList.length > 0) {
            text.add(lineNum++, Text.translatable('tooltips.kubejs.pseudo_organ.shift.1'))
        }

    })
})

