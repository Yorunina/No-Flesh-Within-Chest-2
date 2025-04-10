// priority: 3000
/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {Internal.PathfinderMob} entity 
 * @returns {boolean}
 */
function DungeonCreateEntity(level, context, entity) {
    const area = context.area
    let spawnPosOpt = area.findSpawnPos(level, 'spawnZone', entity)
    let spawnPos = BlockPos.ZERO
    if (!spawnPosOpt.isPresent()) {
        let center = area.getCenter()
        spawnPos = new BlockPos(center.x(), center.y(), center.z())
    } else {
        spawnPos = spawnPosOpt.get()
    }
    entity.getPersistentData().putUUID('relatedArea', area.getUuid())
    entity.setPos(spawnPos.getX(), spawnPos.getY(), spawnPos.getZ())
    entity.setPersistenceRequired()
    entity.loquat$setRestriction(context)
    entity.spawn()
    return true
}

/**
 * 
 * @param {Internal.Level} level
 * @param {Internal.Area} area 
 */
function EntityInArea(level, area) {
    let aabb = area.getRoughAABB()
    return level.getEntitiesWithin(aabb)
}


/**
 * 删除掉区域生成的生物（遗留生物）
 * @param {Internal.Level} level
 * @param {Internal.Area} area 
 */
function ClearEntityRemainInArea(level, area) {
    let entityAABBList = EntityInArea(level, area)
    let areaUuid = area.getUuid()
    entityAABBList.forEach(entity => {
        // 清空AABB里面可能的生物残留
        if (entity.getPersistentData().contains('relatedArea') && entity.getPersistentData().getUUID('relatedArea').equals(areaUuid)) {
            entity.remove('discarded')
            return
        }
    })
}


/**
 * 设置当前波次的状态
 * @param {Internal.Map<string, any>} customDataMap 
 * @param {number} status 
 */
function SetWaveStatus(customDataMap, status) {
    customDataMap.put('waveStatus', status)
    return
}

/**
 * 获取当前波次的状态
 * @param {Internal.Map<string, any>} customDataMap
 * @returns {number}
 */
function GetWaveStatus(customDataMap) {
    return customDataMap.getOrDefault('waveStatus', 0)
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.Area} area 
 * @returns {Internal.ServerPlayer[]}
 */
function GetAreaPlayerList(level, area) {
    let playerList = []
    let aabb = area.getRoughAABB()
    let entityAABBList = level.getEntitiesWithin(aabb)
    entityAABBList.forEach(entity => {
        if (entity.isPlayer() && entity instanceof $ServerPlayer) {
            playerList.push(entity)
            return
        }
    })
    return playerList
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.Area} area
 * @param {number} state 
 * @returns 
 */
function SetDungeonObeliskState(level, area, state) {
    const persistentData = area.getPersistentData()
    if (!persistentData.contains('obeliskBlockPos')) {
        return
    }
    let blockPosNbt = persistentData.get('obeliskBlockPos')
    let blockPos = ConvertNbt2Pos(blockPosNbt)
    let blockState = level.getBlockState(blockPos)
    let upperBlockState = level.getBlockState(blockPos.above())
    if (!blockState.hasProperty(BlockProperties.DOUBLE_BLOCK_HALF) || !upperBlockState.hasProperty(BlockProperties.DOUBLE_BLOCK_HALF)) return
    level.setBlockAndUpdate(blockPos, blockState.setValue(OBELISK_STATE, Int2Integer(state)))
    level.setBlockAndUpdate(blockPos.above(), upperBlockState.setValue(OBELISK_STATE, Int2Integer(state)))
}

/**
 * 
 * @param {Internal.Area} area 
 * @returns 
 */
function GetAreaDifficulty(area) {
    const persistentData = area.getPersistentData()
    if (!persistentData.contains('difficulty')) {
        return 0
    }
    return persistentData.getInt('difficulty')
}

/**
 * 
 * @param {Internal.PathfinderMob} entity 
 * @param {number} difficulty 
 * @returns 
 */
function CommonDungeonEntityDifficultyModifier(entity, difficulty) {
    const attributes = entity.getAttributes()
    if (attributes.hasAttribute('minecraft:generic.max_health')) {
        entity.setAttributeBaseValue('minecraft:generic.max_health', entity.getAttribute('minecraft:generic.max_health').getValue() * (1 + difficulty * 0.2))
        entity.setHealth(entity.getMaxHealth())
    }
    if (attributes.hasAttribute('minecraft:generic.attack_damage')) {
        entity.setAttributeBaseValue('minecraft:generic.attack_damage', entity.getAttribute('minecraft:generic.attack_damage').getValue() * (1 + difficulty * 0.05))
    }
    return entity
}