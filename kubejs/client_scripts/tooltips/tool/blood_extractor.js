// priority: 500

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:blood_extractor')
    .setShiftDescription(Text.translatable('tooltips.kubejs.blood_extractor.shift_desc'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.blood_extractor.shift_holding_desc'))
    .addDefault(Text.translatable('tooltips.kubejs.blood_extractor.default.1').gray())
    .addShift((text, item) => {
        let nbt = item.getOrCreateTag()
        if (!nbt.contains('organScores')) return [Text.translatable('tooltips.kubejs.blood_extractor.shift.empty')]
        let tooltipsList = []
        let organScores = nbt.getCompound('organScores')
        if (organScores.size() <= 0) return [Text.translatable('tooltips.kubejs.blood_extractor.shift.invalid')]
        organScores.tags.forEach((score, value) => {
            let roundValue = FloorFix(value.getAsFloat(), 2)
            let scoreString = Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`)
                .hover([
                    Text.translate(`tooltips.kubejs.score_tag.${score.toString()}`).gold(),
                    NewLine,
                    Text.translate(`tooltips.kubejs.score_tag.hover.${score.toString()}`)
                ])
                .yellow()
            let scoreTooltips = Text.translatable('tooltips.kubejs.blood_extractor.shift.1', scoreString, Text.yellow(roundValue))
            tooltipsList.push(scoreTooltips)
        })
        return tooltipsList
    })
)