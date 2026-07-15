// priority: 500
RegistryOrgan('kubejs:leviathan_rib')
    .addScore('chestcavity:defense', 3)
    .addScore('chestcavity:swim_speed', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:sculk_tentacles', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:sculk_tentacles')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const source = event.source.actual
    if (!source) return
    const level = entity.level
    let targetPosition = source.position()
    targetPosition = targetPosition.add(new Vec3d(ISSUtils.getRandomScaled(1), ISSUtils.getRandomScaled(1), ISSUtils.getRandomScaled(1)))
    targetPosition = ISSUtils.moveToRelativeGroundLevel(level, targetPosition, 8)
    let tentacle = new $VoidTentacle(level, entity, Math.max(entity.getArmorValue() * 5, 5))
    tentacle.moveTo(targetPosition)
    tentacle.setYBodyRot(Math.floor(Math.random() * 360))
    level.addFreshEntity(tentacle)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leviathan_rib')
        .addOnlyStrategy('entity_be_hurt', LeviathanRibEntityBeHurt)
        .addOnlyStrategy('chest_cavity_update', LeviathanRibChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', LeviathanRibOrganTakeOff)
)