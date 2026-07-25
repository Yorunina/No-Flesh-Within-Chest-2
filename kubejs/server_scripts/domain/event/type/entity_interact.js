// priority: 999
const OrganEntityBeInteractedEvent = new OrganEventModel('entity_be_interacted')
const OrganEntityInteractEvent = new OrganEventModel('entity_interact')

ItemEvents.entityInteracted(event => {
    const entity = event.entity
    const target = event.target
    if (!entity) return
    let customData = {}
    OrganEntityInteractEvent.run(entity, customData, [event])
    if (target && target.isAlive()) {
        OrganEntityBeInteractedEvent.run(target, customData, [event])
    }
})