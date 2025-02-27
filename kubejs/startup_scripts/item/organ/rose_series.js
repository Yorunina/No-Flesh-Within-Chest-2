// priority: 500
StartupEvents.registry('item', event => {
    // 玫瑰
    event.create('kubejs:rose_quartz_muscle').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_muscle').tag('kubejs:rose').tag('kubejs:muscle')
    
    event.create('kubejs:rose_quartz_heart').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_heart').tag('kubejs:rose').tag('kubejs:heart')

    event.create('kubejs:rose_quartz_liver').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_liver').tag('kubejs:rose').tag('kubejs:liver')

    event.create('kubejs:rose_quartz_dialyzer').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_dialyzer').tag('kubejs:rose').tag('kubejs:kidney')

    event.create('kubejs:rose_quartz_rib').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_rib').tag('kubejs:rose').tag('kubejs:rib')
})