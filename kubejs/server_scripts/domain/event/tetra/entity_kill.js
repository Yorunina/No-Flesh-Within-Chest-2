// priority: 0

const TetraEntityKillEvent = new TetraEffectEventModel('entity_kill')

NativeEvents.onEvent($EventPriority.NORMAL, false, $LivingDeathEvent,
    /** @param {Internal.LivingDeathEvent} event */ event => {
        let customData = {}
        TetraEntityKillEvent.run(customData, [event])
    })
