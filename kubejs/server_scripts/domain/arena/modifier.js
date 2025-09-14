// priority: 999
SkyArenaEvents.arenaMobSpawn(event => {
    const blockEntity = event.getAltarBlockEntity()
    const arenaMobs = event.getArenaMobs()
    const modifierListTag = blockEntity.getModifierList()
    modifierListTag.forEach(modifierTag => {
        const modifier = modifierTag.getAsString()
        console.log(`modifier: ${modifier}`)
        if (modifier == 'more_health') {
            arenaMobs.forEach(arenaMob => {
                if (arenaMob instanceof $PathfinderMob) {
                    let healthAttr = arenaMob.getAttribute('minecraft:generic.max_health')
                    if (healthAttr) {
                        healthAttr.addPermanentModifier(new $AttributeModifier('C1441A0C-A969-4899-9B15-34157BBBB5B9', 'testMaxHealthBoost', 100, $Operation.ADDITION))
                        arenaMob.setHealth(arenaMob.getMaxHealth())
                    }
                }
            })
        }
    })
})

