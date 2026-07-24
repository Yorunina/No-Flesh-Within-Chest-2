// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:relics_incense')
    .setShiftDescription(Text.translatable('tooltips.kubejs.oath.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.oath.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.oath.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.oath.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.relics_incense.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.relics_incense.shift.1', RelicsBossHover))
    .addAlt(Text.translatable('tooltips.kubejs.relics_incense.alt.1', RelicsBossHover))
    .addAlt(RotatingTooltip([
        Text.translatable('tooltips.kubejs.relics_incense.alt.2', ChampionLowDamageRestrictionHover),
        Text.translatable('tooltips.kubejs.relics_incense.alt.3', ChampionHighDamageSuppressionHover),
    ], 1000))
)