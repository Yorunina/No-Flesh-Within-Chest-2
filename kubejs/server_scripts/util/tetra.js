// priority: 3000

/**
 * 获取投掷物携带的模块物品；其他投射物沿用拥有者主手。
 * @param {Internal.Projectile} projectile
 * @param {Internal.Player} player
 * @returns {Internal.ItemStack}
 */
function GetTetraProjectileItem(projectile, player) {
    if (String(projectile.getType()) == 'tetra:thrown_modular_item') return projectile.getThrownStack()
    return player.getMainHandItem()
}

/**
 * 验证实际碰撞箱所占空间已加载且位于世界范围内。
 * @param {Internal.Level} level
 * @param {Internal.AABB} box
 * @returns {boolean}
 */
function IsTetraTeleportBoxLoaded(level, box) {
    if (box.minY < level.getMinBuildHeight() || box.maxY > level.getMaxBuildHeight()) return false
    let border = level.getWorldBorder()
    if (box.minX < border.getMinX() || box.maxX > border.getMaxX()
        || box.minZ < border.getMinZ() || box.maxZ > border.getMaxZ()) return false
    return level.hasChunksAt(
        new $BlockPos(Math.floor(box.minX), Math.floor(box.minY), Math.floor(box.minZ)),
        new $BlockPos(Math.floor(box.maxX - 0.00001), Math.floor(box.maxY), Math.floor(box.maxZ - 0.00001)))
}

/**
 * 使用实体当前碰撞箱验证候选落点，不触发新区块加载。
 * @param {Internal.LivingEntity} entity
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {boolean} requireSupport 是否必须有脚下支撑
 * @returns {boolean}
 */
function CanTetraTeleportTo(entity, x, y, z, requireSupport) {
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) return false
    let box = entity.getBoundingBox().move(x - entity.x, y - entity.y, z - entity.z)
    let level = entity.level
    if (!IsTetraTeleportBoxLoaded(level, box.inflate(0, 0.05, 0))) return false
    if (!level.noCollision(entity, box)) return false
    return !requireSupport || !level.noCollision(entity, box.move(0, -0.05, 0))
}

/**
 * 优先原高度，其次采用所在列碰撞形状的顶面，兼容半砖等落脚面。
 * @param {Internal.LivingEntity} entity
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {Internal.Vec3|null}
 */
function FindTetraSupportedLanding(entity, x, y, z) {
    if (CanTetraTeleportTo(entity, x, y, z, true)) return new $Vec3(x, y, z)
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) return null
    for (let by = Math.floor(y); by >= Math.floor(y) - 1; by--) {
        let pos = new $BlockPos(Math.floor(x), by, Math.floor(z))
        if (!entity.level.hasChunkAt(pos) || entity.level.isOutsideBuildHeight(pos)) continue
        let shape = entity.level.getBlockState(pos).getCollisionShape(entity.level, pos)
        if (shape.isEmpty()) continue
        let top = by + shape.max($Axis.Y)
        if (CanTetraTeleportTo(entity, x, top, z, true)) return new $Vec3(x, top, z)
    }
    return null
}
