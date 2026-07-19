// priority: 500
RegistryOrgan('kubejs:yeti_fur')
    .addScore('chestcavity:health', 0.5)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function YetiFurChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:ice_aura', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function YetiFurTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:ice_aura')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function YetiFurEntityKill(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const source = event.source.actual
    const level = entity.level

    const radius = 6

    const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (level, pEntity) => !ISSDamageSources.isFriendlyFireBetween(pEntity, source) && !pEntity.isPassenger() && !pEntity.isSpectator())

    const duration = 20 * 15
    const damageAmplifier = targets.length
    for (let target of targets) {
        let iceTombEntity = new $IceTombEntity(level, target)
        iceTombEntity.moveTo(target.position())
        iceTombEntity.setDeltaMovement(target.getDeltaMovement())
        iceTombEntity.setEvil()
        iceTombEntity.setLifetime(duration)
        iceTombEntity.setDamageAmplifier(damageAmplifier)
        level.addFreshEntity(iceTombEntity)
        target.startRiding(iceTombEntity, true)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:yeti_fur')
        .addOnlyStrategy('chest_cavity_update', YetiFurChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', YetiFurTakeOff)
        .addOnlyStrategy('entity_kill', YetiFurEntityKill)
)