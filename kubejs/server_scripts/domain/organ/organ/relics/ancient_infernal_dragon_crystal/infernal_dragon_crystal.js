// priority: 500
RegistryOrgan('kubejs:infernal_dragon_crystal')
    .addScore('kubejs:roll_energy', 1)
    .addScore('chestcavity:fire_resistant', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonCrystalChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:eternal_burning_dash', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonCrystalTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:eternal_burning_dash')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonCrystalEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'ancient') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:ancient_infernal_dragon_crystal'), organIndex, slotType, true)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:infernal_dragon_crystal')
        .addOnlyStrategy('chest_cavity_update', InfernalDragonCrystalChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', InfernalDragonCrystalTakeOff)
        .addOnlyStrategy('entity_kill', InfernalDragonCrystalEntityKill)
)
