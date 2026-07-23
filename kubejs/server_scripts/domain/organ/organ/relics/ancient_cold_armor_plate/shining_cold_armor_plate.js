// priority: 500
RegistryOrgan('kubejs:shining_cold_armor_plate')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:nerves', 2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShiningColdArmorPlateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:shockwave', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShiningColdArmorPlateTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:shockwave')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ShiningColdArmorPlateEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'ancient') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:ancient_cold_armor_plate'), organIndex, slotType, true)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:shining_cold_armor_plate')
        .addOnlyStrategy('chest_cavity_update', ShiningColdArmorPlateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', ShiningColdArmorPlateTakeOff)
        .addOnlyStrategy('entity_kill', ShiningColdArmorPlateEntityKill)
)