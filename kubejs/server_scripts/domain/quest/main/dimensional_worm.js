// priority: 500
// 维度盛宴循环
MAAEvents.ftbQuestCheckRepeatable('28B0B07A19295E57', event => {
    const teamData = event.teamData
    if (!teamData.isCompletedById('4BC0581046C250D5')) return
    MAAUtils.sendClientRepeatTaskCompleted(teamData, '28B0B07A19295E57')
    MAAUtils.sendClientRepeatTaskClaimed(teamData, event.playerUUID, '6687F5A9BFD8425E')
    event.cancel()
})

// 维度穿刺循环
MAAEvents.ftbQuestCheckRepeatable('1A033D35372B167E', event => {
    const teamData = event.teamData
    if (Math.random() < 0.3) {
        let targetTask = MAAUtils.getTaskByTeamData(teamData, '3A1023B5092EC993')
        if (!targetTask) return
        teamData.addProgress(targetTask, 1)
        MAAUtils.sendClientRepeatTaskCompleted(teamData, '1A033D35372B167E')
        MAAUtils.sendClientRepeatTaskClaimed(teamData, event.playerUUID, '782E80E17A636A8A')
        event.cancel()
        return
    }
    if (!teamData.isCompletedById('6EF16BD7804710C9')) return
    MAAUtils.sendClientRepeatTaskCompleted(teamData, '1A033D35372B167E')
    MAAUtils.sendClientRepeatTaskClaimed(teamData, event.playerUUID, '782E80E17A636A8A')
    event.cancel()
})

InfinityEvents.timeBombResetDim(event => {
    const level = event.level
    const server = event.server
    switch (level.getDimension()) {
        case 'infinity:generated_89671254':
            AStages.addStageToServer('ftb_reset_dim_89671254', server)
            break
        case 'infinity:generated_35466218':
            AStages.addStageToServer('ftb_reset_dim_35466218', server)
            break
        case 'infinity:generated_19972456':
            AStages.addStageToServer('ftb_reset_dim_19972456', server)
            break
    }
})