// priority: 1000

/** @param {Internal.ContextUtils$NLRenderContext} context */
function MagicArrowRender(context) {
    const motion = context.entity.getDeltaMovement()
    const pitch = 90 - Math.atan2(motion.horizontalDistance(), motion.z()) * 180 / Math.PI
    const yaw = -90 - Math.atan2(motion.y(), motion.x()) * 180 / Math.PI
    const pose = context.poseStack
    pose.pushPose()
    try {
        pose.mulPose($Axis.YP.rotationDegrees(yaw))
        pose.mulPose($Axis.XP.rotationDegrees(pitch))
        $ISSMagicArrowRenderer.renderModel(pose, context.bufferSource)
    } finally {
        pose.popPose()
    }
}

/** @param {Internal.AbstractArrow} arrow */
function MagicArrowAdded(arrow) {
    if (arrow.level.isClientSide()) return

    arrow.setNoGravity(true)
    arrow.setCritArrow(false)
    arrow.setSilent(true)
    // Tetra has finished applying bow and enchantment damage when the arrow is added.
    let data = arrow.persistentData
    let effectLevel = data.getInt('kubejs_magic_shot_level')
    if (effectLevel > 0) {
        arrow.setBaseDamage(arrow.getBaseDamage() * effectLevel / 10)
        data.remove('kubejs_magic_shot_level')
    }
}

/** @param {Internal.AbstractArrow} arrow */
function MagicArrowTick(arrow) {
    if (arrow.level.isClientSide()) {
        MagicArrowTrail(arrow)
        return
    }

    let data = arrow.persistentData
    let ticks = data.getInt('kubejs_magic_arrow_flight_ticks') + 1
    if (ticks >= 300) {
        arrow.discard()
        return
    }
    data.putInt('kubejs_magic_arrow_flight_ticks', ticks)
}

/** @param {Internal.AbstractArrow} arrow */
function MagicArrowTrail(arrow) {
    if (arrow.isRemoved()) return

    const motion = arrow.getDeltaMovement()
    const speed = motion.length()
    if (speed < 0.05) return

    const level = arrow.level
    const x = arrow.x
    const y = arrow.y
    const z = arrow.z
    const dx = motion.x()
    const dy = motion.y()
    const dz = motion.z()
    const particle = $ISSParticleRegistry.UNSTABLE_ENDER_PARTICLE.get()
    const count = Math.min(20, Math.round(speed) * 2) + 1
    for (let i = 0; i < count; i++) {
        let back = (i + 0.5) / count
        let ox = (Math.random() - 0.5) * 0.05
        let oy = (Math.random() - 0.5) * 0.05
        let oz = (Math.random() - 0.5) * 0.05
        level.addParticle(particle, x - dx * back + ox, y - dy * back + oy, z - dz * back + oz, ox, oy, oz)
    }
}

/** @param {Internal.ContextUtils$ArrowEntityHitContext} context */
function MagicArrowHitEntity(context) {
    const arrow = context.entity
    const level = arrow.level
    if (level.isClientSide()) return

    const bounds = context.result.getEntity().getBoundingBox()
    const start = arrow.position()
    const end = start.add(arrow.getDeltaMovement())
    const hit = bounds.inflate(0.3).clip(start, end).orElse(bounds.getCenter())
    const x = hit.x()
    const y = hit.y()
    const z = hit.z()
    level.spawnParticles($ISSParticleRegistry.UNSTABLE_ENDER_PARTICLE.get(), false, x, y, z, 0.1, 0.1, 0.1, 10, 0.4)
    level.playSound(null, x, y, z, $ISSSoundRegistry.FORCE_IMPACT.get(), $SoundSource.NEUTRAL, 2, 0.9 + Math.random() * 0.2)
}

StartupEvents.registry('entity_type', event => {
    event.create('magic_arrow', 'entityjs:arrow')
        .canPassThroughBlocks(true)
        .setCanShootFromDispenser(false)
        .setBaseDamage(0)
        .tryPickup(() => false)
        // EntityJS draws its base arrow after the custom model.
        .textureLocation(() => 'kubejs:textures/entity/empty_arrow.png')
        .render(MagicArrowRender)
        .onAddedToWorld(MagicArrowAdded)
        .tick(MagicArrowTick)
        .onHitEntity(MagicArrowHitEntity)
        .noItem()
        .sized(0.5, 0.5)
        .mobCategory('misc')
        .clientTrackingRange(5)
        .updateInterval(1)
})
