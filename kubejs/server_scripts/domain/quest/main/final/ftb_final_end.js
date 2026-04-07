// priority: 500
FTBQuestsEvents.customReward('ftb_final_end_1', event => {
    // 清空所有Astage
    const server = event.server
    MAAUtils.resetServerTaskProgress(server)
    AStages.removeAllPlayerStages()
    AStages.removeAllStagesFromServer(server)
    MAAUtils.getAllDimNet(server).forEach(dimnet => {
        dimnet.setLocked(false)
    })
})

FTBQuestsEvents.customReward('ftb_final_end_2', event => {
    const server = event.server

    AStages.getStagesFromServer().forEach(stage => {
        if (stage.startsWith('ftb_final_')) AStages.removeAllStagesFromServer(stage, server)
    })
    AStages.addStageToServer('ftb_final_timer_stop', server)
    MAAUtils.getAllDimNet(server).forEach(dimnet => {
        dimnet.setLocked(false)
    })
})

MAAEvents.ftbQuestCheckRepeatable('55DE4F49CDD42FDF', event => {
    if (!AStages.serverHasStage('ftb_final_timer_stop', null)) return
    event.cancel()
})