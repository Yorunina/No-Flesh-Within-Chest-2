// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:eternal_miracle')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.eternal_miracle.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.eternal_miracle.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.eternal_miracle.shift.2', FrozenHover))
    .addShift((text, item) => {
        let nbt = item.getOrCreateTag()
        let value = nbt.getInt('value')
        return [Text.translatable('tooltips.kubejs.eternal_miracle.shift.3', Text.yellow(value.toFixed(0)))]
    })
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:incandescent_miracle')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.incandescent_miracle.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.incandescent_miracle.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.incandescent_miracle.shift.2'))
    .addShift((text, item) => {
        let nbt = item.getOrCreateTag()
        let value = nbt.getInt('value')
        return [Text.translatable('tooltips.kubejs.incandescent_miracle.shift.3', Text.yellow(value.toFixed(0)))]
    })
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:primal_miracle')
    .setShiftDescription(Text.translatable('tooltips.kubejs.tool.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.tool.shift_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.primal_miracle.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.primal_miracle.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.primal_miracle.shift.2'))
    .addShift((text, item) => {
        let nbt = item.getOrCreateTag()
        let value = nbt.getInt('value')
        return [Text.translatable('tooltips.kubejs.primal_miracle.shift.3', Text.yellow(value.toFixed(0)))]
    })
)

