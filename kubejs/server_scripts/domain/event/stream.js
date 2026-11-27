// priority: 100
/**
 * 造成伤害前节点，必须先于器官和普通造伤效果执行。
 * receiveCanceled=false 使前置阶段已经取消的伤害不会进入后续普通阶段。
 */
NativeEvents.onEvent($EventPriority.HIGHEST, false, $LivingHurtEvent,
    /** @param {Internal.LivingHurtEvent} event */ event => {
        if (!event.source.actual) return

        if (event.source.is($DamageTypes.THORNS)) return

        EntityDamageFirst(event, {})
    })

/**
 * 造成伤害（未过护甲结算）节点，适合用于结算造成伤害效果
 */
NativeEvents.onEvent($LivingHurtEvent, /** @param {Internal.LivingHurtEvent} event */ event => {
    if (!event.source.actual) return

    if (event.source.is($DamageTypes.THORNS)) return

    let customData = {
        thornsDamage: 0
    }
    EntityDoDamage(event, customData)
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
    EntityBeHurt(event, customData)
    if (customData.thornsDamage > 0 && event.source.actual) {
        let level = event.entity.level
        event.source.actual.attack(level.damageSources().thorns(event.entity), customData.thornsDamage)
    }
})

/**
 * 实际受伤最终节点，适合读取其他伤害处理完成后的伤害值。
 */
NativeEvents.onEvent($EventPriority.LOWEST, false, $LivingDamageEvent,
    /** @param {Internal.LivingDamageEvent} event */ event => {
        let customData = {}
        EntityHurtFinal(event, customData)
    })


/**
 * 箱子战利品事件
 * 统一处理箱子战利品刷新规则，优先进行战利品的规则标准化，而后执行器官等行为对战利品的修改
 */
LootJS.modifiers(context => {
    context.addLootTypeModifier(LootType.CHEST)
        .apply(event => {
            // StandardizeChestLoot(event)
            ChestLootHandle(event)
        })
})
