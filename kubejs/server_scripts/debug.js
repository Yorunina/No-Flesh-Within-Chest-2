// priority: 500
ItemEvents.rightClicked('stick', event => {
    // const player = event.player
    // const level = event.level
    // let pos = new BlockPos(0, 56, 0)
    // /**@type {Internal.ShellForgeBlockEntity} */
    // const blockEntity = level.getBlockEntity(pos)
    // /**@type {Internal.CompoundTag} */
    // let playerData = blockEntity.createFreshPlayerData(level)
    // playerData.putInt('playerGameType', 2)
    // playerData.putInt('previousPlayerGameType', 0)
    // playerData.putBoolean('infLifeShell', false)
    // playerData.putString('playerType', 'amusement')
    // blockEntity.createShellByData(player.uuid, playerData)
    event.player.sendData('debug')
})

ItemEvents.entityInteracted('minecraft:stick', event => {
    // MobBattleUtil.setEntityFriendlyToPlayers(event.target)
    // MobBattleUtil.addEntitiesToTeam('team_1', event.target)
    // let nbt = new $CompoundTag()
    // nbt.putInt('entityId', event.target.id)
    // event.player.sendData('debug', nbt)
})