// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:ancient_incense')
    .setShiftDescription(Text.translatable('tooltips.kubejs.incense.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.incense.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.incense.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.incense.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.ancient_incense.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.ancient_incense.shift.1', RelicsBossHover))
    .addAlt(Text.translatable('tooltips.kubejs.ancient_incense.alt.1', RelicsBossHover))
    .addAlt(RotatingTooltip([
        Text.translatable('tooltips.kubejs.ancient_incense.alt.2', ChampionHighFreqProtectionHover).gray(),
        Text.translatable('tooltips.kubejs.ancient_incense.alt.3', ChampionLowFreqProtectionHover).gray(),
    ], 1000))
)
