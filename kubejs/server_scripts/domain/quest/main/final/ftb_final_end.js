// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    if (!AStages.serverHasStage(FTBFinalIteration30, server)) return
    // 多少分钟一天
    let ms = FloorFix(20 / GetDaySpeed(), 3)
    if (ms <= 0.01) {
        // 清空所有Astage和任务进度
        MAAUtils.resetServerTaskProgress(server)
        AStages.removeAllPlayerStages()
        AStages.removeAllStagesFromServer(server)
        ResetAllExceptStagesAndTask(server)
        return
    } else if (ms <= 1) {
        let speed = 20 / (ms - 0.005)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    } else if (ms <= 2) {
        let speed = 20 / (ms - 0.01)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    } else {
        let speed = 20 / (ms - 0.1)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    }
})

MAAEvents.ftbQuestCheckRepeatable('55DE4F49CDD42FDF', event => {
    if (!AStages.serverHasStage(FTBFinalTimerPause, null)) return
    const teamData = event.teamData
    MAAUtils.sendClientRepeatTaskCompleted(teamData, '55DE4F49CDD42FDF')
    MAAUtils.sendClientRepeatTaskClaimed(teamData, event.playerUUID, '49EB885120B0534D')
    event.cancel()
})

/**
 * 
 * @param {Internal.MinecraftServer} server 
 */
function ResetAllExceptStagesAndTask(server) {
    // 删除生物生成的影响
    server.persistentData.remove('finalMobSpawnProp')
    // 重置时间
    SetDaySpeed(1)
    SetNightSpeed(1)
    // 重置所有玩家计数器信息
    ScoreUtil.resetAllPlayerStats(server, global.STAT_FINAL_TIMER)
    // 解锁全维度网络
    MAAUtils.getAllDimNet(server).forEach(dimnet => {
        dimnet.setLocked(false)
    })
}