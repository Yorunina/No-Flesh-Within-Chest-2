// priority: 1000
const testDungeonSpawner = new DungeonEventActionModel('test')
    .setInitAction((level, context, areaManager) => {
    })
    .setFinishAction((level, context, areaManager, isWin) => {
        const area = context.area
        ClearEntityRemainInArea(level, area)
        if (isWin) {
            SpawnItemEntity(level, area.getCenter(), Item.of('diamond'))
        }
    })
    .addWave(NewKillAmountWave(1, 20 * 5, (level, context, areaManager) => {
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('minecraft:zombie')
            DungeonCreateEntity(level, context, entity)
        }
    }))
    .addWave(NewKillAmountWave(1, 20 * 5, (level, context, areaManager) => {
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('minecraft:zombie')
            DungeonCreateEntity(level, context, entity)
        }
    }))