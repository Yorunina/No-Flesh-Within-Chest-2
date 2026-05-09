// priority: 900
const BraveryWitnessEachItemDamage = 10000
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:bravery_witness')
    .setShiftDescription(Text.translatable('tooltips.kubejs.witness.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.witness.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.witness.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.witness.alt_holding.1'))
    .addShift(Text.translatable('tooltips.kubejs.bravery_witness.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.bravery_witness.shift.2'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const textList = [
            Text.translatable('tooltips.kubejs.bravery_witness.alt.1', nbt.getLong('damageAmount').toFixed(0) + ' / ' + BraveryWitnessEachItemDamage.toFixed(0)).gold(),
            Text.translatable('tooltips.kubejs.bravery_witness.alt.2', nbt.getInt('itemCounts').toFixed(0)).darkGray()
        ]
        return textList
    })
)