// priority: 0

let GUTTING_DURABILITY_CHANCE = 0.4

/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function GuttingEntityLoot(customData, event) {
    let entity = event.entity
    if (!entity || !entity.isLiving()) return
    if (entity.isPlayer()) return
    if (!(entity instanceof $ChestCavityEntity)) return

    if (entity instanceof $AbstractGolem && entity.hasFlag($GolemFlags.RECYCLE)) return

    let killer = event.killerEntity
    if (!killer || !killer.isLiving()) return

    GuttingApply(killer, entity, event, killer.mainHandItem)
    GuttingApply(killer, entity, event, killer.offHandItem)
}

/**
 * 单手剖腹判定与结算
 * @param {Internal.LivingEntity} killer 击杀者
 * @param {Internal.LivingEntity} entity 被击杀实体
 * @param {*} ctx LootJS 上下文（取 loot）
 * @param {Internal.ItemStack} stack 该手物品
 */
function GuttingApply(killer, entity, ctx, stack) {
    if (!stack || stack.isEmpty()) return
    /**@type {Internal.ModularItem} */
    let modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(stack, 'kubejs:gutting')
    if (effectLevel <= 0) return

    let guaranteed = entity.hasEffect('chestcavity:surgical_anesthesia')
    let chance = effectLevel / 100

    let ccInstance = entity.getChestCavityInstance()
    let inv = $ChestCavityUtil.openChestCavity(ccInstance)

    for (let i = 0; i < inv.containerSize; i++) {
        let organStack = inv.getItem(i)
        if (organStack.isEmpty()) continue
        if (!guaranteed && Math.random() > chance) continue
        inv.removeItemNoUpdate(i)
        ctx.loot.add(organStack)
        if (Math.random() < GUTTING_DURABILITY_CHANCE) {
            modularItem.applyDamage(1, stack, killer)
        }
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:gutting')
        .addStrategy('entity_loot', GuttingEntityLoot, -10)
)
