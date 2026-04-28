// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    if (!AStages.serverHasStage(FTBFinalIteration30, server)) return
    let ms = FloorFix(20 / GetDaySpeed(), 3)
    console.log(ms)
    if (ms <= 0.01) {
        console.log('final end')
        // 清空所有Astage和任务进度
        MAAUtils.resetServerTaskProgress(server)
        AStages.removeAllPlayerStages()
        AStages.removeAllStagesFromServer(server)
        // 删除生物生成和时间的影响
        server.persistentData.remove('finalMobSpawnProp')
        SetDaySpeed(1)
        SetNightSpeed(1)
        // 重置所有玩家计数器信息
        ScoreUtil.resetAllPlayerStats(server, global.STAT_FINAL_TIMER)
        // 解锁全维度网络
        MAAUtils.getAllDimNet(server).forEach(dimnet => {
            dimnet.setLocked(false)
        })
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


FTBQuestsEvents.customReward('final_end_2', event => {
    const server = event.server
    AStages.getStagesFromServer().forEach(stage => {
        if (stage.startsWith('ftb_final_')) AStages.removeAllStagesFromServer(stage, server)
    })
    server.persistentData.remove('finalMobSpawnProp')
    SetDaySpeed(1)
    SetNightSpeed(1)
    ScoreUtil.resetAllPlayerStats(server, global.STAT_FINAL_TIMER)
    AStages.addStageToServer(FTBFinalTimerPause, server)
    MAAUtils.getAllDimNet(server).forEach(dimnet => {
        dimnet.setLocked(false)
    })
})

MAAEvents.ftbQuestCheckRepeatable('55DE4F49CDD42FDF', event => {
    if (!AStages.serverHasStage(FTBFinalTimerPause, null)) return
    event.cancel()
})