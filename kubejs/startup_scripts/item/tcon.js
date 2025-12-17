// priority: 1000
// 匠魂相关
StartupEvents.registry('item', event => {
    event.create('genesis_tinker_blueprint').texture('kubejs:item/tcon/genesis_tinker_blueprint').maxStackSize(1).fireResistant()
    // 清澈宝石
    event.create('clear_crystal').texture('kubejs:item/tcon/clear_crystal').maxStackSize(64).fireResistant()
    // 山铜
    event.create('orichalcum').texture('kubejs:item/materials/orichalcum').maxStackSize(64)
    // 药金
    event.create('potion_gold').texture('kubejs:item/materials/potion_gold').maxStackSize(64)
    // 辉石
    event.create('glintstone').texture('kubejs:item/materials/glintstone').maxStackSize(16)
    // 卡利亚钢
    event.create('carian_steel').texture('kubejs:item/materials/carian_steel').maxStackSize(64)
    // 熔岩合金
    event.create('fire_ingot').texture('kubejs:item/materials/fire_ingot').maxStackSize(64)
    // 玄铁
    event.create('dark_steel').texture('kubejs:item/materials/dark_steel').maxStackSize(64)
})