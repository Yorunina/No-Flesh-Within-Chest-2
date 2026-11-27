// priority: 999
const OrganDamageDodgeEvent = new OrganEventModel('damage_dodge')
const TetraDamageDodgeEvent = new TetraEffectEventModel('damage_dodge')

MAAEvents.attributesLibDodge(/** @param {Internal.AttributesLibDodgeEventJS} event */ event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganDamageDodgeEvent.run(entity, customData, [event])
    TetraDamageDodgeEvent.run(entity, customData, [event])
})
