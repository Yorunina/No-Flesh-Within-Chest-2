// priority: 3000
ServerEvents.loaded(event => {
    const server = event.server
    $OpticManager.CONFIG.nightDuration = GetNightDuration(server)
    $OpticManager.CONFIG.dayDuration = GetDayDuration(server)
})


/**
 * 设置晚上时长
 * @param {Internal.MinecraftServer} server
 * @param {number} duration 
 */
function SetNightDuration(server, duration) {
    $OpticManager.CONFIG.nightDuration = duration
    server.persistentData.putInt('nightDuration', duration)
}

/**
 * 获取晚上时长
 * @param {Internal.MinecraftServer} server
 * @returns {number}
 */
function GetNightDuration(server) {
    let nightDuration = server.persistentData.getInt('nightDuration')
    return nightDuration != 0 ? nightDuration : $OpticManager.CONFIG.nightDuration
}

/**
 * 设置白天时长
 * @param {Internal.MinecraftServer} server
 * @param {number} duration 
 */
function SetDayDuration(server, duration) {
    $OpticManager.CONFIG.dayDuration = duration
    server.persistentData.putInt('dayDuration', duration)
}

/**
 * 获取白天时长
 * @param {Internal.MinecraftServer} server
 * @returns {number}
 */
function GetDayDuration(server) {
    let dayDuration = server.persistentData.getInt('dayDuration')
    return dayDuration != 0 ? dayDuration : $OpticManager.CONFIG.dayDuration
}


/**
 * 获取chunkPos对应的所有结构资源键
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ChunkPos} chunkPos 
 * @returns {Internal.ResourceKey[]}
 */
function GetChunkStructureResourceKeys(level, chunkPos) {
    let result = []
    let structList = level.structureManager().startsForStructure(chunkPos, _ => true)
    structList.forEach(pStruct => {
        let key = $ResourceKey.create($Registries.STRUCTURE, level.registryAccess().registryOrThrow($Registries.STRUCTURE).getKey(pStruct.getStructure()))
        result.push(key)
    })
    return result
}