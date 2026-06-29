// priority: 900
const EternalOathEntitySpawnedConfig = [
    { healthMulti: 1, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1 },
    { healthMulti: 2, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.1 },
    { healthMulti: 3, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.2 },
    { healthMulti: 5, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.5 },
    { healthMulti: 10, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.8 },
    { healthMulti: 20, attackMulti: 2, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 2 },
    { healthMulti: 30, attackMulti: 3, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 2.2 },
    { healthMulti: 50, attackMulti: 4, armorMulti: 2, toughnessMulti: 2, lootMulti: 2.5 },
    { healthMulti: 100, attackMulti: 5, armorMulti: 2, toughnessMulti: 2, lootMulti: 3 },
    { healthMulti: 300, attackMulti: 6, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 3 },
    { healthMulti: 500, attackMulti: 7, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 3 },
    { healthMulti: 1000, attackMulti: 8, armorMulti: 3, toughnessMulti: 3, lootMulti: 3 },
]

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:eternal_oath')
    .setShiftDescription(Text.translatable('tooltips.kubejs.oath.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.oath.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.oath.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.oath.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.eternal_oath.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.eternal_oath.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.eternal_oath.shift.2'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const state = nbt.getInt('state')
        let spawnConfig = EternalOathEntitySpawnedConfig[state]
        return [
            Text.translatable('tooltips.kubejs.eternal_oath.alt.1', Text.gold((state + 1).toFixed(0))),
            Text.translatable('tooltips.kubejs.eternal_oath.alt.2', Text.gold(spawnConfig.healthMulti), Text.gold(spawnConfig.attackMulti), Text.gold(spawnConfig.armorMulti), Text.gold(spawnConfig.toughnessMulti), Text.gold(spawnConfig.lootMulti))
        ]
    })
)