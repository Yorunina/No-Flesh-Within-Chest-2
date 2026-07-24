// priority: 500
RegistryOrgan('kubejs:weevil_mouth')
    .addScore('chestcavity:strength', 1)
    .addScore('kubejs:knockback', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WeevilMouthKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    SummonMudTowardFacing(player, level)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:weevil_mouth')
        .addOnlyStrategy('key_active', WeevilMouthKeyActive)
)