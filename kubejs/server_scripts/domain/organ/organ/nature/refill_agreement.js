// priority: 500
RegistryOrgan('kubejs:refill_agreement')
    .addScore('chestcavity:luck', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.TradeWithVillagerEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RefillAgreementTradeWithVillager(customData, event, organItem, organIndex, slotType) {
    const villager = event.abstractVillager
    const level = villager.level
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (OrganItemCoolDown(entity, organItem)) return
    if (villager instanceof $Villager && villager.needsToRestock()) {
        level.spawnParticles($ParticleTypes.HEART, true, villager.getX(), villager.getY(), villager.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
        villager.restock()
        entity.addItemCooldown(organItem, 20 * 30)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:refill_agreement')
        .addOnlyStrategy('trade_with_villager', RefillAgreementTradeWithVillager)
)