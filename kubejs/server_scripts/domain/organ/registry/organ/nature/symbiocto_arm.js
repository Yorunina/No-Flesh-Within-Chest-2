// priority: 500
RegistryOrgan('kubejs:symbiocto_arm')
    .addScore('chestcavity:strength', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.ItemEntityInteractedEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SymbioctoArmEntityInteract(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    if (!player) return
    if (event.getHand() != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    const target = event.target
    if (player.isVehicle()) return
    target.startRiding(player, true)
    player.connection.send(new $ClientboundSetPassengersPacket(player))
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.ItemEntityInteractedEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SymbioctoArmEntityBeInteracted(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    if (!player) return
    const target = event.target
    if (target.isVehicle()) return
    player.startRiding(target, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:symbiocto_arm')
        .addOnlyStrategy('entity_interact', SymbioctoArmEntityInteract)
        .addOnlyStrategy('entity_be_interacted', SymbioctoArmEntityBeInteracted)
)