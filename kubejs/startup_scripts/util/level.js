// priority: 3000
/**
 * 
 * @param {Internal.Level} level 
 * @param {Vec3d} start 
 * @param {number} maxSteps 
 * @returns {number}
 */
function GetGroundLevel(level, start, maxSteps) {
    if (!level.getBlockState(BlockPos.containing(start)).isAir()) {
        for (let i = 0; i < maxSteps; i++) {
            start = start.add(0, 1, 0)
            if (level.getBlockState(BlockPos.containing(start)).isAir()) {
                break
            }
        }
    }
    let lower = level.clip(new $ClipContext(start, start.add(0, maxSteps * -2, 0), 'collider', 'none', null)).getLocation()
    return lower.y()
}