// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('vita_toxins')
        .harmful()
        .effectTick((entity, lvl) => {
            if (entity.age % 40 != 0) return
            if (!entity.isAlive() || !entity instanceof $LivingEntity) return
            const level = entity.level
            /**@type {String} */
            let vitaToxinsSource = GetVitaToxinsSource(entity)
            if (!vitaToxinsSource) return
            const sourceEntity = $CommonUtil.getEntityByUUID(level, vitaToxinsSource)
            if (!sourceEntity) return
            let vitaToxinsType = GetVitaToxinsType(entity)
            let vitaToxinsCoe = GetVitaToxinsCoe(entity)
            let vitaToxinsDamage = 0
            switch (vitaToxinsType) {
                case 'attack_damage':
                    let attribute = sourceEntity.getAttribute('minecraft:generic.attack_damage')
                    if (!attribute) return
                    vitaToxinsDamage = attribute.getValue() * vitaToxinsCoe
                    break 
                case 'max_health':
                    vitaToxinsDamage = sourceEntity.getMaxHealth() * vitaToxinsCoe
                    break
            }
            entity.attack(entity.damageSources().magic(), vitaToxinsDamage * (lvl * 0.5 + 1))
        })
        .color(Color.DARK_RED)
})
