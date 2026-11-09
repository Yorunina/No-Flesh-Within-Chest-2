// priority: 0

const TetraEntityDoDamageEvent = new TetraEffectEventModel('entity_do_damage')

// 器官之后执行原武器链；链内取消不终止后续效果。
NativeEvents.onEvent($EventPriority.NORMAL, false, $LivingHurtEvent,
    /** @param {Internal.LivingHurtEvent} event */ event => {
        let customData = {
            event: event,
            entity: event.entity,
            source: event.source
        }
        TetraEntityDoDamageEvent.run(customData, [event])
    })
