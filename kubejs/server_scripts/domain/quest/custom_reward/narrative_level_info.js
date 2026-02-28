// priority: 500
const NarrativeLevelInfoStage = 'ftb_narrative_level_info'
FTBQuestsEvents.customReward('narrative_level_info', event => {
    const server = event.server
    const persistentData = server.persistentData
    let narrativeLevelInfo = persistentData.getInt('narrative_level_info') + 1
    if (narrativeLevelInfo >= 100) {
        AStages.addStageToServer(NarrativeLevelInfoStage, server)
    }
    persistentData.putInt('narrative_level_info', narrativeLevelInfo)
})

// 返航任务
MAAEvents.ftbQuestCheckRepeatable('1504B976EC5B23D9', event => {
    const teamData = event.teamData
    // 警告信完成则停止循环任务
    if (!teamData.isCompletedById('028470DB13C00215')) return
    event.cancel()
})