// priority: 500
RegistryOrgan('kubejs:pelican_larynx')
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
function PelicanLarynxEntityInteract(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    /**@type {Internal.PathfinderMob} */
    const target = event.target
    if (!(target.isLiving() && target instanceof $PathfinderMob)) return
    const level = event.level
    if (event.getHand() != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    if (OrganItemCoolDown(player, organItem)) return
    if (player.getMaxHealth() <= target.getMaxHealth()) return
    if (target.isPlayer()) return
    let itemNbt = new $CompoundTag()
    if (organItem.hasNBT()) {
        itemNbt = organItem.getNbt()
        if (itemNbt.contains('type')) {
            let targetNbt = itemNbt.get('entityNbt')
            let targetId = itemNbt.getString('type')
            let entity = level.createEntity(targetId)
            entity.setNbt(targetNbt)
            entity.setPos(target.getX(), target.getY(), target.getZ())
            entity.spawn()
        }
    }
    let targetNbt = target.getNbt()
    let targetId = target.type
    itemNbt.putString('type', targetId)
    itemNbt.put('entityNbt', targetNbt)
    organItem.setNbt(itemNbt)
    target.discard()
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 0.5, 1)
    player.addItemCooldown(organItem, 20 * 15)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pelican_larynx')
        .addOnlyStrategy('entity_interact', PelicanLarynxEntityInteract)
)