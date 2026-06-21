// priority: 500
RegistryOrgan('kubejs:vita_sunflower')
    .addScore('chestcavity:health', 1.5)
    .addScore('kubejs:photosynthesis', 1)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function VitaSunflowerDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const target = event.entity
    if (!target.hasEffect('kubejs:vita_toxins')) return
    let effect = target.getEffect('kubejs:vita_toxins')
    let leftDamage = organItem.getMaxDamage() - organItem.getDamageValue()
    if (leftDamage < 10) return
    organItem.setDamageValue(organItem.getMaxDamage())
    effect.setDuration(effect.duration + 20 * leftDamage)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function VitaSunflowerEntityTick(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (organItem.getDamageValue() - 1 >= 0) {
        organItem.setDamageValue(organItem.getDamageValue() - 1)
    }
    if (entity instanceof $ServerPlayer) {
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
function VitaSunflowerChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:vita_sunflower')
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:vita_sunflower')
        .addOnlyStrategy('entity_do_damage', VitaSunflowerDoDamage)
        .addOnlyStrategy('entity_tick', VitaSunflowerEntityTick)
        .addOnlyStrategy('organ_take_off', VitaSunflowerChestCavityTakeOffOnly)
)