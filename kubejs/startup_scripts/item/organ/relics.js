// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:demon_eyeball').maxStackSize(1).texture('kubejs:item/organs/relics/demon_eyeball').tag('kubejs:relics')
    event.create('kubejs:immortal_volcanic_rock').maxStackSize(1).texture('kubejs:item/organs/relics/immortal_volcanic_rock').tag('kubejs:relics')
    event.create('kubejs:frenzy_blast_furance').maxStackSize(1).texture('kubejs:item/organs/relics/frenzy_blast_furance').tag('kubejs:relics')
    event.create('kubejs:warden_core').maxStackSize(1).texture('kubejs:item/organs/relics/warden_core').tag('kubejs:relics')
    event.create('kubejs:netherite_muscle').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/relics/netherite_muscle').tag('kubejs:relics').tag('kubejs:muscle')
    event.create('kubejs:ender_guardian_spine').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/relics/ender_guardian_spine').tag('kubejs:relics').tag('kubejs:ender').tag('kubejs:spine')
})
