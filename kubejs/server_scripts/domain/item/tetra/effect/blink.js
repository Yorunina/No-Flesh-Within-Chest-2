// priority: 500

let BLINK_RANGE = 3
let BLINK_BOSS_RANGE = 5
let BLINK_MAX_LIFT = 3
let BLINK_MAX_OFFSET = 5

/**
 * 在玩家当前维度的起点和落点生成传送粒子。
 * @param {Internal.Player} player
 * @param {number} fx0
 * @param {number} fy0
 * @param {number} fz0
 * @param {number} tx
 * @param {number} ty
 * @param {number} tz
 */
function BlinkTeleportFx(player, fx0, fy0, fz0, tx, ty, tz) {
    let level = player.level
    level.spawnParticles($ParticleTypes.PORTAL, true, fx0, fy0 + 0.5, fz0, 0.5, 0.6, 0.5, 30, 0.05)
    level.spawnParticles($ParticleTypes.PORTAL, true, tx, ty + 0.5, tz, 0.5, 0.6, 0.5, 30, 0.05)
}

/**
 * @param {Object} customData
 * @param {Internal.ProjectileImpactEvent} event
 */
function BlinkProjectileImpact(customData, event) {
    let projectile = event.projectile
    if (!projectile || projectile.level.isClientSide()) return
    let result = event.rayTraceResult
    if (!result) return

    let owner = projectile.getOwner()
    if (!owner || !owner.isPlayer()) return
    let player = owner
    if (!player.level.equals(projectile.level)) return

    let projectileData = projectile.persistentData
    if (projectileData.getBoolean('kubejs:blink_fired')) return

    let stack = GetTetraProjectileItem(projectile, player)
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item) || item.getEffectLevel(stack, 'kubejs:blink') <= 0) return
    let blinkFx = item.getEffectEfficiency(stack, 'kubejs:blink') >= 1
    projectileData.putBoolean('kubejs:blink_fired', true)

    if (player.isCrouching()) return

    let fromX = player.getX(), fromY = player.getY(), fromZ = player.getZ()

    if (result.type == $HitResultType.ENTITY) {
        let hitEntity = result.getEntity()
        if (hitEntity == player) return
        let ex = hitEntity.getX(), ey = hitEntity.getY(), ez = hitEntity.getZ()
        let flat = new $Vec3(player.getX() - ex, 0, player.getZ() - ez)
        let horiz = flat.dot(flat) > 1e-4 ? flat.normalize() : new $Vec3(1, 0, 0)
        let isBoss = hitEntity.entityType.is(RelicsBossTagKey) || hitEntity.entityType.is(RelicsBossPartTagKey)
        let prefer = isBoss ? BLINK_BOSS_RANGE : BLINK_RANGE
        let DY_ORDER = [0, -1, 1, -2, 2, -3, 3, -4, 4]
        let D_ORDER = []
        for (let d = prefer; d >= 1; d--) D_ORDER.push(d)
        D_ORDER.push(0, prefer + 1, prefer + 2)
        let spot = null
        for (let i = 0; i < DY_ORDER.length && !spot; i++) {
            let dy = DY_ORDER[i]
            for (let j = 0; j < D_ORDER.length; j++) {
                let d = D_ORDER[j]
                if (d * d + dy * dy > BLINK_MAX_OFFSET * BLINK_MAX_OFFSET) continue
                let tx = ex + horiz.x() * d, ty = ey + dy, tz = ez + horiz.z() * d
                let landing = FindTetraSupportedLanding(player, tx, ty, tz)
                if (landing && d * d + (landing.y() - ey) * (landing.y() - ey) <= BLINK_MAX_OFFSET * BLINK_MAX_OFFSET) {
                    spot = [landing.x(), landing.y(), landing.z()]
                    break
                }
            }
        }
        if (spot) {
            player.teleportTo(spot[0], spot[1], spot[2])
            if (blinkFx) BlinkTeleportFx(player, fromX, fromY, fromZ, spot[0], spot[1], spot[2])
        }
    } else if (result.type == $HitResultType.BLOCK) {
        let pos = result.getBlockPos()
        let face = result.getDirection()
        let level = player.level
        if (!level.hasChunkAt(pos.above())) return
        if (face == $Direction.DOWN && !level.getBlockState(pos.above()).isAir()) return
        let tx, ty, tz
        if (face == $Direction.UP || level.getBlockState(pos.above()).isAir()) {
            tx = pos.x + 0.5; ty = pos.y + 1; tz = pos.z + 0.5
        } else {
            let adj = pos.relative(face)
            tx = adj.x + 0.5; ty = adj.y; tz = adj.z + 0.5
        }
        let landing = null
        for (let dy = 0; dy <= BLINK_MAX_LIFT; dy++) {
            if (CanTetraTeleportTo(player, tx, ty + dy, tz, false)) {
                landing = [tx, ty + dy, tz]
                break
            }
        }
        if (!landing) return
        ty = landing[1]
        player.teleportTo(tx, ty, tz)
        if (blinkFx) BlinkTeleportFx(player, fromX, fromY, fromZ, tx, ty, tz)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:blink')
        .addStrategy('projectile_impact', BlinkProjectileImpact, -10)
)
