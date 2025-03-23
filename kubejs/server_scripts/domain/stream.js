// priority: 100
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
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

    OrganEntityBeHurt(event, customData)
    if (amount > 0) {
        OrganScoreDamagedEffect(event, customData)
    }
    if (customData.thornsDamage != 0 && event.source.actual) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})
