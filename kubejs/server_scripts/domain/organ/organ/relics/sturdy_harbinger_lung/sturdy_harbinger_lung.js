// priority: 500
RegistryOrgan('kubejs:sturdy_harbinger_lung')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:breath_recovery', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SturdyHararbingerLungChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:flaming_strike', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SturdyHararbingerLungTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:flaming_strike')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SturdyHararbingerLungItemLeftClicked(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const level = event.level

    const radius = 4
    const forward = entity.getForward()

    const hitLocation = entity.position().add(0, entity.getBbHeight() * 0.3, 0).add(forward.scale(2))

    const entities = level.getEntitiesWithin(AABB.ofSize(hitLocation, radius * 2, radius, radius * 2))
    const damageSource = level.damageSources().mobAttack(entity)

    const attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    const damage = attackAttr ? attackAttr.getValue() * 2 : 10

    for (let targetEntity of entities) {
        if (!targetEntity.isAlive()) continue
        if (targetEntity.position().subtract(entity.getEyePosition()).dot(forward) < 0) continue
        if (entity.distanceToSqr(targetEntity) >= radius * radius) continue
        if (!ISSUtils.hasLineOfSight(level, entity.getEyePosition(), targetEntity.getBoundingBox().getCenter(), true)) continue

        const offsetVector = targetEntity.getBoundingBox().getCenter().subtract(entity.getEyePosition())
        if (offsetVector.dot(forward) < 0) continue

        if (targetEntity.attack(damageSource, damage)) {
            MagicManager.spawnParticles(level, IronsSpellsParticleHelper.FIRE, targetEntity.getX(), targetEntity.getY() + targetEntity.getBbHeight() * 0.5, targetEntity.getZ(), 30, targetEntity.getBbWidth() * 0.5, targetEntity.getBbHeight() * 0.5, targetEntity.getBbWidth() * 0.5, 0.03, false)
        }
    }
    MagicManager.spawnParticles(level, new $FlameStrikeParticleOptions(forward.x(), forward.y(), forward.z(), false, false, 1.0), hitLocation.x(), hitLocation.y() + 0.5, hitLocation.z(), 1, 0, 0, 0, 0, true)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sturdy_harbinger_lung')
        .addOnlyStrategy('chest_cavity_update', SturdyHararbingerLungChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', SturdyHararbingerLungTakeOff)
        .addOnlyStrategy('item_left_clicked', SturdyHararbingerLungItemLeftClicked)

)