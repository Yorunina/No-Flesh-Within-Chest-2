// priority: 800
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:key_to_infinity')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.key_to_infinity.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.key_to_infinity.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.key_to_infinity.shift.2'))
)