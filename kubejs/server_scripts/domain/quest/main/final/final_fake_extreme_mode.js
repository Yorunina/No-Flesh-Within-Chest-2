// priority: 500
const FakeExtreHealthDownUUID = UUID.fromString('7A205372-8B49-44B6-9188-5A97A9C003C2')
PlayerEvents.respawned(event => {
    const server = event.server
    if (!AStages.serverHasStage(FTBFinalTimerStart, server)) return
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    if (!player.gameMode.isSurvival()) return
    if (player.isFake()) return

    if (AStages.playerHasStage('ftb_extre_wound_3', player)) {
        if (server.isSingleplayer() && server.getSingleplayerProfile().getName() == player.getName().getString()) {
            player.setGameMode('spectator')
            player.fallDistance = 0
        } else {
            server.getPlayerList().getBans().add(new $UserBanListEntry(player.getGameProfile(), null,'Console',null, Text.translatable('fake_extreme_mode.kubejs.banReason').getString()))
            player.connection.disconnect(Text.translatable('fake_extreme_mode.kubejs.banReason'))
        }
    } else if (AStages.playerHasStage('ftb_extre_wound_2', player)) {
        let attribute = player.getAttribute('minecraft:generic.max_health')
        attribute.removePermanentModifier(FakeExtreHealthDownUUID)
        let attributeModifier = new $AttributeModifier(FakeExtreHealthDownUUID, 'FakeExtreHealthDown', -1, $Operation.MULTIPLY_TOTAL)
        attribute.addPermanentModifier(attributeModifier)
    } else if (AStages.playerHasStage('ftb_extre_wound_1', player)) {
        let attribute = player.getAttribute('minecraft:generic.max_health')
        attribute.removePermanentModifier(FakeExtreHealthDownUUID)
        let attributeModifier = new $AttributeModifier(FakeExtreHealthDownUUID, 'FakeExtreHealthDown', -0.5, $Operation.MULTIPLY_TOTAL)
        attribute.addPermanentModifier(attributeModifier)
    }
})


EntityEvents.death('minecraft:player', event => {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    const level = event.level
    if (!player.isPlayer()) return
    // 阶段控制
    const server = event.server
    if (!AStages.serverHasStage(FTBFinalTimerStart, server)) return
    if (!player.gameMode.isSurvival()) return
    if (player.isFake()) return
    // 伤口递进
    if (AStages.playerHasStage('ftb_extre_wound_2', player)) {
        AStages.addStageToPlayer('ftb_extre_wound_3', player)
        AStages.removeStageFromPlayer('ftb_extre_wound_2', player)
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.warden.heartbeat', player.getSoundSource(), 1, 1)
        server.tell(Text.translatable('fake_extreme_mode.kubejs.wound_3', player.getName()).gray())
    } else if (AStages.playerHasStage('ftb_extre_wound_1', player)) {
        AStages.addStageToPlayer('ftb_extre_wound_2', player)
        AStages.removeStageFromPlayer('ftb_extre_wound_1', player)
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.warden.heartbeat', player.getSoundSource(), 1, 1)
        server.tell(Text.translatable('fake_extreme_mode.kubejs.wound_2', player.getName()).gray())
    } else {
        AStages.addStageToPlayer('ftb_extre_wound_1', player)
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.warden.heartbeat', player.getSoundSource(), 1, 1)
        server.tell(Text.translatable('fake_extreme_mode.kubejs.wound_1', player.getName()).gray())
    }
})
