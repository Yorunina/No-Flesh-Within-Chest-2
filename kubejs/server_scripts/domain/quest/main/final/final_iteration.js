// priority: 500
FTBQuestsEvents.customReward('final_iteration_1', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_1', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })
})

FTBQuestsEvents.customReward('final_iteration_5', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_5', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })
    if (AStages.serverHasStage('ftb_final_iteration_5', event.server)) return
    AStages.addStageToServer('ftb_final_iteration_5', event.server)

    AStages.addStageToServer('ftb_final_dim_restrict_1', event.server)
    AStages.addStageToServer('ftb_final_mob_spawn_1', event.server)
})

FTBQuestsEvents.customReward('final_iteration_30', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_30', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })

    if (AStages.serverHasStage('ftb_final_iteration_30', event.server)) return
    AStages.addStageToServer('ftb_final_iteration_30', event.server)

    AStages.addStageToServer('ftb_final_dim_restrict_2', event.server)
    AStages.removeStageFromServer('ftb_final_dim_restrict_1', event.server)

    AStages.addStageToServer('ftb_final_mob_spawn_2', event.server)
    AStages.removeStageFromServer('ftb_final_mob_spawn_1', event.server)

    // 全局锁定维度网络
    MAAUtils.getAllDimNet(event.server).forEach(dimnet => {
        dimnet.setLocked(true)
    })
})

FTBQuestsEvents.customReward('final_iteration_50', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_50', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })
    if (AStages.serverHasStage('ftb_final_iteration_50', event.server)) return
    AStages.addStageToServer('ftb_final_iteration_50', event.server)
})

FTBQuestsEvents.customReward('final_iteration_90', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_90', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })
    if (AStages.serverHasStage('ftb_final_iteration_90', event.server)) return
    AStages.addStageToServer('ftb_final_iteration_90', event.server)
    
    AStages.addStageToServer('ftb_final_dim_restrict_3', event.server)
    AStages.removeStageFromServer('ftb_final_dim_restrict_2', event.server)
})

FTBQuestsEvents.customReward('final_iteration_100', event => {
    MAAUtils.onKubeTaskFinish('final_iteration_100', event.player, (pTask, pPlayer, pTeamData) => {
        pTeamData.addProgress(pTask, 1)
    })
    if (AStages.serverHasStage('ftb_final_iteration_100', event.server)) return
    AStages.addStageToServer('ftb_final_iteration_100', event.server)
})