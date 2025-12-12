// priority: 500
PlayerEvents.loggedIn(event => {
    const player = event.player

    SyncQueuedData(player) // 队列消息同步：用于将服务端的data延后发送给client
    SyncPlayerOriginUnlockStatus(player) // 同步起源解锁信息：服务端记录的起源信息同步到客户端

    InitClientISSSpellData(player) // 同步客户端ISSSpellData：同步客户端的ISSSpellData，用于客户端的ISSSpellData初始化
})

