// priority: 500
// todo
FTBQuestsEvents.customReward('reset_player_progress', event => {
    const server = event.server
    MAAUtils.resetServerTaskProgress(server)
    AStages.removeAllPlayerStages()
    AStages.removeAllStagesFromServer(server)
})

// FTBQuestsEvents.customReward('reset_player_progress', event => {
//     const player = event.player
//     MAAUtils.resetPlayerTaskProgress(player)
//     AStages.getStagesFromPlayer(player).forEach(stageStr => {
//         if (stageStr.startsWith('ftb_')) {
//             AStages.removeStageFromPlayer(stageStr, player)
//         }
//     })
// })