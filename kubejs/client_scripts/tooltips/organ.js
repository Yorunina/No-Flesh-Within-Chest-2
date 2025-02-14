// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvancedToAll((item, advanced, text) => {
        if (!item.hasTag('kubejs:organ')) return

        let lineNum = 1
        let organTagTooltipsList = []
        item.getTags().toArray().forEach(/**@param {Internal.TagKey} tag*/tag => {
            let tagLocation = String(tag.location())
            if (!OrganTagMap[tagLocation]) return
            organTagTooltipsList.push(OrganTagMap[tagLocation])
        })
        if (organTagTooltipsList.length > 0) {
            lineNum = AddForTextLines(text, [JoinWithSeparator('    ', organTagTooltipsList)], lineNum)
        }

        let organData = $ChestCavityUtil.lookupOrgan(item, null)
        let scoreTooltipsList = []
        organData.organScores.forEach((score, value) => {
            let roundValue = FloorFix(value, 2)
            let scoreString = Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`).getString()
            let scoreTooltips = Text.translatable('tooltips.kubejs.common_organ.1', Text.yellow(item.getMaxStackSize().toFixed(0)), Text.yellow(roundValue), Text.yellow(scoreString))
            scoreTooltipsList.push(scoreTooltips)
        })

        let customToolTips = OrganTooltipRegistryMap[item.id] ? OrganTooltipRegistryMap[item.id] : new MultiStateTooltip(item.id)

        if (customToolTips.defaultTooltips.length > 0) {
            text.addAll(lineNum, customToolTips.defaultTooltips)
            lineNum += customToolTips.defaultTooltips.length
        }
        
        switch (true) {
            case tooltip.isShift():
                if (customToolTips.shiftTooltips.length + scoreTooltipsList.length > 0) {
                    text.add(lineNum++, customToolTips.shiftHoldingDescription)
                    text.addAll(lineNum, scoreTooltipsList)
                    lineNum += scoreTooltipsList.length
                    text.addAll(lineNum, customToolTips.shiftTooltips)
                    lineNum += customToolTips.shiftTooltips.length
                }
                return
            case tooltip.isCtrl():
                if (customToolTips.ctrlTooltips.length > 0) {
                    text.add(lineNum++, customToolTips.ctrlHoldingDescription)
                    text.addAll(lineNum, customToolTips.ctrlTooltips)
                    lineNum += customToolTips.ctrlTooltips.length
                }
                return
            case tooltip.isAlt():
                if (customToolTips.altTooltips.length > 0) {
                    text.add(lineNum++, customToolTips.altHoldingDescription)
                    text.addAll(lineNum, customToolTips.altTooltips)
                    lineNum += customToolTips.altTooltips.length
                }
                return
        }

        if (customToolTips.shiftTooltips.length + scoreTooltipsList.length > 0) {
            text.add(lineNum++, customToolTips.shiftDescription)
        }

        if (customToolTips.ctrlTooltips.length > 0) {
            text.add(lineNum++, customToolTips.ctrlDescription)
        }

        if (customToolTips.altTooltips.length > 0) {
            text.add(lineNum++, customToolTips.altDescription)
        }

    })
})

