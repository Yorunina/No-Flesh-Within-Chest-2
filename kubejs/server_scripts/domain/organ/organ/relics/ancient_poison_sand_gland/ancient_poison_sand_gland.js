// priority: 500
RegistryOrgan('kubejs:ancient_poison_sand_gland')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:filtration', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientPoisonSandGlandChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:poison_splash', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientPoisonSandGlandTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:poison_splash')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientPoisonSandGlandEntityKill(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const source = event.source.actual
    const level = entity.level
    
    const poisonSplash = new $PoisonSplash(level)
    poisonSplash.setOwner(source)
    poisonSplash.moveTo(entity.position())
    poisonSplash.setDamage(entity.getMaxHealth())
    poisonSplash.setEffectDuration(300)
    level.addFreshEntity(poisonSplash)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_poison_sand_gland')
        .addOnlyStrategy('chest_cavity_update', AncientPoisonSandGlandChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', AncientPoisonSandGlandTakeOff)
        .addOnlyStrategy('entity_kill', AncientPoisonSandGlandEntityKill)
)