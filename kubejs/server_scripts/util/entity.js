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
 * 
 * @param {Internal.PathfinderMob} mob 
 * @param {Vec3d} pos 
 * @param {Number} speed 
 * @returns 
 */
function NavigateWithDegradeVec3d(mob, pos, speed) {
    if (!pos) return false
    let navigation = mob.getNavigation()
    if (navigation.isInProgress() && mob.isInFluidType()) {
        mob.jumpControl.jump()
    }
    if (!navigation.isInProgress() || !navigation.targetPos.equals(pos)) {
        navigation.moveTo(pos.x(), pos.y(), pos.z(), speed)
        return true
    }
    return true
}

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
* @param {Vec3d} pos
* @param {Number} radius
* @param {function(Internal.Level, Internal.PathfinderMob):boolean} entityTester
* @returns {Array<Internal.LivingEntity>}
*/
function GetLivingWithinRadiusVec3d(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x() - radius, pos.y() - radius, pos.z() - radius, pos.x() + radius, pos.y() + radius, pos.z() + radius)
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
* 获取某个半径内的被驯服的实体
* @param {Internal.Level} level
* @param {Player} player
* @param {Number} radius
* @returns {Array<Internal.LivingEntity>}
*/
function GetTamedEntityWithinRadius(level, player, radius) {
    let pos = player.blockPosition()
    let area = AABB.of(pos.x - radius, pos.y - radius, pos.z - radius, pos.x + radius, pos.y + radius, pos.z + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    let entityList = []
    entityAABBList.forEach(pEntity => {
        if (pEntity.position() && pEntity.position().distanceTo(pos) <= radius) {
            if (pEntity instanceof $OwnableEntity) {
                if (pEntity.owner && pEntity.owner.is(player)) {
                    entityList.push(pEntity)
                }
                return
            }
            if (pEntity instanceof $AbstractGolem) {
                if (pEntity.getOwner() && pEntity.getOwner().is(player)) {
                    entityList.push(pEntity)
                }
                return
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

/**
* 获取某个半径内的物品实体
* @param {Internal.Level} level
* @param {BlockPos} pos
* @param {Number} radius
* @param {function(Internal.Level, Internal.ItemEntity):boolean} entityTester
* @returns {Array<Internal.ItemEntity>}
*/
function GetItemEntityWithinRadius(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x - radius, pos.y - radius, pos.z - radius, pos.x + radius, pos.y + radius, pos.z + radius)
    let entityList = level.getEntitiesOfClass($ItemEntity, area, entity => {
        if (entity.position() && entity.position().distanceTo(pos) <= radius) {
            if (entityTester(level, entity)) {
                return true
            }
        }
        return false
    })

    return entityList
}

/**
 * 获取最近的实体
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Number} radius 
 * @param {function(Internal.Level, Internal.Entity):boolean} entityTester 
 * @returns {Internal.Entity}
 */
function GetNearestEntity(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x - radius, pos.y - radius, pos.z - radius, pos.x + radius, pos.y + radius, pos.z + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    if (entityAABBList.size() <= 0) return null
    let result = null
    let minDist = Number.MAX_VALUE
    entityAABBList.forEach(entity => {
        if (!entity.position()) return
        if (!entityTester(level, entity)) return
        let dist = entity.position().distanceTo(pos)
        if (dist <= radius && dist < minDist) {
            result = entity
            minDist = dist
        }
    })
    return result
}

/**
 * 获取最近的实体
 * @param {Internal.Level} level 
 * @param {Vec3d} pos 
 * @param {Number} radius 
 * @param {function(Internal.Level, Internal.Entity):boolean} entityTester 
 * @returns {Internal.Entity}
 */
function GetNearestEntityVec3d(level, pos, radius, entityTester) {
    let area = AABB.of(pos.x() - radius, pos.y() - radius, pos.z() - radius, pos.x() + radius, pos.y() + radius, pos.z() + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    if (entityAABBList.size() <= 0) return null
    let result = null
    let minDist = Number.MAX_VALUE
    entityAABBList.forEach(entity => {
        if (!entity.position()) return
        if (!entityTester(level, entity)) return
        let dist = entity.position().distanceTo(pos)
        if (dist <= radius && dist < minDist) {
            result = entity
            minDist = dist
        }
    })
    return result
}

/**
 * @param {Internal.Level} level 
 * @param {Internal.LivingEntity} entity
 * @param {Internal.ItemStack[]} itemList 
 */
function PopItemFromAirdrop(level, entity, itemList) {
    /**@type {Internal.ItemStack[][]} */
    let itemChunks = SliceChunkArray(itemList, 10)
    let tickCounter = 5
    itemChunks.forEach(itemChunk => {
        level.server.scheduleInTicks(tickCounter, callback => {
            itemChunk.forEach(item => {
                entity.block.popItem(item)
            })
        })
        tickCounter = tickCounter + 10
    })
}



/**
 * 获取最近的玩家
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {Number} radius 
 * @returns {Internal.ServerPlayer}
 */
function GetNearestPlayer(level, pos, radius) {
    return level.getNearestPlayer(pos.getX(), pos.getY(), pos.getZ(), radius, false)
}

/**
 * 
 * @param {Internal.GoalSelector} goalSelector 
 * @param {String} goalName 
 */
function RemoveCustomGoalByName(goalSelector, goalName) {
    goalSelector.getAvailableGoals().forEach(wrappedGoal => {
        let pGoal = wrappedGoal.goal
        if (!(pGoal instanceof $CustomGoal)) return
        if (pGoal.name != goalName) return
        goalSelector.removeGoal(pGoal)
    })
}

/**
 * 校验椅子是否被坐
 * @param {Internal.BlockContainerJS} chairBlock 
 * @param {Internal.Level} level 
 * @returns {boolean}
 */
function IsAnyOnChair(chairBlock) {
    const chairPos = chairBlock.pos
    let seats = chairBlock.level.getEntitiesOfClass($Seat, new AABB.of(chairPos.getX(), chairPos.getY(), chairPos.getZ(), chairPos.getX() + 1.0, chairPos.getY() + 1.0, chairPos.getZ() + 1.0))
    return !seats.isEmpty()
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.PathfinderMob} mob 
 * @param {BlockPos} pos 
 * @param {number} seatHeight
 * @param {Internal.Direction} direction
 * @param {boolean} lock
 * @returns {boolean}
 */
function SitOnChair(mob, pos, seatHeight, direction, lock) {
    let level = mob.level
    if (level.getEntitiesOfClass($Seat, new AABB.of(pos.getX(), pos.getY(), pos.getZ(), pos.getX() + 1.0, pos.getY() + 1.0, pos.getZ() + 1.0)).isEmpty()) {
        // let seatYaw = direction.getYaw()
        let seat = new $Seat(level)
        seat.setPos(Vec3d.atBottomCenterOf(pos).add(0, seatHeight, 0))
        // seat.setRotation(seatYaw, 0)
        // $Seat.LOCK_YAW.setValue(seat, lock)
        level.addFreshEntity(seat)
        return mob.startRiding(seat)
    }
    return false
}