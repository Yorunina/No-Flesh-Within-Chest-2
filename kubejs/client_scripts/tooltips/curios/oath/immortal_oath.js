// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:immortal_oath')
    .setShiftDescription(Text.translatable('tooltips.kubejs.oath.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.oath.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.immortal_oath.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.immortal_oath.shift.1'))
)