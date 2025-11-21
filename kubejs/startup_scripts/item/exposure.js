// priority: 1000
// Exposure相机Mod的配件
StartupEvents.registry('item', event => {
    event.create('exorcism_lens').maxStackSize(1).texture('kubejs:item/tools/exorcism_lens').tag('exposure:lenses')
    event.create('frost_lens').maxStackSize(1).texture('kubejs:item/tools/frost_lens').tag('exposure:lenses')
    event.create('reverse_causality_lens').maxStackSize(1).texture('kubejs:item/tools/reverse_causality_lens').tag('exposure:lenses').tag('kubejs:unstable')
})

// event.add('exposure:flashes', [])
// event.add('exposure:lenses', ['kubejs:exorcism_lens'])
// event.add('exposure:filters', [])