// priority: 500

// todo 调试方法
const PositionEmitter = new $PositionGoopEmitter()
ItemEvents.rightClicked('stick', event => {
    let player = event.player
    // let nbt = new $CompoundTag()
    // nbt.putString('replaceBlock', 'minecraft:deepslate')
    // nbt.putString('mode', 'mark')
    // console.log(nbt)
    let pos = GenDungeonIslands(event.level)
    player.tell(pos)
    // let pos = player.blockPosition()
    // let vec3 = new Vec3d(pos.x, pos.y, pos.z)

    // PositionEmitter.emitInternal(event.level, vec3, 0xffffff, new Vec4f(0, 0, 0, 0.25), 1, 1)
    // let map = new Map()
    // map.set('0', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试1'))
    // map.set('1', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试2'))
    // map.set('2', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试3'))
    // map.set('3', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试4'))
    // map.set('4', new OragnEffectModel(Item.of('kubejs:warden_core')).setPriority(100).setCustomText('测试5'))
    // player.chestCavityInstance.customEntityDataMap.put('organEffectMap', map)
    // player.chestCavityInstance.customEntityDataMap.put('organEffectChanged', true)
})