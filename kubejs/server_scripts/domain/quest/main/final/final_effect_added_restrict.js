// priority: 100
NativeEvents.onEvent($MobEffectApplicableEvent, /** @param {Internal.MobEffectEvent$Applicable} event */ event => {
    const entity = event.entity
    if (entity instanceof $ServerPlayer) {
        if (AStages.serverHasStage(FTBFinalIteration10, entity.server)) {
            event.setResult('deny')
            entity.onEffectRemoved(event.getEffectInstance())
        }
    }
})