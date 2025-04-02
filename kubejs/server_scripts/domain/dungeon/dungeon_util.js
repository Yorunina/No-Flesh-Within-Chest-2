// priority: 3000
/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {Internal.Entity} entity 
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