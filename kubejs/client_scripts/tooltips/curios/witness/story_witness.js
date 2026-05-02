// priority: 900
const StoryWitnessLootList = [
    { damage: 10, lootList: [Item.of('acacia_button')] },
    { damage: 30, lootList: [Item.of('acacia_boat')] },
    { damage: 50, lootList: [Item.of('acacia_door')] }
]


ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:story_witness')
    .setShiftDescription(Text.translatable('tooltips.kubejs.witness.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.witness.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.witness.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.witness.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.story_witness.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.story_witness.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.story_witness.shift.2'))
    .addAlt((text, item) => {
        let nbt = item.getOrCreateTag()
        let damageAmount = nbt.getLong('damageAmount')
        let stage = nbt.getInt('stage')
        let nextDamageAmount = StoryWitnessLootList[stage].damage
        let textList = [Text.translatable('tooltips.kubejs.story_witness.alt.1', damageAmount, nextDamageAmount.toFixed(0))]

        for (let i = 0; i < StoryWitnessLootList.length; i++) {
            let lootObj = StoryWitnessLootList[i]
            let lootName = ''
            lootObj.lootList.forEach(pItem => {
                lootName += Text.translatable(pItem.getDescriptionId()).getString() + ' x ' + pItem.getCount() + ' '
            })
            if (i < stage) {
                textList.push(Text.translatable('tooltips.kubejs.story_witness.alt.2', lootObj.damage.toFixed(0), lootName).darkGray())
            } else {
                textList.push(Text.translatable('tooltips.kubejs.story_witness.alt.2', lootObj.damage.toFixed(0), lootName).gold())
            }

        }
        return textList
    })
)