// priority: 500
RegistryOrgan('kubejs:plump_toxic_gland')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:filtration', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PlumpToxicGlandChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
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
function PlumpToxicGlandTakeOff(customData, event, organItem, organIndex, slotType) {
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
function PlumpToxicGlandEntityKill(customData, event, organItem, organIndex, slotType) {
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
    new OrganStrategyModel('kubejs:plump_toxic_gland')
        .addOnlyStrategy('chest_cavity_update', PlumpToxicGlandChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', PlumpToxicGlandTakeOff)
        .addOnlyStrategy('entity_kill', PlumpToxicGlandEntityKill)
)