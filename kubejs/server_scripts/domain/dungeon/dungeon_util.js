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
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @returns 
 */
function GetDungeonAttribute(context) {
    const area = context.area
    const persistentData = area.getPersistentData()
    if (!persistentData.contains('dungeonAttr')) {
        return new DungeonAttributeModel(null)
    }
    return new DungeonAttributeModel(persistentData.get('dungeonAttr'))
}

/**
 * 
 * @param {Internal.Area} area 
 * @returns 
 */
function GetAreaObeliskBlockPos(area) {
    const persistentData = area.getPersistentData()
    if (!persistentData.contains('obeliskBlockPos')) {
        let centerPos = area.getCenter()
        return new BlockPos(centerPos.x(), centerPos.y() - 2, centerPos.z())
    }
    let blockPosNbt = persistentData.get('obeliskBlockPos')
    return ConvertNbt2Pos(blockPosNbt)
}

/**
 * 
 * @param {Internal.PathfinderMob} entity 
 * @param {number} tier 
 * @returns 
 */
function CommonDungeonEntityTierModifier(entity, tier) {
    const attributes = entity.getAttributes()
    if (attributes.hasAttribute('minecraft:generic.max_health')) {
        entity.setAttributeBaseValue('minecraft:generic.max_health', Math.floor(entity.getAttribute('minecraft:generic.max_health').getValue() * Math.pow(1.2, tier)))
        entity.setHealth(entity.getMaxHealth())
    }
    if (attributes.hasAttribute('minecraft:generic.attack_damage')) {
        entity.setAttributeBaseValue('minecraft:generic.attack_damage', Math.floor(entity.getAttribute('minecraft:generic.attack_damage').getValue() * (1 + tier * 0.05)))
    }
    return entity
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {Internal.ItemStack[]} lootList 
 * @param {Boolean} isWin 
 */
function CommonDungeonFinishAction(level, context, lootList, isWin) {
    const area = context.area
    let playerList = GetAreaPlayerList(level, area)
    if (isWin) {
        // let obeliskBlockPos = GetAreaObeliskBlockPos(area)

        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次成功')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.levelup', player.getSoundSource(), 0.5, 1)
        })
    } else {
        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次失败')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.trident.thunder', player.getSoundSource(), 0.5, 1)
        })
    }
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {BlockPos} blockPos 
 * @param {Internal.ItemStack[]} lootList 
 */
function SpawnLootAtLocation(level, blockPos, lootList) {
    /**@type {Internal.ItemStack[][]} */
    let itemChunks = SliceChunkArray(lootList, 3)
    let tickCounter = 5
    itemChunks.forEach(itemChunk => {
        level.server.scheduleInTicks(tickCounter, callback => {
            itemChunk.forEach(item => {
                $Containers.dropItemStack(level, blockPos.x, blockPos.y, blockPos.z, item)
            })
        })
        tickCounter = tickCounter + 10
    })
}

