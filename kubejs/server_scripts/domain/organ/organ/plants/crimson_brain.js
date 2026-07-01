// priority: 500
RegistryOrgan('kubejs:crimson_brain')
    .addScore('chestcavity:nerves', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.LivingEntityDeathEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CrimsonBrainEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const killer = event.source.actual
    if (!entity.hasEffect('kubejs:putrid_toxins')) return
    let effect = entity.getEffect('kubejs:putrid_toxins')
    let damage = GetPutridToxinsDamage(entity)
    let entityList = GetLivingWithinRadius(level, entity.blockPosition(), 4, (pLevel, pEntity) => {
        if (pEntity.isPlayer()) return false
        if (pEntity instanceof $TamableAnimal) {
            if (pEntity.getOwner() && pEntity.getOwner().isPlayer()) return false
        }
        if (pEntity.is(killer) || pEntity.is(entity)) return false
        return true
    })
    entityList.forEach(/**@param {Internal.LivingEntity} pEntity*/pEntity => {
        if (!pEntity.hasEffect('kubejs:putrid_toxins')) {
            SetPutridToxinsDamage(pEntity, damage)
            pEntity.potionEffects.add('kubejs:putrid_toxins', effect.duration, effect.amplifier, false, false)
        }
        if (slotType == FertileSlot) {
            pEntity.invulnerableTime = 0
            pEntity.attack(entity.damageSources().magic(), (effect.amplifier * 0.25 + 0.25) * damage * effect.duration / 40)
        }
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:crimson_brain')
        .addOnlyStrategy('entity_kill', CrimsonBrainEntityKill)
)

