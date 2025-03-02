// priority: 100
StartupEvents.registry('mob_effect', event => {
    event.create('burning_heart')
        .beneficial()
        .color(Color.DARK_RED)

    event.create('flaring_heart')
        .beneficial()
        .color(Color.RED)

    event.create('sweet_dream')
        .beneficial()
        .color(Color.PINK_DYE)

    event.create('vampiric')
        .beneficial()
        .color(Color.DARK_RED)

    event.create('colorful')
        .beneficial()
        .color(Color.RED)

    event.create('dragon_power')
        .beneficial()
        .color(Color.DARK_PURPLE)

    event.create('lethal_toxins')
       .harmful()
       .effectTick(entity => {
            if (!(entity.isAlive() && entity.chestCavityInstance)) return
            const chestCavity = entity.chestCavityInstance
            if (!chestCavity.customEntityDataMap.containsKey('lethalToxins')) return
            let lethalToxinsDamage = chestCavity.customEntityDataMap.get('lethalToxins')
            let effect = entity.getEffect('kubejs:lethal_toxins')
            if (!effect) return
            entity.attack(entity.damageSources().magic(), lethalToxinsDamage * 0.1 * (effect.getAmplifier() + 1))
       })
       .color(Color.DARK_PURPLE)

})

