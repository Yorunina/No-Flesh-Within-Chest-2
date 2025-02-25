// priority: 3000
/**
 * @callback isValidTarget
 * @param {Internal.BlockContainerJS}
 * @returns {Boolean}
 */
/**
 * 在某个范围内寻找符合条件的方块
 * @param {Internal.PathfinderMob} mob 
 * @param {number} searchRange 
 * @param {number} verticalSearchRange 
 * @param {number} verticalOffset 
 * @param {isValidTarget} isValidTarget
 * @returns {Internal.BlockContainerJS[]}
 */
function FindNearBlocks(mob, searchRange, verticalSearchRange, verticalOffset, isValidTarget) {
    let blockPos = mob.blockPosition().offset(0, verticalOffset, 0);
    let mutableBlockPos = BlockPos.ZERO.mutable()
    let resBlockList = []

    // Y遍历
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        for (let l = 0; l <= searchRange; ++l) {
            for (let i = 0; i <= l; i = i > 0 ? -i : 1 - i) {
                for (let j = i < l && i > -l ? l : 0; j <= l; j = j > 0 ? -j : 1 - j) {
                    mutableBlockPos.setWithOffset(blockPos, i, k, j)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        resBlockList.push(curBlock)
                    }
                }
            }
        }
    }
    return resBlockList
}


/**
 * 在前进范围内寻找符合条件的方块
 * @param {Internal.PathfinderMob} mob 
 * @param {number} searchRange 
 * @param {number} secondaryRange
 * @param {number} verticalSearchRange 
 * @param {number} verticalOffset 
 * @param {isValidTarget} isValidTarget
 * @returns {Internal.BlockContainerJS[]}
 */
function FindDirectionNearBlocks(mob, searchRange, secondaryRange, verticalSearchRange, verticalOffset, isValidTarget) {
    let blockPos = mob.blockPosition().offset(0, verticalOffset, 0);
    let mutableBlockPos = BlockPos.ZERO.mutable()
    let resBlockList = []

    // 粗略朝向方向
    let facing = mob.getHorizontalFacing()
    let dz = facing.getZ()
    let dx = facing.getX()
    // 遍历范围内的每个方块
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        if (dz == 0 && dx != 0) {
            // 如果Z方向为无关方向，那么X方向就是一个关键方向
            // 关键方向是优先级更高的方向
            for (let i = 0; i <= searchRange; i++) {
                // 次级范围，在寻找对应方向的方块时，对于非关键方向的视线有限
                for (let j = 0; j <= secondaryRange; j = j > 0 ? -j : 1 - j) {
                    mutableBlockPos.setWithOffset(blockPos, i * dx, k, j)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        resBlockList.push(curBlock)
                    }
                }
            }
        } else if (dz != 0 && dx == 0) {
            // 如果X方向为无关方向，那么Z方向就是一个关键方向
            for (let j = 0; j <= searchRange; j++) {
                for (let i = 0; i <= secondaryRange; i = i > 0 ? -i : 1 - i) {
                    mutableBlockPos.setWithOffset(blockPos, i, k, j * dz)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        resBlockList.push(curBlock)
                    }
                }
            }
        }
    }
    return resBlockList
}




/**
 * 在某个范围内寻找最近符合条件的方块
 * @param {Internal.PathfinderMob} mob 
 * @param {number} searchRange 
 * @param {number} verticalSearchRange 
 * @param {number} verticalOffset 
 * @param {isValidTarget} isValidTarget
 * @returns {Internal.BlockContainerJS}
 */
function FindNearestBlock(mob, searchRange, verticalSearchRange, verticalOffset, isValidTarget) {
    let blockPos = mob.blockPosition().offset(0, verticalOffset, 0);
    let mutableBlockPos = BlockPos.ZERO.mutable()

    // Y遍历
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        for (let l = 0; l <= searchRange; ++l) {
            for (let i = 0; i <= l; i = i > 0 ? -i : 1 - i) {
                for (let j = i < l && i > -l ? l : 0; j <= l; j = j > 0 ? -j : 1 - j) {
                    mutableBlockPos.setWithOffset(blockPos, i, k, j)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        return curBlock
                    }
                }
            }
        }
    }
    return null
}


