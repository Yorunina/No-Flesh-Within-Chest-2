// priority: 500
LevelEvents.loaded('kubejs:oath', event => {
    if (AStages.serverHasStage('gen_oath', event.server)) return
    /**@type {Internal.ServerLevel} */
    const level = event.level
    GenerateStructureByCenter(level, new BlockPos(0, 0, 0), 'kubejs:oath')
    level.setDefaultSpawnPos(new BlockPos(0, 1, 0), 0)
    AStages.addStageToServer('gen_oath', event.server)
})
