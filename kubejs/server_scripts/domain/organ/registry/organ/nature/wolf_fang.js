// priority: 500
RegistryOrgan('kubejs:wolf_fang')
    .addScore('chestcavity:strength', 2)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WolfFangKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let target = player.lastHurtMob
    let tamedLivingList = GetTamedEntityWithinRadius(level, player, 16)
    tamedLivingList.forEach(pEntity => {
        if (pEntity instanceof $PathfinderMob) {
            pEntity.setTarget(target)
            pEntity.potionEffects.add('farm_and_charm:dog_food', 20 * 30, 2, false, false)
        }
    })
    player.addItemCooldown(organItem, 20 * 60)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:wolf_fang')
        .addOnlyStrategy('key_active', WolfFangKeyActive)
)