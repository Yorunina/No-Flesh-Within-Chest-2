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
    let duration = effect.duration
    let amplifier = effect.amplifier
    let damage = GetPutridToxinsDamage(entity)
    let entityList = GetLivingWithinRadius(level, entity.blockPosition(), 4, (pLevel, pEntity) => {
        if (pEntity.isPlayer()) return false
        if (pEntity instanceof $TamableAnimal) {
            if (pEntity.getOwner() && pEntity.getOwner().isPlayer()) return false
        }
        if (pEntity.is(killer)) return false
        if (pEntity.is(entity)) return false
        return true
    })
    entityList.forEach(/**@param {Internal.LivingEntity} pEntity*/pEntity => {
        // 强化效果，如果存在效果，就会延续时间，而不是跳过，等级取最大值
        if (pEntity.hasEffect('kubejs:putrid_toxins')) return
        SetPutridToxinsDamage(pEntity, damage)
        pEntity.potionEffects.add('kubejs:putrid_toxins', duration, amplifier, false, false)
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:crimson_brain')
        .addOnlyStrategy('entity_kill', CrimsonBrainEntityKill)
)

