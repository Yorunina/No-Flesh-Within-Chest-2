// priority: 500
RegistryOrgan('kubejs:underworld_knight_bone')
    .addScore('chestcavity:defense', 3)
    .addScore('chestcavity:endurance', 3)
    .addScore('kubejs:extreme_fitness', 3)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingDeathEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function UnderworldKnightBoneEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'ancient') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:ancient_underworld_knight_bone'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:underworld_knight_bone')
        .addOnlyStrategy('entity_kill', UnderworldKnightBoneEntityKill)
)