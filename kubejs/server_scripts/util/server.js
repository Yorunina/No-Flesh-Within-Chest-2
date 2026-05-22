// priority: 3000
/**
 * 
 * @param {Internal.MinecraftServer} server 
 * @param {number} state 0为未开始，1为开始，2为经历过
 */
function SetEternalWinterState(server, state) {
    server.persistentData.putInt('isEternalWinter', state)
    if (state == 1) {
        MAAUtils.setEternalWinterEnabled(server, true)
        AStages.addStageToServer('ftb_under_eternal_winter', server)
    } else if (state == 2) {
        MAAUtils.setEternalWinterEnabled(server, false)
        AStages.removeStageFromServer('ftb_under_eternal_winter', server)
        AStages.addStageToServer('ftb_after_eternal_winter', server)
    } else {
        MAAUtils.setEternalWinterEnabled(server, false)
        AStages.removeStageFromServer('ftb_under_eternal_winter', server)
        AStages.removeStageFromServer('ftb_after_eternal_winter', server)
    }
}

/**
 * 
 * @param {Internal.MinecraftServer} server 
 */
function HadUnderEternalWinter(server) {
    return server.persistentData.getInt('isEternalWinter') > 0
}

/**
 * @param {Internal.MinecraftServer} server 
 * @param {number} num 
 */
function IncreaseEternalWinterCounter(server, num) {
    const persistentData = server.persistentData
    let counter = persistentData.getInt('eternalWinterCounter') + num
    persistentData.putInt('eternalWinterCounter', counter)
    if (counter >= 100 && server.persistentData.getInt('isEternalWinter') == 0) {
        SetEternalWinterState(server, 1)
    }
}

/**
 * @param {ResourceLocation} id
 * @param {Internal.Minecraft} server 
 * @returns 
 */
function GetLeaderBoardTotal(id, server) {
    let leaderboard = GetLeaderBoardById(id)
    if (leaderboard == null) return 0
    return ServerAchieveStatTask.getServerTotalFromCache(server, leaderboard)
}

/**
 * @param {ResourceLocation} id
 * @returns 
 */
function GetLeaderBoardById(id) {
    return LeaderboardRegistry.LEADERBOARDS.containsKey(id) ? LeaderboardRegistry.LEADERBOARDS.get(id) : VanillaStatsRegistry.VANILLA_STATS.get(id)
}

/**
 * @param {ResourceLocation} id
 * @param {Internal.Minecraft} server 
 * @returns 
 */
function RefreshServerTotalCache(id, server) {
    let leaderboard = GetLeaderBoardById(id)
    if (leaderboard == null) return 0
    ServerAchieveStatTask.refreshServerTotalCache(server, leaderboard)
}