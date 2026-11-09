// priority: 500

const TetraEntityDoDamageBeforeEvent = new TetraEffectEventModel('entity_do_damage_before')

// 保留原四个独立监听器的取消检查和异常隔离，先于器官入口执行。
NativeEvents.onEvent($EventPriority.NORMAL, false, $LivingHurtEvent,
    /** @param {Internal.LivingHurtEvent} event */ event => {
        let customData = {}
        TetraEntityDoDamageBeforeEvent.run(customData, [event], true)
    })
