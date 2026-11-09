// priority: 500

const TetraEntityKillBeforeEvent = new TetraEffectEventModel('entity_kill_before')

NativeEvents.onEvent($EventPriority.NORMAL, false, $LivingDeathEvent,
    /** @param {Internal.LivingDeathEvent} event */ event => {
        let customData = {}
        TetraEntityKillBeforeEvent.run(customData, [event])
    })
