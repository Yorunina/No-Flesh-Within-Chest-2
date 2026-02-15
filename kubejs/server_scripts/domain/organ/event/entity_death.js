// priority: 999
const OrganEntityDeathEvent = new OrganEventModel('entity_death')
const OrganEntityKillEvent = new OrganEventModel('entity_kill')

EntityEvents.death(event => {
    const entity = event.entity
    /**@type {Internal.LivingEntity} */
    const killer = event.source.actual
    if (!entity) return
    let customData = {}
    OrganEntityDeathEvent.run(entity, customData, [event])
    if (killer && killer.isAlive()) {
        OrganEntityKillEvent.run(killer, customData, [event])
    }
})

