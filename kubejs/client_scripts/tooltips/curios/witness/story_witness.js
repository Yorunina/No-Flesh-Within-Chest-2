// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:story_witness')
    .setShiftDescription(Text.translatable('tooltips.kubejs.witness.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.witness.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.witness.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.witness.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.story_witness.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.story_witness.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.story_witness.shift.2'))
    .addShift(Text.translatable('tooltips.kubejs.story_witness.shift.3'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        let damageAmount = nbt.getLong('damageAmount')
        let stage = nbt.getInt('stage')
        const textList = []
        const StoryWitnessLootList = [
            { damage: 100, lootList: [Item.of('minecraft:iron_ingot', 8)] },
            { damage: 500, lootList: [Item.of('minecraft:diamond', 3)] },
            { damage: 1000, lootList: [Item.of('kubejs:fox_tail')] },
            { damage: 3000, lootList: [Item.of('kubejs:koi_fish_scale')] },
            { damage: 5000, lootList: [Item.of('tetra:geode', 8)] },
            { damage: 10000, lootList: [Item.of('kubejs:bravery_witness')] },
            { damage: 50000, lootList: [Item.of('kubejs:perseverance_witness')] },
            { damage: 100000, lootList: [Item.of('kubejs:knowledge_witness')] },
            { damage: 1000000, lootList: [Item.of('cataclysm:altar_of_fire')] },
            { damage: 5000000, lootList: [Item.of('minecraft:warden_spawn_egg')] },
            { damage: 10000000, lootList: [Item.of('minecraft:potion', '{Potion:"potioncore:flight"}')] },
            { damage: 50000000, lootList: [Item.of('create:creative_blaze_cake')] },
            { damage: 100000000, lootList: [Item.of('kaleidoscope_cookery:sakura_fubuki')] },
            { damage: 500000000, lootList: [Item.of('chisel:futura/controller')] },
            { damage: 1000000000, lootList: [Item.of('kaleidoscope_cookery:transmutation_lunch_bag')] }
        ]

        for (let i = 0; i < StoryWitnessLootList.length; i++) {
            let lootObj = StoryWitnessLootList[i]
            let lootNameList = []
            lootObj.lootList.forEach(pItem => {
                lootNameList.push(pItem.getDisplayName().getString() + ' x ' + pItem.getCount())
            })
            let lootName = lootNameList.join('、')
            if (i < stage) {
                textList.push(Text.translatable('tooltips.kubejs.story_witness.alt.1', '+ ', lootObj.damage.toFixed(0), lootName).darkGray())
            } else if (i == stage) {
                textList.push(Text.translatable('tooltips.kubejs.story_witness.alt.1', '→ ', damageAmount.toFixed(0) + ' / ' + lootObj.damage.toFixed(0), lootName).gold())
            } else {
                textList.push(Text.translatable('tooltips.kubejs.story_witness.alt.1', '- ', lootObj.damage.toFixed(0), lootName).gray())
            }
        }
        return textList
    })
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:story_proof')
    .addDefault(Text.translatable('tooltips.kubejs.story_proof.default.1').gray())
)