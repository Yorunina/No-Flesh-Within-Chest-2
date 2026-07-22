// priority: 500
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionSplitOnDeathEntityDeath(customData, event, championKey, championLevel) {
    const entity = event.entity
    const level = entity.level
    const pos = entity.position()

    const splitCount = Math.min(championLevel + 1, 5)

    for (let i = 0; i < splitCount; i++) {
        const offsetX = (Math.random() - 0.5) * 2
        const offsetZ = (Math.random() - 0.5) * 2
        const spawnPos = pos.add(offsetX, 0, offsetZ)

        const entityType = entity.entityType
        const spawnedEntity = entityType.create(level)

        if (spawnedEntity && spawnedEntity.isLiving()) {
            spawnedEntity.setPos(spawnPos.x(), spawnPos.y(), spawnPos.z())


            const healthAttr = spawnedEntity.getAttribute('minecraft:generic.max_health')
            if (healthAttr) {
                const originalMaxHealth = entity.maxHealth
                const newMaxHealth = originalMaxHealth * 0.3
                healthAttr.setBaseValue(newMaxHealth)
                spawnedEntity.health = newMaxHealth
            }

            const damageAttr = spawnedEntity.getAttribute('minecraft:generic.attack_damage')
            if (damageAttr) {
                damageAttr.setBaseValue(damageAttr.getBaseValue() * 0.5)
            }

            level.addFreshEntity(spawnedEntity)
        }
    }
}

RegistryChampionStrategy(
    new ChampionStrategyModel('split_on_death')
        .addStrategy('entity_death', ChampionSplitOnDeathEntityDeath)
)