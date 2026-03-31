// priority: 500
// 重置玩家任务进度和关联任务的阶段
FTBQuestsEvents.customReward('reset_player_progress', event => {
    const server = event.server
    MAAUtils.resetServerTaskProgress(server)
    AStages.removeAllPlayerStages()
    AStages.removeAllStagesFromServer(server)
})