// priority: 500
RegistryOrgan('kubejs:kraken_cloudy_eye')
    .addScore('chestcavity:nutrition', 3)
    .addScore('chestcavity:digestion', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KrakenCloudyEyeChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:black_hole', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KrakenCloudyEyeTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:black_hole')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KrakenCloudEyeEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.type != 'cataclysm:scylla') return
    if (entity.persistentData.getString('relicsStage') != 'relics') return
    SetChestCavityOrgan(customData, event.source.actual.chestCavityInstance, Item.of('kubejs:kraken_eye'), organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:kraken_cloudy_eye')
        .addOnlyStrategy('chest_cavity_update', KrakenCloudyEyeChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', KrakenCloudyEyeTakeOff)
        .addOnlyStrategy('entity_kill', KrakenCloudEyeEntityKill)
)