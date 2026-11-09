// priority: 500

const TetraEntityAttackCanceledEvent = new TetraEffectEventModel('entity_attack_canceled')

NativeEvents.onEvent($EventPriority.LOWEST, true, $LivingAttackEvent,
    /** @param {Internal.LivingAttackEvent} event */ event => {
        let customData = {}
        TetraEntityAttackCanceledEvent.run(customData, [event])
    })
