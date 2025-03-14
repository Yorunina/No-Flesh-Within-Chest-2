// priority: 500
publicField.NFWC.events.OrganEntityTickEvent = new OrganEventModel('entity_tick')

const OrganEntityTickEvent = publicField.NFWC.events.OrganEntityTickEvent
ChestCavityEvents.openedEntityTick(event => {
    const entity = event.entity
    if (!entity || entity.age % 20 != 0) return
    let customData = {}
    OrganEntityTickEvent.run(entity, customData, [event])
})
