// priority: 500
StartupEvents.registry('item', event => {
    // 模板器官
    event.create('kubejs:lung_template').maxStackSize(1).texture('kubejs:item/organs/template/lung_template').tag('kubejs:lung')
    
    event.create('kubejs:muscle_template').maxStackSize(1).texture('kubejs:item/organs/template/muscle_template').tag('kubejs:muscle')

    event.create('kubejs:heart_template').maxStackSize(1).texture('kubejs:item/organs/template/heart_template').tag('kubejs:heart')

    event.create('kubejs:intestine_template').maxStackSize(1).texture('kubejs:item/organs/template/intestine_template').tag('kubejs:intestine')

    event.create('kubejs:rib_template').maxStackSize(1).texture('kubejs:item/organs/template/rib_template').tag('kubejs:rib')

    event.create('kubejs:spine_template').maxStackSize(1).texture('kubejs:item/organs/template/spine_template').tag('kubejs:spine')

    event.create('kubejs:spleen_template').maxStackSize(1).texture('kubejs:item/organs/template/spleen_template').tag('kubejs:spleen')

    event.create('kubejs:stomach_template').maxStackSize(1).texture('kubejs:item/organs/template/stomach_template').tag('kubejs:stomach')

    event.create('kubejs:kidney_template').maxStackSize(1).texture('kubejs:item/organs/template/kidney_template').tag('kubejs:kidney')

    event.create('kubejs:liver_template').maxStackSize(1).texture('kubejs:item/organs/template/liver_template').tag('kubejs:liver')

    event.create('kubejs:appendix_template').maxStackSize(1).texture('kubejs:item/organs/template/appendix_template').tag('kubejs:appendix')
})