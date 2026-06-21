// priority: 500
RegistryOrgan('kubejs:minisheep_gland')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:detoxification', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.ItemEntityInteractedEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function MinisheepGlandEntityBeInteracted(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    const target = event.target
    if (event.getHand() != 'main_hand') return
    if (target instanceof $LivingEntity && !target.hasEffect('minecraft:weakness')) {
        entity.give(Item.of('minecraft:white_wool').withName(Text.translate('item_name.kubejs.minisheep_gland_bucket.name', target.getName())))
        target.potionEffects.add('minecraft:weakness', 20 * 60)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:minisheep_gland')
        .addOnlyStrategy('entity_be_interacted', MinisheepGlandEntityBeInteracted)
)