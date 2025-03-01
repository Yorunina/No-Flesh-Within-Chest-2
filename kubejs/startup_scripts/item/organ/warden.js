// priority: 500
StartupEvents.registry('item', event => {
    // 监守者核心
    event.create('kubejs:warden_core')
        .maxStackSize(1)
        .texture('kubejs:item/organs/relics/warden_core')
        .tag('kubejs:relics')
})
