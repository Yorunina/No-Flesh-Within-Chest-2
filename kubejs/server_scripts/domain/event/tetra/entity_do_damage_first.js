// priority: 0

const TetraEntityDoDamageFirstEvent = new TetraEffectEventModel('entity_do_damage_first')

NativeEvents.onEvent($EventPriority.HIGHEST, false, $LivingHurtEvent,
    /** @param {Internal.LivingHurtEvent} event */ event => {
        let customData = {}
        TetraEntityDoDamageFirstEvent.run(customData, [event])
    })
