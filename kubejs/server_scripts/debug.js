// priority: 500
ItemEvents.rightClicked('stick', event => {
    const player = event.player
    const level = event.level
    let pos = new BlockPos(0, 56, 0)
    /**@type {Internal.ShellForgeBlockEntity} */
    const blockEntity = level.getBlockEntity(pos)
    let playerData = blockEntity.createFreshPlayerData(level)
    playerData.putInt("playerGameType", 2)
    playerData.putInt("previousPlayerGameType", 0)
    blockEntity.createShellByData(player.uuid, playerData)
})