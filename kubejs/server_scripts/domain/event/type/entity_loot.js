// priority: 999
const OrganEntityLootEvent = new OrganEventModel('entity_loot')
const CuriosEntityLootEvent = new CuriosEventModel('entity_loot')
const TetraEntityLootEvent = new TetraEffectEventModel('entity_loot')

LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.ENTITY)
        .apply(event => {
            const entity = event.killerEntity
            if (!entity) return
            let customData = {}
            OrganEntityLootEvent.run(entity, customData, [event])
            CuriosEntityLootEvent.run(entity, customData, [event])
            TetraEntityLootEvent.run(entity, customData, [event])
        })
})
