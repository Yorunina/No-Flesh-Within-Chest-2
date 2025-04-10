// priority: 1000
function CommonDungeonFinishAction(level, context, lootList, isWin) {
    const area = context.area
    let playerList = GetAreaPlayerList(level, area)
    if (isWin) {
        let obeliskBlockPos = GetAreaObeliskBlockPos(area)
        SpawnItemEntity(level, obeliskBlockPos, Item.of('diamond'))
        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次成功')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.levelup', player.getSoundSource(), 0.5, 1)
        })
    } else {
        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次失败')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.trident.thunder', player.getSoundSource(), 0.5, 1)
        })
    }
}
const testDungeonSpawner = new DungeonEventActionModel('test')
    .setInitAction((level, context, areaManager) => {
    })
    .setFinishAction((level, context, areaManager, isWin) => {
        const area = context.area
        ClearEntityRemainInArea(level, area)
        CommonDungeonFinishAction(level, context, [Item.of('minecraft:diamond')], isWin)
    })
    .addWave(NewKillAmountWave(1, 20 * 5, (level, context, areaManager) => {
        const area = context.area
        const difficulty = GetAreaDifficulty(area)
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('minecraft:zombie')
            CommonDungeonEntityDifficultyModifier(entity, difficulty)
            DungeonCreateEntity(level, context, entity)
        }
    }))
    .addWave(NewKillAmountWave(1, 20 * 5, (level, context, areaManager) => {
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('minecraft:zombie')
            CommonDungeonEntityDifficultyModifier(entity, difficulty)
            DungeonCreateEntity(level, context, entity)
        }
    }))