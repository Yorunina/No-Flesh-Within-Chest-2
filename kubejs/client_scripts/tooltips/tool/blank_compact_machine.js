// priority: 800
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:blank_compact_machine')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.blank_compact_machine.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.blank_compact_machine.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.blank_compact_machine.shift.2', ItemCoverHover))
)