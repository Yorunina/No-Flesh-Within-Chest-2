// priority: 500
RegistryOrgan('kubejs:corroded_leviathan_rib')
    .addScore('chestcavity:defense', 8)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:endurance', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingDeathEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CorrodedLeviathanRibEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'relics') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:leviathan_rib'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:corroded_leviathan_rib')
        .addOnlyStrategy('entity_kill', CorrodedLeviathanRibEntityKill)
)