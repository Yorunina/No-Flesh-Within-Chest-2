// priority: 500
RegistryOrgan('kubejs:ancient_immortal_volcanic_crystal')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientImmortalVolcanicCrystalUpdateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:heat_surge', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientImmortalVolcanicCrystalTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:heat_surge')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingFallEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientImmortalVolcanicCrystalEntityFall(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    if (event.distance < 3) return
    const entity = event.entity
    const level = entity.level
    const radius = 10

    MagicManager.spawnParticles(level, new $BlastwaveParticleOptions(SchoolRegistry.FIRE.get().getTargetingColor(), radius), entity.getX(), entity.getY() + 0.165, entity.getZ(), 1, 0, 0, 0, 0, true)

    PacketDistributor.sendToPlayersTrackingEntityAndSelf(entity,
        new $ShockwaveParticlesPacket(
            new Vec3d(entity.getX(), entity.getY() + 0.165, entity.getZ()),
            radius,
            ParticleRegistry.FIRE_PARTICLE.get()
        )
    )

    const targets = GetLivingWithinRadiusVec3d(level, entity.position(), radius, (level, pEntity) => !ISSDamageSources.isFriendlyFireBetween(pEntity, entity))
    const attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
    const damage = attackDamageAttr ? attackDamageAttr.getValue() : 0

    for (let target of targets) {
        target.addEffect(new $MobEffectInstance('irons_spellbooks:rend', 400, 9))
        target.setRemainingFireTicks(200)
        target.attack(level.damageSources().mobAttack(entity), 10 * damage)
        target.invulnerableTime = 0
        MagicManager.spawnParticles(level, IronsSpellsParticleHelper.EMBERS, target.getX(), target.getY() + target.getBbHeight() * 0.5, target.getZ(), 50, target.getBbWidth() * 0.5, target.getBbHeight() * 0.5, target.getBbWidth() * 0.5, 0.03, false)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_immortal_volcanic_crystal')
        .addOnlyStrategy('organ_take_off', AncientImmortalVolcanicCrystalTakeOff)
        .addOnlyStrategy('chest_cavity_update', AncientImmortalVolcanicCrystalUpdateChestCavityUpdate)
        .addOnlyStrategy('entity_fall', AncientImmortalVolcanicCrystalEntityFall)
)