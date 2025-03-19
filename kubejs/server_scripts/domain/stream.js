// priority: 100
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算伤害效果
 */
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

/**
 * 实际受伤（过护甲结算）节点，适合用于结算受伤效果
 */
NativeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', /** @param {Internal.LivingDamageEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    const amount = event.amount
    let customData = {
        thornsDamage: 0
    }
    if (entity.isAlive() && entity instanceof $LivingEntity && !entity.chestCavityInstance.opened) {
        entity.chestCavityInstance.opened = true
    }
    OrganEntityBeHurt(event, customData)
    if (amount > 0) {
        OrganScoreDamagedEffect(event, customData)
    }
    if (customData.thornsDamage != 0 && event.source.actual) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})



NativeEvents.onEvent('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent', /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    if (entity.level.isClientSide()) return
    if (!entity.isAlive() || !entity.isPlayer()) return
    let customData = {}
    OrganSpellSelection(event, customData)
    ApplyPlayerSpellSelection(event)
})

