// priority: 500
RegistryOrgan('kubejs:pitcher_stomach')
    .addScore('chestcavity:nutrition', 0.5)
    .addScore('chestcavity:digestion', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)

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
    if (sourceEntity.isPlayer() && !IsFullChargeAttck(sourceEntity)) return
    /** @type {Internal.LivingEntity} */
    const target = event.entity
    const curDamage = organItem.getDamageValue()
    if (curDamage == 1) CommonDingNotice(sourceEntity.level, sourceEntity)
    if (curDamage > 0) {
        organItem.setDamageValue(curDamage - 1)
        if (sourceEntity.isPlayer()) SetOrganEffect(chestCavity, new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0)))
        return
    }

    if (slotType == FertileSlot) {
        if (!target.hasEffect('kubejs:putrid_toxins')) {
            target.potionEffects.add('kubejs:putrid_toxins', 20 * 20, 0, false, false)
        } else {
            let activeEffect = target.potionEffects.getActive('kubejs:putrid_toxins')
            if (activeEffect.duration < 20 * 20) activeEffect.setDuration(20 * 20)
        }
        if (GetPutridToxinsDamage(target) < event.amount) SetPutridToxinsDamage(target, event.amount)
    } else {
        organItem.setDamageValue(organItem.getMaxDamage())
        target.potionEffects.add('kubejs:putrid_toxins', 20 * 20, 0, false, false)
        SetPutridToxinsDamage(target, event.amount)
    }

    if (sourceEntity.isPlayer()) SetOrganEffect(chestCavity, new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0)))
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
    if (entity.isPlayer()) RemoveOrganEffect(chestCavity, 'kubejs:pitcher_stomach')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pitcher_stomach')
        .addOnlyStrategy('entity_do_damage', PitcherStomachDoDamageDefer, -2)
        .addOnlyStrategy('organ_take_off', PitcherStomachChestCavityTakeOffOnly)
)

