// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:originiums').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/infected/originiums').tag('kubejs:magic')
})