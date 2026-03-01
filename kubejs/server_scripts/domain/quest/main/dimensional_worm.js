// priority: 500
AStages.addRestrictionForDimension('main/dimensional_worm_nether', 'ftb_server_ban_nether', 'minecraft:nether')

// 维度吞噬任务
MAAEvents.ftbQuestCheckRepeatable('28B0B07A19295E57', event => {
    const teamData = event.teamData
    // 任务完成停止循环
    if (!teamData.isCompletedById('028470DB13C00215')) return
    event.cancel()
})