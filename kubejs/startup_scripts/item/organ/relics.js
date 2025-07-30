// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:demon_eyeball').maxStackSize(1).texture('kubejs:item/organs/relics/demon_eyeball').tag('kubejs:relics')
    event.create('kubejs:immortal_volcanic_rock').maxStackSize(1).texture('kubejs:item/organs/relics/immortal_volcanic_rock').tag('kubejs:relics')
    event.create('kubejs:frenzy_blast_furance').maxStackSize(1).texture('kubejs:item/organs/relics/frenzy_blast_furance').tag('kubejs:relics')
    event.create('kubejs:warden_core').maxStackSize(1).texture('kubejs:item/organs/relics/warden_core').tag('kubejs:relics')
    event.create('kubejs:netherite_muscle').maxStackSize(1).texture('kubejs:item/organs/relics/netherite_muscle').tag('kubejs:relics').tag('kubejs:nether').tag('kubejs:muscle')
    event.create('kubejs:ender_guardian_spine').maxDamage(10).maxStackSize(1).texture('kubejs:item/organs/relics/ender_guardian_spine').tag('kubejs:relics').tag('kubejs:ender').tag('kubejs:spine')
    event.create('kubejs:embers_liver').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/relics/embers_liver').tag('kubejs:relics').tag('kubejs:nether').tag('kubejs:liver')
    event.create('kubejs:harbinger_lung').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/relics/harbinger_lung').tag('kubejs:relics').tag('kubejs:lung').tag('kubejs:machine')
    event.create('kubejs:leviathan_rib').maxStackSize(1).texture('kubejs:item/organs/relics/leviathan_rib').tag('kubejs:relics').tag('kubejs:rib').tag('kubejs:magic')
    event.create('kubejs:remnant_heart').maxStackSize(1).texture('kubejs:item/organs/relics/remnant_heart').tag('kubejs:heart').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:maledictus_wing').maxStackSize(1).texture('kubejs:item/organs/relics/maledictus_wing').tag('kubejs:relics').tag('kubejs:magic')
    event.create('kubejs:scylla_star_gem').maxStackSize(1).tag('kubejs:relics').tag('kubejs:magic').texture('kubejs:item/organs/relics/scylla_star_gem').tag('kubejs:gem')

    event.create('kubejs:dying_heart').maxStackSize(1).tag('kubejs:relics').tag('kubejs:magic').texture('kubejs:item/organs/relics/dying_heart')
})
