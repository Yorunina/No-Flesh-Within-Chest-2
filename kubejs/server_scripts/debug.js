// priority: 500

// todo 调试方法
ItemEvents.rightClicked('stick', event => {
    let player = event.player
    UnlockPlayerTitle(player, 'kubejs:chest_opener')
    // let minecraftServer = event.level.server
    // let dungeonLevel = minecraftServer.getLevel(DUNGEON_DIM)
    // let pos = GenDungeonStruct(dungeonLevel)
    
    // player.teleportTo(dungeonLevel.getDimension(), pos.x, pos.y, pos.z, 0, 0)
    // let area = GenDungeonLevelArea(dungeonLevel, pos)
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