// priority: 999
const OrganArsEffectResolvePre = new OrganEventModel('ars_effect_resolve_pre')

NativeEvents.onEvent($EffectResolveEventPre,/** @param {Internal.EffectResolveEvent$Pre} event */ event => {
    const shooter = event.shooter
    if (!shooter.isPlayer()) return
    let customData = {}
    OrganArsEffectResolvePre.run(shooter, customData, [event])
})