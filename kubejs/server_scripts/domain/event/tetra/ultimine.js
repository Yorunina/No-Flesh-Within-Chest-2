// priority: 500

const TetraCanUltimineEvent = new TetraEffectEventModel('can_ultimine')

MAAEvents.canUltimine(/** @param {Internal.CanUltimineEventJS} event */ event => {
    let customData = {}
    TetraCanUltimineEvent.run(customData, [event])
})
