// priority: 999
const TagMobEffectApplicableStrategy = new TagEventModel('mob_effect_applicable')

NativeEvents.onEvent($MobEffectApplicableEvent, /** @param {Internal.MobEffectEvent$Applicable} event */ event => {
    const entity = event.getEntity()
    if (!entity) return
    let customData = {}
    TagMobEffectApplicableStrategy.run(entity, customData, [event])
})