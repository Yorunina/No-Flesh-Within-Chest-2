// priority: 1000
const SEEKING_TARGET_ID = 'kubejs_seeking_target_id'
const SEEKING_MAX_DISTANCE = 'kubejs_seeking_max_distance'
const SEEKING_SPEED_FACTOR = 'kubejs_seeking_speed_factor'


/**
 * @param {Internal.AbstractArrow} arrow 
 * @returns 
 */
function SeekingArrowTick(arrow) {
    const level = arrow.level
    if (level.isClientSide()) return
    if (arrow.inGround) return

    let targetId = arrow.persistentData.getInt(SEEKING_TARGET_ID)
    let configuredMaxTrackDistance = arrow.persistentData.getFloat(SEEKING_MAX_DISTANCE)
    let maxTrackDistance = configuredMaxTrackDistance > 0.0 ? configuredMaxTrackDistance : 10.0
    let configuredSpeedFactor = arrow.persistentData.getFloat(SEEKING_SPEED_FACTOR)
    let speedFactor = configuredSpeedFactor > 0.0 ? configuredSpeedFactor : 1.0
    let owner = arrow.getOwner()

    if (targetId <= 0) {
        let boxExpandBy = Math.min(maxTrackDistance, 3 + arrow.age * 0.5)
        let candidates = level.getEntitiesOfClass($LivingEntity, arrow.getBoundingBox().inflate(boxExpandBy))
        /**@type {Internal.Entity} */
        let closest = null
        let closestDistance = Number.MAX_VALUE

        candidates.forEach(candidate => {
            if (candidate == arrow || !candidate.isAlive()) return
            if (owner != null && (candidate == owner || ISSDamageSources.isFriendlyFireBetween(candidate, owner))) return

            let distance = candidate.position().distanceTo(arrow.position())
            if (distance < closestDistance) {
                closest = candidate
                closestDistance = distance
            }
        })

        if (closest != null) {
            targetId = closest.getId()
            arrow.persistentData.putInt(SEEKING_TARGET_ID, targetId)
        }
    }

    let target = MAAUtils.getEntityById(level, targetId)
    if (target == null || !target.isAlive()) {
        arrow.persistentData.putInt(SEEKING_TARGET_ID, -1)
        return
    }

    let arcVec = target.position().add(0, 0.65 * target.getBbHeight(), 0).subtract(arrow.position())
    if (arcVec.length() > target.getBbWidth()) arrow.setDeltaMovement(arrow.getDeltaMovement().scale(0.3).add(arcVec.normalize().scale(0.7 * speedFactor)))
}

StartupEvents.registry('entity_type', event => {
    event.create('seeking_arrow', 'entityjs:arrow')
        .tick(SeekingArrowTick)
        .noItem()
        .setBaseDamage(0)
        .sized(0.5, 0.5)
        .mobCategory('misc')
        .clientTrackingRange(5)
        .updateInterval(1)
        .setCanShootFromDispenser(false)
        .fullBright(true)
        .textureLocation(() => 'kubejs:textures/entity/seeking_arrow.png')
})
