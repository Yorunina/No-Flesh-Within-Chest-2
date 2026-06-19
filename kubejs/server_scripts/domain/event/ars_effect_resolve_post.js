// priority: 999
const OrganArsEffectResolvePost = new OrganEventModel('ars_effect_resolve_post')

NativeEvents.onEvent($EffectResolveEventPost,/** @param {Internal.EffectResolveEvent$Post} event */ event => {
    const shooter = event.shooter
    if (!shooter.isPlayer()) return
    let customData = {}
    OrganArsEffectResolvePost.run(shooter, customData, [event])
})