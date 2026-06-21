// priority: 500
RegistryOrgan('kubejs:tasty_gland')
    .addScore('chestcavity:endurance', -1.5)
    .addScore('chestcavity:digestion', 1)
    .setCanSpawn(true)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.ItemEntityInteractedEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TastyGlandEntityBeInteracted(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    /**@type {Internal.PathfinderMob} */
    const target = event.target
    if (!target.isLiving()) return
    const level = event.level
    if (event.getHand() != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    let recoverAmount = Clamp(target.getHealth() * 0.5, 0, 40)
    let leftAmount = RecoverPlayerHungerAndSaturation(player, recoverAmount)
    recoverAmount = recoverAmount - leftAmount
    target.attack(player.damageSources().magic(), recoverAmount)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 0.5, 1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:tasty_gland')
        .addOnlyStrategy('entity_be_interacted', TastyGlandEntityBeInteracted)
)