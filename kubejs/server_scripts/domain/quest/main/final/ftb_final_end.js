// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    if (!AStages.serverHasStage('ftb_final_iteration_100', server)) return
    let ms = 20 / GetDaySpeed()
    if (ms <= 0.1) {
        // 清空所有Astage
        MAAUtils.resetServerTaskProgress(server)
        AStages.removeAllPlayerStages()
        AStages.removeAllStagesFromServer(server)
        SetDaySpeed(1)
        SetNightSpeed(1)
        // 重置所有玩家计数器信息
        ScoreUtil.resetAllPlayerStats(server, global.STAT_FINAL_TIMER)
        // 解锁全维度网络
        MAAUtils.getAllDimNet(server).forEach(dimnet => {
            dimnet.setLocked(false)
        })
        return
    }
    let speed = 20 / (ms - 0.1)
    SetDaySpeed(speed)
    SetNightSpeed(speed)
})


FTBQuestsEvents.customReward('final_end_2', event => {
    const server = event.server
    AStages.getStagesFromServer().forEach(stage => {
        if (stage.startsWith('ftb_final_')) AStages.removeAllStagesFromServer(stage, server)
    })
    SetDaySpeed(1)
    SetNightSpeed(1)
    ScoreUtil.resetAllPlayerStats(server, global.STAT_FINAL_TIMER)
    AStages.addStageToServer('ftb_final_timer_stop', server)
    MAAUtils.getAllDimNet(server).forEach(dimnet => {
        dimnet.setLocked(false)
    })
})

MAAEvents.ftbQuestCheckRepeatable('55DE4F49CDD42FDF', event => {
    if (!AStages.serverHasStage('ftb_final_timer_stop', null)) return
    event.cancel()
})