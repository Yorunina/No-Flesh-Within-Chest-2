// priority: 500
RegistryOrgan('kubejs:decayed_infernal_dragon_crystal')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DecayedInfernalDragonCrystalChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:burning_dash', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DecayedInfernalDragonCrystalTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:burning_dash')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function DecayedInfernalDragonCrystalEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'relics') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:infernal_dragon_crystal'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:decayed_infernal_dragon_crystal')
        .addOnlyStrategy('chest_cavity_update', DecayedInfernalDragonCrystalChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', DecayedInfernalDragonCrystalTakeOff)
        .addOnlyStrategy('entity_kill', DecayedInfernalDragonCrystalEntityKill)
)
