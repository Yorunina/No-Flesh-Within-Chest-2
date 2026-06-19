// priority: 999
const OrganEntityFallEvent = new OrganEventModel('entity_fall')

NativeEvents.onEvent($LivingFallEvent, /** @param {Internal.LivingFallEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganEntityFallEvent.run(entity, customData, [event])
})