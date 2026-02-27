// priority: 3000
/**
* 获取某个半径内的实体
* @param {Internal.Level} level
* @param {BlockPos} pos
* @param {Number} radius
* @param {function(Internal.Level, Internal.PathfinderMob):boolean} entityTester
* @returns {Array<Internal.LivingEntity>}
*/
function GetLivingWithinRadius(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x - radius, pos.y - radius, pos.z - radius, pos.x + radius, pos.y + radius, pos.z + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    let entityList = []
    entityAABBList.forEach(entity => {
        if (entity.position() && entity.position().distanceTo(pos) <= radius && entity.isLiving() && entity.isAlive()) {
            if (entityTester(level, entity)) {
                entityList.push(entity)
            }
        }
    })
    return entityList
}

/**
* 获取某个半径内的实体
* @param {Internal.Level} level
* @param {BlockPos} pos
* @param {Number} radius
* @param {function(Internal.Level, Internal.PathfinderMob):boolean} entityTester
* @returns {Array<Internal.LivingEntity>}
*/
function GetEntityWithinRadius(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x - radius, pos.y - radius, pos.z - radius, pos.x + radius, pos.y + radius, pos.z + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    let entityList = []
    entityAABBList.forEach(entity => {
        if (entity.position() && entity.position().distanceTo(pos) <= radius) {
            if (entityTester(level, entity)) {
                entityList.push(entity)
            }
        }
    })
    return entityList
}

/**
 * 生成一个物品实体
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Internal.ItemStack} itemStack 
 * @param {Vec3d} movement
 */
function SpawnItemEntityWithMovement(level, pos, itemStack, movement) {
    let itemEntity = new $ItemEntity(level, pos.getX(), pos.getY(), pos.getZ(), itemStack)
    itemEntity.addDeltaMovement(movement)
    itemEntity.setDefaultPickUpDelay()
    level.addFreshEntity(itemEntity)
}