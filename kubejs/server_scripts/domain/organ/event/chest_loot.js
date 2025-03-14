// priority: 500

publicField.NFWC.events.OrganChestLootEvent =  new OrganEventModel('chest_loot')
const OrganChestLootEvent = publicField.NFWC.events.OrganChestLootEvent

LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.CHEST)
        .apply(event => {
            const player = event.player
            if (!player) return
            let customData = {}
            OrganChestLootEvent.run(player, customData, [event])
        })
})



