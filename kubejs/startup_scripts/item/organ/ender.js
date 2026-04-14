// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:dragon_blood_heart').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_heart').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:heart')
    event.create('kubejs:dragon_blood_liver').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_liver').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:liver')
    event.create('kubejs:dragon_blood_lung').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_lung').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:lung')
    event.create('kubejs:dragon_blood_muscle').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_muscle').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:muscle')
    event.create('kubejs:dragon_blood_rib').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_rib').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:bone')
    event.create('kubejs:dragon_blood_kidney').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_kidney').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:kidney')
    event.create('kubejs:dragon_blood_spine').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_spine').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:spine')
    event.create('kubejs:dragon_blood_intestine').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_intestine').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:intestine')
    event.create('kubejs:dragon_blood_stomach').maxStackSize(1).texture('kubejs:item/organs/ender/dragon_blood_stomach').tag('kubejs:dragon').tag('kubejs:ender').tag('kubejs:stomach')

    event.create('kubejs:ender_golem_line').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/ender/ender_golem_line').tag('kubejs:ender')
    event.create('kubejs:endermaptera_shell').maxStackSize(1).texture('kubejs:item/organs/ender/endermaptera_shell').tag('kubejs:ender')
})