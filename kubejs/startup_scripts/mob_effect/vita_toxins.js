// priority: 500
StartupEvents.registry('mob_effect', event => {
    event.create('vita_toxins')
        .harmful()
        .effectTick((entity, lvl) => {
            if (entity.age % 40 != 0) return
            if (!entity.isAlive() || !entity instanceof $LivingEntity) return
            /**@type {Internal.ChestCavityInstance} */
            const chestCavity = entity.chestCavityInstance
            if (!chestCavity.customDataMap.containsKey('vitaToxinsSource')) return
            const level = entity.level
            /**@type {String} */
            let vitaToxinsSource = chestCavity.customDataMap.get('vitaToxinsSource')
            let sourceUuid = UUID.fromString(vitaToxinsSource)
            let sourcePlayer = level.getPlayerByUUID(sourceUuid)
            if (!sourcePlayer) return
            let vitaToxinsType = chestCavity.customDataMap.getOrDefault('vitaToxinsType', 'attack_damage')
            let vitaToxinsCoe = chestCavity.customDataMap.getOrDefault('vitaToxinsCoe', 0.1)
            let vitaToxinsDamage = 0
            switch (vitaToxinsType) {
                case 'attack_damage':
                    vitaToxinsDamage = sourcePlayer.getAttribute('minecraft:generic.attack_damage').value * vitaToxinsCoe
                    break 
            }
            entity.attack(entity.damageSources().magic(), vitaToxinsDamage * (lvl + 1))
        })
        .color(Color.DARK_RED)
})
