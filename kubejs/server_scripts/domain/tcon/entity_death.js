// priority: 500
const SoulHunterModifier = SimpleTCon.getModifier('kubejs:soul_hunter')

LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.ENTITY)
        .apply(event => {
            const player = event.getKillerEntity()
            if (!player || !player.isPlayer()) return
            let mainHandTool = SimpleTCon.getToolInSlot(player, 'mainhand')
            if (!mainHandTool) return
            let modifier = mainHandTool.getModifier(SoulHunterModifier)
            if (!modifier) return
            const target = event.getEntity()
            if (Math.random() < modifier.getLevel() * 0.05) {
                event.addLoot(LootEntry.of('kubejs:soul_crystal', 1, {
                    'EntityType': target.type
                }))
            }
        })
})