// priority: 500
RegistryOrgan('kubejs:pirate_eye')
    .addScore('chestcavity:luck', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.TradeWithVillagerEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PirateEyeTradeWithVillager(customData, event, organItem, organIndex, slotType) {
    const villager = event.abstractVillager
    const level = villager.level
    SpawnLootAtVec3(level, villager.position(), [Item.of('minecraft:emerald')])
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pirate_eye')
        .addOnlyStrategy('trade_with_villager', PirateEyeTradeWithVillager)
)