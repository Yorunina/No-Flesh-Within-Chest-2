// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('putrid_toxins')
        .harmful()
        .effectTick((entity, lvl)  => {
            if (entity.age % 40 != 0) return
            let putridToxinsDamage = GetPutridToxinsDamage(entity)
            entity.attack(entity.damageSources().magic(), putridToxinsDamage * (lvl * 0.5 + 1))
        })
        .color(Color.DARK_PURPLE)
})


