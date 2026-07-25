// priority: 999
const OrganISSEntitySpellCastEvent = new OrganEventModel('iss_entity_spell_cast')

EntityEvents.spellOnCast(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganISSEntitySpellCastEvent.run(entity, customData, [event])
})