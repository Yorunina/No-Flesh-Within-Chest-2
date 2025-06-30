// priority: 500
RegistryOrgan('kubejs:dragon_blood_heart')
    .addScore('chestcavity:health', 2)
    .addScore('kubejs:extreme_strength', 1)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function DragonBloodHeartKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    let nervesScore = player.chestCavityInstance.getOrganScore('chestcavity:nerves')
    let duration = 20 * (10 + nervesScore * 2)
    player.potionEffects.add('kubejs:dragon_power', duration, 0, false, false)
    player.addItemCooldown(organItem, 20 * 60)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dragon_blood_heart')
        .addOnlyStrategy('key_active', DragonBloodHeartKeyActive)
)


