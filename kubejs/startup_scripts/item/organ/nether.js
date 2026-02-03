// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:ignited_armour').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nether/ignited_armour').tag('kubejs:nether').tag('kubejs:liver')
    event.create('kubejs:embers_liver').maxStackSize(1).texture('kubejs:item/organs/nether/embers_liver').tag('kubejs:nether').tag('kubejs:liver')
    event.create('kubejs:blaze_spine').maxStackSize(1).texture('kubejs:item/organs/nether/blaze_spine').tag('kubejs:nether').tag('kubejs:spine')
    event.create('kubejs:explosion_cavity').maxStackSize(1).texture('kubejs:item/organs/nether/explosion_cavity').tag('kubejs:nether').tag('kubejs:lung')
})