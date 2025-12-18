// priority: 1000
// 匠魂相关
StartupEvents.registry('item', event => {
    event.create('genesis_tinker_blueprint').texture('kubejs:item/tcon/genesis_tinker_blueprint').maxStackSize(1).fireResistant()
    // 清澈宝石
    event.create('clear_crystal').texture('kubejs:item/tcon/clear_crystal').maxStackSize(64).fireResistant()
})