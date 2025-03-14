// priority: 500
publicField.NFWC.events.OrganEntityLootEvent = new OrganEventModel('entity_loot')

const OrganEntityLootEvent = publicField.NFWC.events.OrganEntityLootEvent
LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.ENTITY)
        .apply(event => {
            const entity = event.killerEntity
            if (!entity) return
            let customData = {}
            OrganEntityLootEvent.run(entity, customData, [event])
        })
})
