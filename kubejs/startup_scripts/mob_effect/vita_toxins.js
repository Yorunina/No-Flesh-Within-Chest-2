// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('vita_toxins')
        .harmful()
        .effectTick((entity, lvl) => {
            if (entity.age % 40 != 0) return
            if (!(entity.isLiving() && entity instanceof $PathfinderMob)) return
            const level = entity.level
            /**@type {UUID} */
            let vitaToxinsSource = GetVitaToxinsSource(entity)
            if (!vitaToxinsSource) return
            /**@type {Internal.LivingEntity} */
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
                case 'armor':
                    attribute = sourceEntity.getAttribute('minecraft:generic.armor')
                    if (!attribute) return
                    vitaToxinsDamage = attribute.getValue() * vitaToxinsCoe
                    break
                default:
                    break
            }
            entity.invulnerableTime = 0
            entity.attack(entity.damageSources().magic(), vitaToxinsDamage * (lvl * 0.25 + 0.5))
        })
        .removeEffect((entity, attributeMap, lvl) => {
            if (entity.isLiving()) ResetPutridToxins(entity)
        })
        .color(Color.DARK_RED)
})
