// priority: 1000
const AOE_DONE = 'kubejs_aoe_done'
const AOE_SIZE = 'kubejs_aoe_size'
const AOE_DAMAGE_FACTOR = 'kubejs_aoe_damage_factor'

/**
 * @param {Internal.ContextUtils$ArrowBlockHitContext} context 
 * @returns 
 */
function AoeArrowHitBlock(context) {
    const arrow = context.entity
    const level = arrow.level
    if (level.isClientSide() || arrow.persistentData.getBoolean(AOE_DONE)) return

    const owner = arrow.getOwner()
    if (!(owner instanceof $LivingEntity)) return

    const aoeSize = Math.max(0.0, arrow.persistentData.getFloat(AOE_SIZE))
    const damageFactor = arrow.persistentData.getFloat(AOE_DAMAGE_FACTOR)
    const x = arrow.getX()
    const y = arrow.getY()
    const z = arrow.getZ()
    const area = new $AABB(x - aoeSize, y - aoeSize, z - aoeSize, x + aoeSize, y + aoeSize, z + aoeSize)

    level.spawnParticles($ParticleTypes.EXPLOSION, true, x, y, z, 1, 0, 0, 0, 0)

    const damage = owner.getAttributeValue($Attributes.ATTACK_DAMAGE) * damageFactor
    level.getEntitiesOfClass($LivingEntity, area).forEach(target => {
        if (target == owner || !target.isAlive()) return
        target.attack(level.damageSources().mobAttack(owner), damage)
    })

    arrow.persistentData.putBoolean(AOE_DONE, true)
}


/**
 * @param {Internal.AbstractArrow} arrow 
 * @returns 
 */
function AoeArrowClientParticles(arrow) {
    const level = arrow.level
    if (!level.isClientSide() || arrow.inGround) return
    if (arrow.getDeltaMovement().lengthSqr() <= EPSILON) return

    const center = arrow.position().add(arrow.getDeltaMovement())
    const velocity = new Vec3d(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    level.addParticle($ParticleTypes.LAVA, center.x(), center.y(), center.z(), velocity.x(), velocity.y(), velocity.z())
}

StartupEvents.registry('entity_type', event => {
    event.create('aoe_arrow', 'entityjs:arrow')
        .onHitBlock(AoeArrowHitBlock)
        .tick(AoeArrowClientParticles)
        .noItem()
        .setBaseDamage(0)
        .sized(0.5, 0.5)
        .mobCategory('misc')
        .clientTrackingRange(5)
        .updateInterval(1)
        .setCanShootFromDispenser(false)
        .fullBright(true)
        .textureLocation(() => 'kubejs:textures/entity/aoe_arrow.png')
})