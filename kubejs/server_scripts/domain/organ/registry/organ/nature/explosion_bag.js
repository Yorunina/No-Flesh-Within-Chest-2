// priority: 500
RegistryOrgan('kubejs:explosion_bag')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:detoxification', 0.5)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ExplosionBagEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.age % 200 != 0) return
    AddItemIntoBundle(organItem, Item.of('minecraft:gunpowder'), 64, (pStack) => pStack.getMaxStackSize() / 64)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ExplosionBagKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let playerPos = player.position()
    let itemList = GetBundleContents(organItem)
    if (itemList.length <= 0) return
    let gunpowderItem = itemList[0]
    if (!gunpowderItem.is('minecraft:gunpowder')) return
    let gunpowderCount = gunpowderItem.getCount()
    /**@type {Internal.LivingEntity[]} */
    let entityList = GetLivingWithinRadiusVec3d(level, playerPos, 5, (plevel, pEntity) => true)
    let damageSource = level.damageSources().explosion(player, null)
    entityList.forEach(pEntity => pEntity.attack(damageSource, gunpowderCount))
    RemoveBundleItem(organItem, 0, gunpowderCount)
    level.createExplosion(playerPos.x(), playerPos.y(), playerPos.z()).explode()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:explosion_bag')
        .addOnlyStrategy('entity_tick', ExplosionBagEntityTick)
        .addOnlyStrategy('key_active', ExplosionBagKeyActive)
)
