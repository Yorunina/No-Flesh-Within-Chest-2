// priority: 500
RegistryOrgan('kubejs:ancient_cold_armor_plate')
    .addScore('chestcavity:defense', 2)
    .addScore('chestcavity:nerves', 2)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientColdArmorPlateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
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
function AncientColdArmorPlateTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:shockwave')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingFallEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientColdArmorPlateEntityFall(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    if (event.distance < 3) return
    const entity = event.entity
    const level = entity.level

    const radius = 16
    const attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
    const damage = (event.distance / 3) * (attackDamageAttr ? attackDamageAttr.getValue() : 0)

    MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(0.7, 1, 1, radius * 1.02), entity.getX(), entity.getY() + 0.15, entity.getZ(), 1, 0, 0, 0, 0, true)
    MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(0.7, 1, 1, radius * 0.98), entity.getX(), entity.getY() + 0.15, entity.getZ(), 1, 0, 0, 0, 0, true)
    MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(1, 1, 1, radius), entity.getX(), entity.getY() + 0.165, entity.getZ(), 1, 0, 0, 0, 0, true)
    MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(1, 1, 1, radius), entity.getX(), entity.getY() + 0.135, entity.getZ(), 1, 0, 0, 0, 0, true)
    MagicManager.spawnParticles(level, IronsSpellsParticleHelper.ELECTRICITY, entity.getX(), entity.getY() + 1, entity.getZ(), 80, 0.25, 0.25, 0.25, 0.7 + radius * 0.1, false)

    CameraShakeManager.addCameraShake(new CameraShakeData(level, 30, entity.position(), radius * 2))

    const start = entity.getBoundingBox().getCenter()
    const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (pLevel, pEntity) => pEntity.isPickable() && !pEntity.isSpectator() && !ISSDamageSources.isFriendlyFireBetween(pEntity, entity))
    const damageSource = level.damageSources().magic()
    for (let pTarget of targets) {
        let dest = pTarget.getBoundingBox().getCenter()
        MagicManager.spawnParticles(level, new $ZapParticleOption(dest), start.x(), start.y(), start.z(), 1, 0, 0, 0, 0, true)
        MagicManager.spawnParticles(level, IronsSpellsParticleHelper.ELECTRICITY, pTarget.getX(), pTarget.getY() + pTarget.getBbHeight() / 2, pTarget.getZ(), 10, pTarget.getBbWidth() / 3, pTarget.getBbHeight() / 3, pTarget.getBbWidth() / 3, 0.1, false)
        pTarget.attack(damageSource, damage)
    }

    for (let i = 0; i < 7; i++) {
        let dest = start.add(ISSUtils.getRandomVec3(1).multiply(4, 2.5, 4).add(0, 4, 0))
        MagicManager.spawnParticles(level, new $ZapParticleOption(dest), start.x(), start.y(), start.z(), 1, 0, 0, 0, 0, true)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_cold_armor_plate')
        .addOnlyStrategy('chest_cavity_update', AncientColdArmorPlateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', AncientColdArmorPlateTakeOff)
        .addOnlyStrategy('entity_fall', AncientColdArmorPlateEntityFall)
)