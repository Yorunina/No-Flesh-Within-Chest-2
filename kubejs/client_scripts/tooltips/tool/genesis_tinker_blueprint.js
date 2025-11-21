// priority: 800
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:genesis_tinker_blueprint')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.genesis_tinker_blueprint.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.genesis_tinker_blueprint.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.genesis_tinker_blueprint.shift.2'))
)
