// priority: 0

const TetraEntityDoDamageFinalEvent = new TetraEffectEventModel('entity_do_damage_final')

NativeEvents.onEvent($EventPriority.LOWEST, false, $LivingDamageEvent,
    /** @param {Internal.LivingDamageEvent} event */ event => {
        let customData = {}
        TetraEntityDoDamageFinalEvent.run(customData, [event])
    })
