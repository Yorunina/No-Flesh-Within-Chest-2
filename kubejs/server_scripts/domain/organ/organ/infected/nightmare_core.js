// priority: 500
RegistryOrgan('kubejs:nightmare_core')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:defense', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.PlayerSpawnPhantomsEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function NightmareCorePlayerSpawnPhantoms(customData, event, organItem, organIndex, slotType) {
    event.setPhantomsToSpawn(0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:nightmare_core')
        .addOnlyStrategy('player_spawn_phantoms', NightmareCorePlayerSpawnPhantoms)
)
