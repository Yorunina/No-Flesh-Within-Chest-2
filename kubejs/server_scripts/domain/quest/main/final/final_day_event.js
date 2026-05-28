// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    if (!AStages.serverHasStage(FTBFinalTimerStart, server)) return
    if (AStages.serverHasStage(FTBFinalTimerPause, server)) return
    if (AStages.serverHasStage(FTBFinalIteration30, server)) return
    const level = server.getOverworld()
    const dayTime = level.getDayTime()
    let dayCount = Math.floor(dayTime / 24000)
    const persistentData = server.persistentData
    if (!persistentData.contains('dayCount')) return persistentData.putInt('dayCount', dayCount)
        
    let lastDayCount = persistentData.getInt('dayCount')
    if (lastDayCount == dayCount) return
    persistentData.putInt('dayCount', dayCount)
    FinalDayEvent(event)
})

/**
 * @param {Internal.ServerEventJS} event 
 */
function FinalDayEvent(event) {
    const server = event.server
    // 阻止正常状态的影响和终局展示效果的影响
    server.playerList.getPlayers().forEach(player => {
        player.getStats().add(global.STAT_FINAL_TIMER, 1)
        MAAUtils.onKubeTaskFinish('final_day_counter', player, (pTask, pPlayer, pTeamData) => {
            pTeamData.addProgress(pTask, 1)
        })
    })
    RefreshServerTotalCache(global.STAT_FINAL_TIMER, server)
    let finalTimer = Clamp(GetLeaderBoardTotal(global.STAT_FINAL_TIMER, server), 0, 30)
    // 终局阶段控制
    if (finalTimer >= 30 && !AStages.serverHasStage(FTBFinalIteration30, server)) {
        AStages.addStageToServer(FTBFinalIteration30, server)
    }
    if (finalTimer >= 25 && !AStages.serverHasStage(FTBFinalIteration25, server)) {
        AStages.addStageToServer(FTBFinalIteration25, server)
        AStages.addStageToServer(FTBFinalDimRestrict3, server)
        AStages.removeStageFromServer(FTBFinalDimRestrict2, server)
    }
    if (finalTimer >= 15 && !AStages.serverHasStage(FTBFinalIteration15, server)) {
        AStages.addStageToServer(FTBFinalIteration15, server)
    }
    if (finalTimer >= 10 && !AStages.serverHasStage(FTBFinalIteration10, server)) {
        AStages.addStageToServer(FTBFinalIteration10, server)
        AStages.addStageToServer(FTBFinalDimRestrict2, server)
        AStages.removeStageFromServer(FTBFinalDimRestrict1, server)
        // 全局锁定维度网络
        MAAUtils.getAllDimNet(server).forEach(dimnet => {
            dimnet.setLocked(true)
        })
    }
    if (finalTimer >= 5 && !AStages.serverHasStage(FTBFinalIteration5, server)) {
        AStages.addStageToServer(FTBFinalIteration5, server)
        AStages.addStageToServer(FTBFinalDimRestrict1, server)
    }
    if (finalTimer >= 1 && !AStages.serverHasStage(FTBFinalIteration1, server)) {
        AStages.addStageToServer(FTBFinalIteration1, server)
    }

    if (AStages.serverHasStage(FTBFinalIteration15, server)) {
        let speedProp = Clamp(1 + 0.2 * (finalTimer - 15), 1, 400)
        SetDaySpeed(speedProp)
        SetNightSpeed(speedProp)
    }

    // 终局生物生成属性控制
    if (!server.persistentData.contains('finalMobSpawnProp')) {
        server.persistentData.put('finalMobSpawnProp', new $CompoundTag())
    }
    if (AStages.serverHasStage(FTBFinalIteration10, server)) {
        let mobModifier = server.persistentData.get('finalMobSpawnProp')
        mobModifier.putFloat('healthMult', mobModifier.getFloat('healthMult') * 1.5)
        mobModifier.putFloat('attackAdd', mobModifier.getFloat('attackAdd') * 1.1)
        server.persistentData.put('finalMobSpawnProp', mobModifier)
    } else if (AStages.serverHasStage(FTBFinalIteration5, server)) {
        let mobModifier = server.persistentData.get('finalMobSpawnProp')
        mobModifier.putFloat('healthMult', mobModifier.getFloat('healthMult') + 0.2)
        mobModifier.putFloat('attackAdd', mobModifier.getFloat('attackAdd') + 0.5)
        server.persistentData.put('finalMobSpawnProp', mobModifier)
    }
    
}