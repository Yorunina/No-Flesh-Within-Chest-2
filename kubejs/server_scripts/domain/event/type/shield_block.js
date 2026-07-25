// priority: 999
const OrganShieldBlockEvent = new OrganEventModel('shield_block')

NativeEvents.onEvent($ShieldBlockEvent,/** @param {Internal.ShieldBlockEvent} event */ event => {
    const entity = event.entity
    if (!entity) return

    let customData = {
        thornsDamage: 0
    }
    OrganShieldBlockEvent.run(entity, customData, [event])
    if (customData.thornsDamage > 0 && event.damageSource.actual) {
        let level = entity.level
        event.damageSource.actual.attack(level.damageSources().thorns(entity), customData.thornsDamage)
    }
})