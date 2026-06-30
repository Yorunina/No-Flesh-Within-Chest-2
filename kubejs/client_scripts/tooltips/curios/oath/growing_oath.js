// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:growing_oath')
    .setShiftDescription(Text.translatable('tooltips.kubejs.oath.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.oath.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.oath.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.oath.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.growing_oath.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.growing_oath.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.growing_oath.shift.2'))
    .addShift(Text.translatable('tooltips.kubejs.growing_oath.shift.3', Text.gold('10')))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        let dayCount = nbt.getInt('dayCount')
        return [
            Text.translatable('tooltips.kubejs.growing_oath.alt.1', Text.gold(dayCount.toFixed(0))),
            Text.translatable('tooltips.kubejs.growing_oath.alt.2', Text.gold(dayCount * 0.2 + 1), Text.gold(dayCount * 0.02 + 1), Text.gold(dayCount * 0.1 + 1), Text.gold(dayCount * 0.1 + 1)),
        ]
    })
)