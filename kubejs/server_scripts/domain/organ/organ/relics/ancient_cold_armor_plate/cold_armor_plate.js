// priority: 500
RegistryOrgan('kubejs:cold_armor_plate')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:nerves', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ColdArmorPlateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:ascension', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ColdArmorPlateTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:ascension')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ColdArmorPlateEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'relics') return
    SetChestCavityOrgan(customData, entity.chestCavityInstance, Item.of('kubejs:shining_cold_armor_plate'), organIndex, slotType, true)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cold_armor_plate')
        .addOnlyStrategy('chest_cavity_update', ColdArmorPlateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', ColdArmorPlateTakeOff)
        .addOnlyStrategy('entity_kill', ColdArmorPlateEntityKill)
)

