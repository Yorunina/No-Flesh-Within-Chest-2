// priority: 500
RegistryOrgan('kubejs:abnormal_sand_gland')
    .addScore('chestcavity:detoxification', 3)
    .addScore('chestcavity:filtration', 3)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AbnormalSandGlandKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    /**@type {Internal.MobEffectInstance[]} */
    const cureEffect = []
    player.potionEffects.active.forEach(pEffect => {
        if (pEffect.effect.isBeneficial()) return
        if (pEffect.isCurativeItem('minecraft:milk_bucket')) cureEffect.push(pEffect)
    })

    cureEffect.forEach(pEffect => player.removeEffect(pEffect.effect))
    player.addItemCooldown(organItem, 20 * 15)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:abnormal_sand_gland')
        .addOnlyStrategy('key_active', AbnormalSandGlandKeyActive)
)