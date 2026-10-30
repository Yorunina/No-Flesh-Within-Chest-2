// priority: 500
RegistryOrgan('kubejs:vita_rose_liver').setRank(4)
    .addScore('chestcavity:detoxification', 1.5)
    .addScore('chestcavity:filtration', 0.5)
    .addScore('kubejs:photosynthesis', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function VitaRoseLiverDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    /**@type {Internal.LivingEntity} */
    const target = event.entity
    if (!sourceEntity.getUuid()) return
    if (target.hasEffect('kubejs:vita_toxins')) return
    target.potionEffects.add('kubejs:vita_toxins', 20 * 60, 0, false, false)

    SetVitaToxinsSource(target, sourceEntity.getUuid())
    const query = sourceEntity.chestCavityInstance.getOrganQueryIndex()
    const berryIndex = query.findItem('kubejs:vita_berry', true, null)
    // 与安装遍历一致，按首个有效格子选择分支，不自动挑选槽位加成。
    const hasBerry = berryIndex >= 0
    const fertileBerry = hasBerry && query.getSlotType(berryIndex) == FertileSlot
    if (hasBerry && !fertileBerry) {
        SetVitaToxinsType(target, 'max_health')
        SetVitaToxinsCoe(target, slotType == FertileSlot ? 10 : 2)
    } else if (fertileBerry) {
        SetVitaToxinsType(target, 'armor')
        SetVitaToxinsCoe(target, slotType == FertileSlot ? 10 : 2)
    } else {
        SetVitaToxinsType(target, 'attack_damage')
        SetVitaToxinsCoe(target, slotType == FertileSlot ? 5 : 1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:vita_rose_liver')
        .addOnlyStrategy('entity_do_damage', VitaRoseLiverDoDamage)
)