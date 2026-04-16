// priority: 500
RegistryOrgan('kubejs:dumbo_octopus_hat')
    .addScore('chestcavity:defense', -0.5)
    .addScore('chestcavity:swim_speed', 1)
    .setCanSpawn(true)
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function DumboOctopusHatKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    let nervesScore = player.chestCavityInstance.getOrganScore('chestcavity:nerves')
    let duration = 20 * (10 + nervesScore * 5)
    player.potionEffects.add('minecraft:water_breathing', duration, 0, false, false)
    player.addItemCooldown(organItem, 20 * 60)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dumbo_octopus_hat')
        .addOnlyStrategy('key_active', DumboOctopusHatKeyActive)
)