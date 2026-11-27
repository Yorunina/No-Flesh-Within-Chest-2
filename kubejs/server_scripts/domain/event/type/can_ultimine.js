// priority: 999
const TetraCanUltimineEvent = new TetraEffectEventModel('can_ultimine')

MAAEvents.canUltimine(/** @param {Internal.CanUltimineEventJS} event */ event => {
    let customData = {}
    TetraCanUltimineEvent.run(event.entity, customData, [event])
})
