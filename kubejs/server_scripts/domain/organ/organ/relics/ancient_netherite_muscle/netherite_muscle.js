// priority: 500
RegistryOrgan('kubejs:netherite_muscle')
    .addScore('kubejs:extreme_strength', 3)
    .addScore('chestcavity:strength', 3)
    .addScore('chestcavity:endurance', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingDeathEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function NetheriteMuscleEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'ancient') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:ancient_netherite_muscle'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:netherite_muscle')
        .addOnlyStrategy('entity_kill', NetheriteMuscleEntityKill)
)