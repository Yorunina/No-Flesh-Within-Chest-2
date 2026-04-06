// priority: 1000
const PrimalAgoHealthUpUUID = '70D25D19-028D-4DC7-9BDE-D7AEE4A57804'
const PrimalAgoHealthUpIdentifier = 'PrimalAgoHealthUp'
const PrimalAgoAttackDamageUpUUID = 'E7F730B3-05D8-4A45-91E8-5B6BA82C9566'
const PrimalAgoAttackDamageUpIdentifier = 'PrimalAgoAttackDamageUp'
const PrimalAgoArrowDamageUpUUID = '9CB85684-7A4E-4B14-9BF3-67BD50CEBE59'
const PrimalAgoArrowDamageUpIdentifier = 'PrimalAgoArrowDamageUp'
StartupEvents.registry('mob_effect', event => {
    event.create('primal_ago')
        .beneficial()
        .color(Color.DARK_PURPLE)
        .addEffect((entity, attributeMap, lvl) => {
            let maxHealthAttribute = attributeMap.getInstance('minecraft:generic.max_health')
            if (maxHealthAttribute) maxHealthAttribute.addPermanentModifier(new $AttributeModifier(PrimalAgoHealthUpUUID, PrimalAgoHealthUpIdentifier, 0.5 * lvl, 'multiply_total'))

            let attackDamageAttribute = attributeMap.getInstance('minecraft:generic.attack_damage')
            if (!attackDamageAttribute) attackDamageAttribute.addPermanentModifier(new $AttributeModifier(PrimalAgoAttackDamageUpUUID, PrimalAgoAttackDamageUpIdentifier, 0.5 * lvl, 'multiply_total'))

            let arrowDamageAttribute = attributeMap.getInstance('attributeslib:arrow_damage')
            if (!arrowDamageAttribute) arrowDamageAttribute.addPermanentModifier(new $AttributeModifier(PrimalAgoArrowDamageUpUUID, PrimalAgoArrowDamageUpIdentifier, 0.5 * lvl, 'multiply_total'))

            entity.heal(entity.getMaxHealth())
        })
        .removeEffect((entity, attributeMap, lvl) => {
            let maxHealthAttribute = attributeMap.getInstance('minecraft:generic.max_health')
            if (maxHealthAttribute) maxHealthAttribute.removePermanentModifier(PrimalAgoHealthUpUUID)
            let attackDamageAttribute = attributeMap.getInstance('minecraft:generic.attack_damage')
            if (attackDamageAttribute) attackDamageAttribute.removePermanentModifier(PrimalAgoAttackDamageUpUUID)
            let arrowDamageAttribute = attributeMap.getInstance('attributeslib:arrow_damage')
            if (arrowDamageAttribute) arrowDamageAttribute.removePermanentModifier(PrimalAgoArrowDamageUpUUID)
            const level = entity.level
            if (level.isClientSide()) return
            let nearbyMobs = GetEntityWithinRadius(level, entity.getPos(), 16, (pLevel, pMob) => {
                if (pMob.isMonster() && pMob.hasEffect('kubejs:primal_ago') && !pMob.is(entity)) return true
                return false
            })
            if (nearbyMobs.length == 1) {
                let oriEffect = pMob.getEffect('kubejs:primal_ago')
                nearbyMobs[0].potionEffects.add('kubejs:primal_ago', -1, oriEffect.getAmplifier() + 1, false, false)
                return
            } else {
                nearbyMobs.forEach(pMob => {
                    let oriEffect = pMob.getEffect('kubejs:primal_ago')
                    pMob.potionEffects.add('kubejs:primal_ago', oriEffect.getDuration() + 200, oriEffect.getAmplifier() + 1, false, false)
                })
            }
        })
})
