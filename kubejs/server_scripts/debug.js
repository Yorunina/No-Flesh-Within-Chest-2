// priority: 500

// todo 调试方法
ItemEvents.rightClicked('stick', event => {
    let player = event.player
    // let pos = GenDungeonIslands(event.level)
    player.tell(player.offHandItem.serializeNBT())

    // let testData = new $CompoundTag()
    // let testDataList = new $ListTag()
    // let testSpellData = new $CompoundTag()
    // testSpellData.putString('spellId','irons_spellbooks:gust')
    // testSpellData.putInt('level', 1)
    // testDataList.add(testSpellData)
    // testData.put('spellList', testDataList)
    // player.sendData('spell_selection_data', testData)
    // player.tell(testData)
    // let res = ChestCavityUtils.setInventoryTypeData(player.getOffHandItem(), new ResourceLocation('kubejs:cc_inventory_types/rose.json'))
    // res.forEach((item) => {
    //     player.give(item)
    // })
    // const x = -30
    // const y = '-$screenH/2+49'
    // player.paint({
    //     'effect_1': {
    //         'type': 'rectangle',
    //         'x': x,
    //         'y': y,
    //         'z': 1,
    //         'w': 8,
    //         'h': 8,
    //         'alignX': 'right',
    //         'alignY': 'bottom',
    //         'texture': 'kubejs:textures/mob_effect/flaring_heart.png',
    //         'visible': true

    //     }

    // })
    // player.paint({
    //     'effect_1': {
    //         'type': 'item',
    //         'x': x + 5,
    //         'y': y,
    //         'z': 1,
    //         'w': 8,
    //         'h': 8,
    //         'alignX': 'right',
    //         'alignY': 'bottom',
    //         'item': 'kubejs:burning_heart',
    //         'overlay': true,
    //         'customText': '123',
    //         'visible': true
    //     }
    // })
    // player.addItemCooldown('kubejs:burning_heart', 10 * 20)
    // player.paint({
    //     'effect_1_num': {
    //         'type': 'text',
    //         'x': x + 5,
    //         'y': '-$screenH/2+50',
    //         'z': 2,
    //         'text': `15555`,
    //         'alignX': 'right',
    //         'alignY': 'bottom',
    //         'visible': true,
    //         'scale': 0.4,
    //         'shadow': true,
    //         'color': 0xf5f5f5
    //     }
    // })
    // player.paint({
    //     '*': {
    //         remove : true
    //     }
    // })
})
