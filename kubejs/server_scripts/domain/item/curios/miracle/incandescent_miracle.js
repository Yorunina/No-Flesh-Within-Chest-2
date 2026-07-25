// priority: 500
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event 
 * @param {Internal.ItemStack} curiosItem
 */
function IncandescentMiracleEntityKill(customData, event, curiosItem) {
    const killer = event.source.actual
    if (!killer) return
    const entity = event.entity
    if (entity.getRemainingFireTicks() < 600) return
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('value', nbt.getInt('value') + 1)
    curiosItem.setNbt(nbt)
}

RegistryCuriosStrategy(
    new CuriosStrategyModel('kubejs:incandescent_miracle')
        .addStrategy('entity_kill', IncandescentMiracleEntityKill)
)
