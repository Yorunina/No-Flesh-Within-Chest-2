
// priority: 800
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:clear_crystal')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.clear_crystal.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.clear_crystal.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.clear_crystal.shift.2'))
)