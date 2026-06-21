// priority: 500
RegistryOrgan('kubejs:lily_pad_lung')
    .addScore('chestcavity:defense', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LilyPadLungDoDamageDefer(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const source = event.source.actual
    if (source.isPlayer() && OrganItemCoolDown(source, organItem)) {
        return
    }
    /**@type {Internal.LivingEntity} */
    const target = event.entity
    if (!target.isAlive()) return
    if (!target.hasEffect('kubejs:putrid_toxins')) return
    let effect = target.getEffect('kubejs:putrid_toxins')
    let damage = GetPutridToxinsDamage(target)
    // 强化效果，如果伤害小于快照伤害，则延长效果时长；且不在具有内置冷却
    if (event.amount < damage) return
    SetPutridToxinsDamage(target, event.amount)
    if (source.isPlayer()) {
        source.addItemCooldown('kubejs:lily_pad_lung', 20 * 3)
    }
    target.potionEffects.add('kubejs:putrid_toxins', effect.duration, Math.min(effect.amplifier + 1, 4), false, false)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:lily_pad_lung')
        .addOnlyStrategy('entity_do_damage', LilyPadLungDoDamageDefer, -1)
)