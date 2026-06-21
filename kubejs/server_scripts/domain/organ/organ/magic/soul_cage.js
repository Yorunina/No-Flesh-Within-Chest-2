// priority: 500
RegistryOrgan('kubejs:soul_cage')
    .addScore('chestcavity:endurance', 1)
    .addScore('chestcavity:nerves', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SoulCageEntityKill(customData, event, organItem, organIndex, slotType) {
    let damageValue = organItem.getDamageValue()
    if (damageValue == 0) return
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    const entity = event.entity
    const level = entity.level
    const difficulty = level.getDifficulty().getId()
    let recoverValue = difficulty
    if (damageValue > recoverValue) {
        organItem.setDamageValue(damageValue - recoverValue)
    } else {
        organItem.setDamageValue(0) 
    }
    if (sourceEntity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SoulCageChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:soul_cage')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SoulCageEntityTick(customData, event, organItem, organIndex, slotType) {
    let damageValue = organItem.getDamageValue()
    if (damageValue == organItem.getMaxDamage()) return
    const entity = event.entity
    if (entity.getMaxHealth() - entity.getHealth() == 0) return
    entity.heal(2)
    organItem.setDamageValue(damageValue + 1)
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(entity.chestCavityInstance, organEffect)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:soul_cage')
        .addOnlyStrategy('entity_kill', SoulCageEntityKill)
        .addOnlyStrategy('organ_take_off', SoulCageChestCavityTakeOffOnly)
       .addOnlyStrategy('entity_tick', SoulCageEntityTick)
)