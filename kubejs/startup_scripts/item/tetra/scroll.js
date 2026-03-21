// priority: 500
StartupEvents.registry('item', event => {
    event.create('tetra_scroll').texture('kubejs:item/materials/tetra_scroll').maxStackSize(1)
})

StartupEvents.modifyCreativeTab('kubejs:tab', event => {
    event.add([
        TetraJSUtils.setupScrollData('starry_inspiration', 'starry_inspiration', [], ['starry_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('strength_inspiration', 'strength_inspiration', [], ['strength_inspiration'], false, 0, 0xda6b4c, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('enchant_inspiration', 'enchant_inspiration', [], ['enchant_inspiration'], false, 0, 0xe34bbd, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('durability_inspiration', 'durability_inspiration', [], ['durability_inspiration'], false, 0, 0x87e36d, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('exhaustion_inspiration', 'exhaustion_inspiration', [], ['exhaustion_inspiration'], false, 0, 0xedb75a, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('effect_inspiration', 'effect_inspiration', [], ['effect_inspiration'], false, 0, 0xbaa6ed, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('end_inspiration', 'end_inspiration', [], ['end_inspiration'], false, 0, 0x3a8c00, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('thunder_inspiration', 'thunder_inspiration', [], ['thunder_inspiration'], false, 0, 0xf5f573, [15, 14, 15, 15]),
    ])
})