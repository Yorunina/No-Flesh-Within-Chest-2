// priority: 999
const OrganEntityDeathEvent = new OrganEventModel('entity_death')
const OrganEntityKillEvent = new OrganEventModel('entity_kill')
const ChampionEntityDeathEvent = new ChampionEventModel('entity_death')
const ChampionEntityKillEvent = new ChampionEventModel('entity_kill')
const CuriosEntityDeathEvent = new CuriosEventModel('entity_death')
const CuriosEntityKillEvent = new CuriosEventModel('entity_kill')

EntityEvents.death(event => {
    const entity = event.entity
    /**@type {Internal.LivingEntity} */
    const killer = event.source.actual ? event.source.actual : (entity.lastHurtByPlayer ? entity.lastHurtByPlayer : entity.lastHurtByMob)
    if (!entity) return
    let customData = {}
    CuriosEntityDeathEvent.run(entity, customData, [event])
    OrganEntityDeathEvent.run(entity, customData, [event])
    ChampionEntityDeathEvent.run(entity, customData, [event])

    if (killer && killer.isAlive()) {
        CuriosEntityKillEvent.run(killer, customData, [event])
        OrganEntityKillEvent.run(killer, customData, [event])
        ChampionEntityKillEvent.run(killer, customData, [event])
    }
})