/**
 * 在前进范围内寻找最近符合条件的方块
 * @param {Internal.PathfinderMob} mob 
 * @param {number} searchRange 
 * @param {number} verticalSearchRange 
 * @param {number} verticalOffset 
 * @param {isValidTarget} isValidTarget
 * @returns {Internal.BlockContainerJS}
 */
function FindDirectionNearestBlock(mob, searchRange, verticalSearchRange, verticalOffset, isValidTarget) {
    let blockPos = mob.blockPosition().offset(0, verticalOffset, 0);
    let mutableBlockPos = BlockPos.ZERO.mutable()

    // 粗略朝向方向
    let facing = mob.getHorizontalFacing()
    let dz = facing.getZ()
    let dx = facing.getX()

    // 遍历范围内的每个方块
    for (let k = 0; k <= verticalSearchRange; k = k > 0 ? -k : 1 - k) {
        // X-Z遍历
        if (dz == 0 && dx != 0) {
            // 如果Z方向为无关方向，那么X方向就是一个关键方向
            // 关键方向是优先级更高的方向
            for (let i = 0; i <= searchRange; i++) {
                for (let j = 0; j <= searchRange; j = j > 0 ? -j : 1 - j) {
                    mutableBlockPos.setWithOffset(blockPos, i * dx, k, j)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        return curBlock
                    }
                }
            }
        } else if (dz != 0 && dx == 0) {
            // 如果X方向为无关方向，那么Z方向就是一个关键方向
            for (let j = 0; j <= searchRange; j++) {
                for (let i = 0; i <= searchRange; i = i > 0 ? -i : 1 - i) {
                    mutableBlockPos.setWithOffset(blockPos, i, k, j * dz)
                    let curBlock = mob.level.getBlock(mutableBlockPos.x, mutableBlockPos.y, mutableBlockPos.z)
                    if (mob.isWithinRestriction(mutableBlockPos) && isValidTarget(curBlock)) {
                        return curBlock
                    }
                }
            }
        }
    }
    return null
}

/**
 * 获取生物状态
 * @param {Internal.PathfinderMob} mob 
 * @returns 
 */
function GetEntityStatus(mob) {
    if (mob.persistentData.contains('status')) {
        return mob.persistentData.getString('status')
    }
    return STATUS_NONE
}

/**
 * 设置生物状态，如果状态没有变更，则不进行设置（这影响到旧状态列表的维护）
 * @param {Internal.PathfinderMob} mob 
 * @param {string} status
 */
function SetEntityStatus(mob, status) {
    mob.persistentData.putString('status', status)
    return
}

/**
 * 获取生物Position，并且输出对应的BlockPos
 * @param {Internal.PathfinderMob} mob 
 * @param {BlockPos} status
 */
function GetEntityPosition(mob) {
    let pos = mob.getPosition(1.0)
    return new BlockPos(pos.x(), pos.y(), pos.z())
}


/**
 * 
 * @param {Internal.PathfinderMob} mob 
 * @param {BlockPos} pos 
 * @param {Number} speed 
 * @returns 
 */
function NavigateWithDegrade(mob, pos, speed) {
    if (!pos) return false
    let navigation = mob.getNavigation()
    if (navigation.isInProgress() && mob.isInFluidType()) {
        mob.jumpControl.jump()
    }
    if (!navigation.isInProgress() || !navigation.targetPos.equals(pos)) {
        navigation.moveTo(pos.x, pos.y, pos.z, speed)
        return true
    }
    return true
}

/**
* 获取某个半径内的实体
* @param {Internal.Level} level
* @param {Vec3} pos
* @param {Number} radius
* @param {function(Internal.Level, Internal.PathfinderMob):boolean} entityTester
* @returns {Array<Internal.Entity>}
*/
function GetLivingWithinRadius(level, pos, radius, entityTester) {
    let area = new AABB.of(pos.x() - radius, pos.y() - radius, pos.z() - radius, pos.x() + radius, pos.y() + radius, pos.z() + radius)
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