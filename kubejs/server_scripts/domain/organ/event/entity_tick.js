// priority: 500
const OrganEntityTickEvent = new OrganEventModel('entity_tick')

ChestCavityEvents.openedEntityTick(event => {
    const entity = event.entity
    if (!entity || entity.age % 20 != 0) return
    let customData = {}
    OrganEntityTickEvent.run(entity, customData, [event])
})
