// priority: 500
ApplyMultiStateTooltip(new MultiStateTooltip('chestcavity:organ_catalogue')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.organ_catalogue.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.organ_catalogue.shift.1'))
)
