// priority: 500
RegistryOrgan('kubejs:underworld_knight_debris')
    .addScore('kubejs:extreme_fitness', 3)
    .addScore('chestcavity:endurance', 3)
    .addScore('chestcavity:health', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingDeathEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function UnderworldKnightDebrisEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'relics') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:underworld_knight_bone'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:underworld_knight_debris')
        .addOnlyStrategy('entity_kill', UnderworldKnightDebrisEntityKill)
)