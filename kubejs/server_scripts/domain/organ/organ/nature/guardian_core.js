// priority: 500
RegistryOrgan('kubejs:guardian_core')
    .addScore('chestcavity:nerves', 1)
    .addScore('chestcavity:luck', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OrganAddStatusEffectJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function GuardianCoreOrganAddStatusEffect(customData, event, organItem, organIndex, slotType) {
    const effectInstance = event.effect
    if (effectInstance.getEffect().equals($MobEffects.DIG_SLOWDOWN)) {
        event.setEffect(new $MobEffectInstance('minecraft:haste', effectInstance.getDuration(), effectInstance.getAmplifier()))
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:guardian_core')
        .addOnlyStrategy('organ_add_status_effect', GuardianCoreOrganAddStatusEffect)
)