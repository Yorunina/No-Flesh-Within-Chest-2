// priority: 500
RegistryOrgan('kubejs:refill_agreement')
    .addScore('chestcavity:luck', 1)
    .setCanSpawn(true)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemEntityInteractedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RefillAgreementEntityInteract(customData, event, organItem, organIndex, slotType) {
    const target = event.target
    const level = event.level
    const player = event.player
    if (event.getHand() != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    if (OrganItemCoolDown(player, organItem)) return
    if (target instanceof $Villager && target.needsToRestock()) {
        level.spawnParticles($ParticleTypes.HEART, true, target.getX(), target.getY(), target.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
        target.restock()
        player.addItemCooldown(organItem, 20 * 30)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:refill_agreement')
        .addOnlyStrategy('entity_interact', RefillAgreementEntityInteract)
)