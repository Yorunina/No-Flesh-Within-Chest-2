// priority: 100
NativeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', /** @param {Internal.LivingHurtEvent} event */ event => {
    if (!event.source.actual) return

    if (event.source.is($DamageTypes.THORNS)) return
    
    let customData = {
        thornsDamage: 0
    }
    OrganEntityDoDamage(event, customData)
    if (customData.thornsDamage != 0 && event.entity) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})





NativeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', /** @param {Internal.LivingDamageEvent} event */ event => {
    if (!event.entity) return
    let customData = {
        thornsDamage: 0
    }
    OrganEntityBeHurt(event, customData)
    if (customData.thornsDamage != 0 && event.source.actual) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})



NativeEvents.onEvent('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent', /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
    if (!event.entity) return
    if (event.entity.level.isClientSide()) return
    if (!event.entity.isAlive()) return
    let customData = {
        OrganSpellMap: {}
    }
    OrganSpellSelection(event, customData)
})

