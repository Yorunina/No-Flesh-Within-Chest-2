// priority: 500
/**
 * @param {Internal.ServerEventJS} event 
 */
function FinalDayEvent(event) {
    const server = event.server
    if (AStages.serverHasStage('ftb_final_timer_start', server)) return
    server.playerList.getPlayers().forEach(player => {
        MAAUtils.onKubeTaskFinish('final_day_counter', player, (pTask, pPlayer, pTeamData) => {
            pTeamData.addProgress(pTask, 1)
        })
    })
    RefreshServerTotalCache(global.STAT_FINAL_TIMER, server)
    let finalTimer = Clamp(GetLeaderBoardTotal(global.STAT_FINAL_TIMER, server), 0, 100)

    if (AStages.serverHasStage('ftb_final_iteration_50', server)) {
        let speedProp = Clamp(1 + 0.1 * (finalTimer - 50), 1, 400)
        SetDaySpeed(speedProp)
        SetNightSpeed(speedProp)
    }

    if (AStages.serverHasStage('ftb_final_iteration_30', server)) {
        let mobModifier = new $CompoundTag()
        mobModifier.putFloat('healthMult', 1.2 ^ finalTimer - 1)
        mobModifier.putFloat('attackAdd', 1.1 ^ finalTimer)
        server.persistentData.put('finalMobSpawnProp', mobModifier)
    } else if (AStages.serverHasStage('ftb_final_iteration_5', server)) {
        let mobModifier = new $CompoundTag()
        mobModifier.putFloat('healthMult', 0.1 * finalTimer)
        mobModifier.putFloat('attackAdd', 0.5 * finalTimer)
        server.persistentData.put('finalMobSpawnProp', mobModifier)
    }
}

FTBQuestsEvents.customReward('time_going_1', event => {
    const player = event.player
    player.getStats().add(global.STAT_FINAL_TIMER, 1)
})
