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
    .addWave(NewKillAmountWave(5, 20 * 60, (level, context, areaManager) => {
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('zombie')
            entity.setMaxHealth(20)
            DungeonCreateEntity(level, context, entity)
        }
    }))
    .addWave(NewKillAmountWave(6, 20 * 60, (level, context, areaManager) => {
        for (let i = 0; i < 8; i++) {
            /**@type {Internal.PathfinderMob} */
            let entity = level.createEntity('zombie')
            entity.setMaxHealth(20)
            DungeonCreateEntity(level, context, entity)
        }
    }))