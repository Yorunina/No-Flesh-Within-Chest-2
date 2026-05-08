// priority: 500
PlayerEvents.loggedIn(event => {
    const player = event.player
    FirstLoginInit(player)
    InitClientOrganSkill(player) // 同步客户端SkillWheel：刷新器官轮盘展示，避免切换存档客户端数据错误
    SyncQueuedData(player) // 队列消息同步：用于将服务端的data延后发送给client
    InitClientISSSpellData(player) // 同步客户端ISSSpellData：同步客户端的ISSSpellData，用于客户端的ISSSpellData初始化
    SyncClientMoonEvent(player) // 同步客户端月亮显示：用于客户端的MoonEvent显示同步
})

/**
 * @param {Internal.ServerPlayer} player 
 */
function FirstLoginInit(player) {
    if (!player.persistentData.contains('inited') || !player.persistentData.get('inited')) {
        player.seenCredits = true
        player.persistentData.put('inited', true)
    }
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 */
function InitClientOrganSkill(player) {
    let data = new $CompoundTag()
    data.putString('type', 'refresh')
    player.sendData('update_organ_skill_wheel_item', data)
}