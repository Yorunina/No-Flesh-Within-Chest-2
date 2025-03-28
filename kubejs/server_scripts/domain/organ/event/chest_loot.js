// priority: 999
const OrganChestLootEvent = new OrganEventModel('chest_loot')

LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.CHEST)
        .apply(event => {
            const player = event.player
            if (!player) return
            let customData = {}
            OrganChestLootEvent.run(player, customData, [event])
            UpdateClientISSSpellDataEvent(customData, player)
        })
})



