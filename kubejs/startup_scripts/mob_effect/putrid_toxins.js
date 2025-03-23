// priority: 500
StartupEvents.registry('mob_effect', event => {
    event.create('putrid_toxins')
        .harmful()
        .effectTick((entity, lvl)  => {
            if (entity.age % 20 != 0) return
            if (!entity.isAlive() || !entity instanceof $LivingEntity) return
            /**@type {Internal.ChestCavityInstance} */
            const chestCavity = entity.chestCavityInstance
            if (!chestCavity.customDataMap.containsKey('putridToxinsDamage')) return
            let putridToxinsDamage = chestCavity.customDataMap.get('putridToxinsDamage')
            entity.attack(entity.damageSources().magic(), putridToxinsDamage * (lvl + 1))
        })
        .color(Color.DARK_PURPLE)
})


