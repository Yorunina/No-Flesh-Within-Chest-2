
/**
 * @param {number} scale 
 */
function ArenaMobSpawnMoreHealthModifierGenerator(scale) {
    return /**@param {any} customData @param {Internal.AltarArenaMobSpawnJS} event**/(customData, event) => {
        const arenaMobs = event.getArenaMobs()
        arenaMobs.forEach(arenaMob => {
            if (arenaMob instanceof $PathfinderMob) {
                arenaMob.modifyAttribute('minecraft:generic.max_health', `MoreHealth_${scale}`, scale, $Operation.MULTIPLY_BASE)
                arenaMob.setHealth(arenaMob.getMaxHealth())
            }
        })
    }
}

RegistryArenaMobSpawnModifierStrategy('moreHealth_0.5', ArenaMobSpawnMoreHealthModifierGenerator(0.5))
RegistryArenaMobSpawnModifierStrategy('moreHealth_1', ArenaMobSpawnMoreHealthModifierGenerator(1))
RegistryArenaMobSpawnModifierStrategy('moreHealth_2', ArenaMobSpawnMoreHealthModifierGenerator(2))
RegistryArenaMobSpawnModifierStrategy('moreHealth_4', ArenaMobSpawnMoreHealthModifierGenerator(4))
