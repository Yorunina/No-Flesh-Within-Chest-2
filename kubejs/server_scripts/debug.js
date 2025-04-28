// priority: 500

// todo 调试方法
ItemEvents.rightClicked('stick', event => {
    /**@type {Internal.ServerPlayer} */
    let player = event.player
    let level = event.level
    let deposits = GetDepositsByType(level, 'gold')
    let depositPos = deposits[0].pos
    player.teleportTo(level.getDimension(), depositPos.x, depositPos.y, depositPos.z, 0, 0)

    // let adlodList = ListGeneratedAdlodsAround(level, player.blockPosition(), 100)
    // console.log(adlodList)
    // /**@type {Internal.DepositGenResult} */
    // let target = RandomGet(adlodList)
    // player.teleportTo(level.getDimension(), target.pos.x, target.pos.y, target.pos.z, 0, 0)



    // player.triggerAnimation('kubejs:inject_animation', false)
    // player.triggerAnimation('kubejs:head_fly_animation', false)
    // player.triggerAnimation('kubejs:punch_animation', false)

    // let minecraftServer = event.level.server
    // let dungeonLevel = minecraftServer.getLevel(DUNGEON_DIM)
    // const centerPos = GenSkylandStruct(dungeonLevel, new DungeonAttributeModel())

    // player.teleportTo(dungeonLevel.getDimension(), centerPos.x, centerPos.y, centerPos.z, 0, 0)

    // console.log(DungeonSpawnerIdMap)

    // let area = GenDungeonLevelArea(dungeonLevel, centerPos)
    // if (!area) return
    // let manager = LoquatAreaManager.of(dungeonLevel)
    // manager.addEvent(new $SpawnMobAreaKubeEvent(area, 'test', 1, 0))



    // player.tell(pos)
    // let pos = player.blockPosition()
    // let vec3 = new Vec3d(pos.x, pos.y, pos.z)

    // let res = []
    // $ForgeRegistries.ENTITY_TYPES.getEntries().forEach(entityType => {
    //     if (entityType.getValue().getCategory().toString() == 'MISC') return
    //     res.push(entityType.getKey().getNamespace() + ':' + entityType.getKey().getPath())
    // })
    // console.log(res)




    // PositionEmitter.emitInternal(event.level, vec3, 0xffffff, new Vec4f(0, 0, 0, 0.25), 1, 1)
    // let map = new Map()
    // map.set('0', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试1'))
    // map.set('1', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试2'))
    // map.set('2', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试3'))
    // map.set('3', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试4'))
    // map.set('4', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试5'))
    // player.chestCavityInstance.customDataMap.put('organEffectMap', map)
    // player.chestCavityInstance.customDataMap.put('organEffectChanged', true)
})


// ItemEvents.entityInteracted('minecraft:blaze_rod', event => {
//     /**@type {Internal.LivingEntity} */
//     const entity = event.target
//     const chestCavity = entity.chestCavityInstance
//     chestCavity.setOrganScore('chestcavity:nutrition', -10)
//     const player = event.player
//     player.tell(chestCavity.getOrganScore('chestcavity:nutrition'))
// })




ItemEvents.entityInteracted('minecraft:blaze_rod', event => {
    /**@type {Internal.LivingEntity} */
    const entity = event.target
    const player = event.player
    entity.potionEffects.add('kubejs:vita_toxins', 20 * 60, 0)
    entity.chestCavityInstance.customDataMap.put('vitaToxinsSource', player.getUuid().toString())
})