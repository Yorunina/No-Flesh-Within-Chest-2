// priority: 500
AStages.addRestrictionForDimension('main/dimensional_worm_nether', 'ftb_server_ban_nether', 'minecraft:nether')

// 维度盛宴循环
MAAEvents.ftbQuestCheckRepeatable('28B0B07A19295E57', event => {
    const teamData = event.teamData
    if (!teamData.isCompletedById('7531026821B67389')) return
    event.cancel()
})

FTBQuestsEvents.customReward('try_dimension_pierce', event => {
    if (Math.random() < 0.1) {
        MAAUtils.onKubeTaskFinish('dimension_pierce_success', event.player, (task, pPlayer, teamData) => teamData.addProgress(task, 1))
    }
})

// 维度穿刺循环
MAAEvents.ftbQuestCheckRepeatable('1A033D35372B167E', event => {
    const teamData = event.teamData
    if (!teamData.isCompletedById('6EF16BD7804710C9')) return
    event.cancel()
})

InfinityEvents.timeBombResetDim(event => {
    const level = event.level
    const server = event.server
    switch (level.getDimension()) {
        case 'infinity:89671254':
            AStages.addStageToServer('ftb_reset_dim_89671254', server)
            break
        case 'infinity:35466218':
            AStages.addStageToServer('ftb_reset_dim_35466218', server)
            break
        case 'infinity:19972456':
            AStages.addStageToServer('ftb_reset_dim_19972456', server)
            break
    }
})