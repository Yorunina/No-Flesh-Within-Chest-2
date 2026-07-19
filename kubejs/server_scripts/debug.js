// priority: 500
// ItemEvents.rightClicked('stick', event => {
//     // const player = event.player
//     // const level = event.level
//     // let pos = new BlockPos(0, 56, 0)
//     // /**@type {Internal.ShellForgeBlockEntity} */
//     // const blockEntity = level.getBlockEntity(pos)
//     // /**@type {Internal.CompoundTag} */
//     // let playerData = blockEntity.createFreshPlayerData(level)
//     // playerData.putInt('playerGameType', 2)
//     // playerData.putInt('previousPlayerGameType', 0)
//     // playerData.putBoolean('infLifeShell', false)
//     // playerData.putString('playerType', 'amusement')
//     // blockEntity.createShellByData(player.uuid, playerData)
//     event.player.sendData('debug')
// })

ItemEvents.entityInteracted('minecraft:stick', event => {
    const level = event.level
    const target = event.target
    MobBattleUtil.setEntityFriendlyToPlayers(target)
    MobBattleUtil.addEntitiesToTeam(level, 'team_1', target)
    MobBattleUtil.setEntityNoAI(target)
    if (target instanceof $AbstractGolem) {
        target.setOwnerUUID($UUID.randomUUID())
    }
})

ItemEvents.entityInteracted('minecraft:blaze_rod', event => {
    const level = event.level
    const target = event.target
    MobBattleUtil.setEntityFriendlyToPlayers(event.target)
    MobBattleUtil.addEntitiesToTeam(level, 'team_2', event.target)
    MobBattleUtil.setEntityNoAI(event.target)
    if (target instanceof $AbstractGolem) {
        target.setOwnerUUID($UUID.randomUUID())
    }
})



ItemEvents.rightClicked('minecraft:blaze_powder', event => {
    const level = event.level
    MobBattleUtil.getMobsOnTeam(level, 'team_1').forEach(mob => {
        MobBattleUtil.restoreEntityAI(mob)
    })

    MobBattleUtil.getMobsOnTeam(level, 'team_2').forEach(mob => {
        MobBattleUtil.restoreEntityAI(mob)
    })

    MobBattleUtil.setTeamsHostile(level, 'team_1', 'team_2')
})

ItemEvents.firstLeftClicked('minecraft:blaze_powder', event => {
    const level = event.level
    MobBattleUtil.getMobsOnTeam(level, 'team_1').forEach(mob => {
        mob.discard()
    })

    MobBattleUtil.getMobsOnTeam(level, 'team_2').forEach(mob => {
        mob.discard()
    })

    MobBattleUtil.removeTeam(level, 'team_1')
    MobBattleUtil.removeTeam(level, 'team_2')
})
