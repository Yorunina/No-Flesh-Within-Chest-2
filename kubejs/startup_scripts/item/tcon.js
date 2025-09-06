// priority: 1000
// 匠魂相关
StartupEvents.registry('item', event => {
    event.create('genesis_tinker_blueprint').texture('kubejs:item/tcon/genesis_tinker_blueprint').maxStackSize(1).fireResistant()
    // 生物灵魂
    event.create('soul_crystal').texture('kubejs:item/tcon/soul_crystal').maxStackSize(64).fireResistant()
})