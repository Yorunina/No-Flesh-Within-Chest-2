// priority: 500
RegistryOrgan('kubejs:warden_core')
    .addScore('chestcavity:health', 2)
    .addScore('chestcavity:endurance', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WardenCoreKeyActive(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    const level = event.level
    let ray = player.rayTrace(24, false)
    let distance = ray.distance
    let damageSource = player.damageSources().sonicBoom(player)
    /**@type {Internal.Vec3d} */
    let vec3Nor = player.getLookAngle().normalize()
    let counter = 0
    let xpLevel = player.getXpLevel()
    if (ray.entity && ray.entity.isLiving()) {
        ray.entity.attack(damageSource, 30 + xpLevel)
        ray.entity.invulnerableTime = 0
        counter++
    }
    if (ray.block) {
        distance = player.getPosition(1.0).distanceTo(ray.block.pos)
    }
    for (let i = 0; i < distance; i++) {
        let vec3 = vec3Nor.scale(i).add(player.getEyePosition())
        level.spawnParticles($ParticleTypes.SONIC_BOOM, false, vec3.x(), vec3.y(), vec3.z(), 0, 0, 0, 1, 0)
        if (i % 2 == 0) {
            let entityInRadius = GetLivingWithinRadius(level, ConvertVec3d2BlockPos(vec3), 2, (curlevel, curEntity) => {
                if (!curEntity.isPlayer()) {
                    return true
                }
            })
            entityInRadius.forEach(entity => {
                counter++
                entity.attack(damageSource, 10 + Math.min(xpLevel * 0.5, 50))
                entity.invulnerableTime = 0 
            })
        }
    }
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.warden.sonic_boom', player.getSoundSource(), 0.5, 1)
    player.addItemCooldown(organItem, Math.max(20 * 60 - counter * 40, 0))
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:warden_core')
        .addOnlyStrategy('key_active', WardenCoreKeyActive)
)