// priority: 500
RegistryOrgan('kubejs:llama_gland')
    .addScore('chestcavity:speed', 1)
    .addScore('chestcavity:breath_recovery', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LlamaGlandKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    SpitTowardFacing(player, level)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:llama_gland')
        .addOnlyStrategy('key_active', LlamaGlandKeyActive)
)
