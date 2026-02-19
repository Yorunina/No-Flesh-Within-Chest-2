// priority: 500
// 重置玩家任务进度和关联任务的阶段
FTBQuestsEvents.customReward('reset_player_progress', event => {
    const player = event.player
    MAAUtils.resetPlayerTaskProgress(player)
    AStages.getStagesFromPlayer(player).forEach(stageStr => {
        if (stageStr.startsWith('ftb_')) {
            AStages.removeStageFromPlayer(stageStr, player)
        }
    })
})
