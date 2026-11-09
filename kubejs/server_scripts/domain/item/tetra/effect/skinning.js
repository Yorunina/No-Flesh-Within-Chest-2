// priority: 0

let SKINNING_DURABILITY_COST = 1

/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function SkinningEntityLoot(customData, event) {
    let entity = event.entity
    if (!entity || !entity.isLiving()) return

    let killer = event.killerEntity
    if (!killer || !killer.isLiving()) return

    SkinningApply(killer, entity, event, killer.mainHandItem)
    SkinningApply(killer, entity, event, killer.offHandItem)
}

/**
 * 单手剥皮判定与结算
 * @param {Internal.LivingEntity} killer 击杀者
 * @param {Internal.LivingEntity} entity 被击杀实体
 * @param {*} ctx LootJS 上下文（取 damageSource 与 loot）
 * @param {Internal.ItemStack} stack 该手物品
 */
function SkinningApply(killer, entity, ctx, stack) {
    if (!stack || stack.isEmpty()) return
    /**@type {Internal.ModularItem} */
    let modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(stack, 'kubejs:skinning')
    if (effectLevel <= 0) return
    let effectEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:skinning')
    if (effectEfficiency <= 0) return

    // 与材料、打磨和属性条一致：level 为尝试次数，efficiency 为概率百分数。
    let chance = effectEfficiency / 100
    let rolls = 0
    for (let i = 0; i < effectLevel; i++) {
        if (Math.random() < chance) rolls++
    }
    if (rolls <= 0) return

    let level = entity.level
    let lootTable = $DespoilLootModifier.getLootTable(level, entity)
    let loot = ctx.loot
    let lootParams = new $LootParamsBuilder(level)
        .withParameter($LootContextParams.THIS_ENTITY, entity)
        .withParameter($LootContextParams.DAMAGE_SOURCE, ctx.damageSource)
        .withParameter($LootContextParams.ORIGIN, entity.position)
        .withOptionalParameter($LootContextParams.KILLER_ENTITY, killer)
        .withOptionalParameter($LootContextParams.DIRECT_KILLER_ENTITY, killer)
        .create($LootContextParamSets.ENTITY)

    let added = 0
    let stackSplitter = $LootTable.createStackSplitter(level, (s) => {
        added += s.getCount()
        return loot.add(s)
    })
    for (let i = 0; i < rolls; i++) {
        added = 0
        $DespoilLootModifier.getRandomItems(lootTable, lootParams, stackSplitter)
        if (added > 0) modularItem.applyDamage(SKINNING_DURABILITY_COST, stack, killer)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:skinning')
        .addStrategy('entity_loot', SkinningEntityLoot, -30)
)
