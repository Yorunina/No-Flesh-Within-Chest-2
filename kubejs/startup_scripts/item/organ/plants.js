// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:hop_kidney').maxStackSize(1).texture('kubejs:item/organs/plants/hop_kidney').tag('kubejs:plants').tag('kubejs:kidney')
    event.create('kubejs:pitcher_stomach').maxStackSize(1).texture('kubejs:item/organs/plants/pitcher_stomach').maxDamage(10).tag('kubejs:plants').tag('kubejs:stomach')
    event.create('kubejs:crimson_brain').maxStackSize(1).texture('kubejs:item/organs/plants/crimson_brain').tag('kubejs:plants')
    event.create('kubejs:twisting_weeping_intestine').maxStackSize(1).texture('kubejs:item/organs/plants/twisting_weeping_intestine').tag('kubejs:plants').tag('kubejs:intestine')

    event.create('kubejs:vita_rose_liver').maxStackSize(1).texture('kubejs:item/organs/plants/vita_rose_liver').tag('kubejs:plants').tag('kubejs:liver')

    event.create('kubejs:lily_pad_lung').maxStackSize(1).texture('kubejs:item/organs/plants/lily_pad_lung').tag('kubejs:plants').tag('kubejs:lung')
    event.create('kubejs:cherry_bone').maxStackSize(1).texture('kubejs:item/organs/plants/cherry_bone').tag('kubejs:plants').tag('kubejs:rib')

    event.create('kubejs:vita_berry').maxStackSize(1).texture('kubejs:item/organs/plants/vita_berry').tag('kubejs:plants')
    event.create('kubejs:vita_sunflower').maxStackSize(1).texture('kubejs:item/organs/plants/vita_sunflower').maxDamage(15).tag('kubejs:plants')
})