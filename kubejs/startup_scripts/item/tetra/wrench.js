// priority: 1000
StartupEvents.registry('item', event => {
    event.create('kubejs:wrench', 'TetraJS:BaseModularItem')
        .tjs$setHoneBase(100)
        .tjs$setHoneIntegrityMultiplier(100)
        .tjs$isCanHone(true)
        .tjs$addMajorSlot('wrench/cogwheel', 15, 15, true)
        .tjs$addMinorSlot('wrench/handle', -15, 30, true)
        .tjs$addMinorSlot('wrench/head', -15, 0, true)
        .tag('forge:tools/wrench')
        .tag('kubejs:factory')
})
