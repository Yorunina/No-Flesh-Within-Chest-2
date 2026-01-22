// priority: 500
const NarrativeLevelInfo1Stage = 'ftb_narrative_level_info_1'
FTBQuestsEvents.customReward('narrative_level_info', event => {
    const server = event.server
    const persistentData = server.persistentData
    let narrativeLevelInfo = persistentData.getInt('narrative_level_info') + 1
    if (narrativeLevelInfo >= 100) {
        AStages.addStageToServer(NarrativeLevelInfo1Stage, server)
    }
    persistentData.putInt('narrative_level_info', narrativeLevelInfo)
})