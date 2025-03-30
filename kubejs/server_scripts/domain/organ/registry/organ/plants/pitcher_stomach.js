// priority: 500
RegistryOrgan('kubejs:pitcher_stomach')
    .addScore('chestcavity:nutrition', 0.5)
    .addScore('chestcavity:digestion', 1.5)
    .addScore('chestcavity:photosynthesis', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PitcherStomachDoDamageDefer(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    if (organItem.getDamageValue() > 0) {
        organItem.setDamageValue(organItem.getDamageValue() - 1)
    } else {
        /** @type {Internal.LivingEntity} */
        const target = event.entity
        organItem.setDamageValue(organItem.getMaxDamage())
        target.potionEffects.add('kubejs:putrid_toxins', 20 * 20, 0, false, false)
        SetPutridToxinsDamage(target, event.amount)
    }
    if (sourceEntity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(150).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PitcherStomachDoDamage(customData, event, organItem, organIndex, slotType) {
    customData.localDefers.push(new OrganLocalDeferModel([event, organItem, organIndex, slotType], PitcherStomachDoDamageDefer, organIndex))
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PitcherStomachChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:pitcher_stomach')
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pitcher_stomach')
        .addOnlyStrategy('entity_do_damage', PitcherStomachDoDamage)
       .addOnlyStrategy('organ_take_off', PitcherStomachChestCavityTakeOffOnly)
)

