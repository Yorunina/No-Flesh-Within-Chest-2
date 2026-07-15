// priority: 500
RegistryOrgan('kubejs:ancient_heart')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:health', 1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientHeartChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:raise_hell', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientHeartOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:raise_hell')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientHeartEntityTick(customData, event, organItem, organIndex, slotType) {
    // if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const level = entity.level
    if (entity.isMoving()) return
    if (entity.isPlayer() && !entity.isCrouching()) return
    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    const damage = attackAttr ? attackAttr.getValue() : 5
    const aoe = new $FireEruptionAoe(level, 8)
    aoe.setOwner(entity)
    aoe.setDamage(damage)
    aoe.moveTo(ISSUtils.moveToRelativeGroundLevel(level, entity.position(), 3))
    level.addFreshEntity(aoe)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_heart')
        .addOnlyStrategy('entity_tick', AncientHeartEntityTick)
        .addOnlyStrategy('chest_cavity_update', AncientHeartChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', AncientHeartOrganTakeOff)
)