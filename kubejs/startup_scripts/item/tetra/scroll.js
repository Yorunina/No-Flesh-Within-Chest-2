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
        TetraJSUtils.setupScrollData('blood_inspiration', 'blood_inspiration', [], ['blood_inspiration'], false, 0, 0xf6141b, [15, 14, 15, 15]),
        TetraJSUtils.setupScrollData('thunder_inspiration', 'thunder_inspiration', [], ['thunder_inspiration'], false, 0, 0xf5f573, [15, 14, 15, 15]),
    ])
})

StartupEvents.modifyCreativeTab('kubejs:tab', event => {
    event.add([
        TetraJSUtils.setupScrollData('genesis_crafting', 'genesis_crafting', ['genesis_crafting'], ['genesis_crafting'], true, 2, 0xE7EB56, [13, 10, 8, 7]),
        TetraJSUtils.setupScrollData('tetra/trident', 'relic', ['single/trident'], [], false, 0, 0x0000FF, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/fortress', 'relic', ['shield/fortress'], [], false, 0, 0x7A7A7A, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/arcane_stave', 'relic', ['bow/arcane_stave'], [], false, 0, 0x9641FC, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/whip_sword', 'relic', ['sword/whip_sword'], [], false, 0, 0xFFFFFF, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/great_hammer', 'relic', ['single/great_hammer'], [], false, 0, 0x727D80, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/katana', 'relic', ['sword/katana'], [], false, 0, 0xFF0000, [6, 15, 4, 8]),
        TetraJSUtils.setupScrollData('tetra/thousand_cold_nights', 'relic', ['sword/katana', 'katana/thousand_cold_nights'], [], true, 2, 0xFF0000, [6, 15, 4, 8]),
    ])
})
