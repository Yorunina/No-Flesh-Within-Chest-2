// priority: 100
/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
 */
NativeEvents.onEvent($LivingHurtEvent, /** @param {Internal.LivingHurtEvent} event */ event => {
    if (!event.source.actual) return

    if (event.source.is($DamageTypes.THORNS)) return

    let customData = {
        thornsDamage: 0
    }
    OrganEntityDoDamage(event, customData)
    FinalEntityDoDamage(event, customData)
    if (customData.thornsDamage > 0 && event.entity) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})

/**
 * 实际受伤（过护甲结算）节点，适合用于结算受伤效果
 */
NativeEvents.onEvent($LivingDamageEvent, /** @param {Internal.LivingDamageEvent} event */ event => {
    const entity = event.entity

    if (!entity) return

    if (event.source.is($DamageTypes.THORNS)) return
    
    let customData = {
        thornsDamage: 0
    }
    WitnessCuriosEntityBeHurt(event, customData)
    OrganEntityBeHurt(event, customData)
    if (customData.thornsDamage > 0 && event.source.actual) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})


/**
 * 箱子战利品事件
 * 统一处理箱子战利品刷新规则，优先进行战利品的规则标准化，而后执行器官等行为对战利品的修改
 */
LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.CHEST)
        .apply(event => {
            // StandardizeChestLoot(event)
            OrganChestLootHandle(event)
        })
})