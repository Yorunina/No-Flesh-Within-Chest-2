// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:originiums').maxStackSize(1).texture('kubejs:item/organs/infected/originiums').tag('kubejs:infected')
    event.create('kubejs:sub_originiums').maxStackSize(1).texture('kubejs:item/organs/infected/sub_originiums').tag('kubejs:infected')
})