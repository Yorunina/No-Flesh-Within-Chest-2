// priority: 500
RegistryOrgan('kubejs:bone_meal_bag')
    .addScore('chestcavity:digestion', 2)
    .addScore('chestcavity:detoxification', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BoneMealBagEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.age % 200 != 0) return
    AddItemIntoBundle(organItem, Item.of('minecraft:bone_meal'), 64, (pStack) => pStack.getMaxStackSize() / 64)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BoneMealBagKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let playerPos = player.position()
    let itemList = GetBundleContents(organItem)
    if (itemList.length <= 0) return
    let gunpowderItem = itemList[0]
    if (!gunpowderItem.is('minecraft:bone_meal')) return
    let boneMealCount = gunpowderItem.getCount()
    /**@type {Internal.LivingEntity[]} */
    let entityList = GetLivingWithinRadiusVec3d(level, playerPos, 5, (plevel, pEntity) => true)
    entityList.forEach(pEntity => pEntity.potionEffects.add('minecraft:blindness', 20 * boneMealCount, 0, false, true))
    RemoveBundleItem(organItem, 0, boneMealCount)
    level.createExplosion(playerPos.x(), playerPos.y(), playerPos.z()).explode()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bone_meal_bag')
        .addOnlyStrategy('entity_tick', BoneMealBagEntityTick)
        .addOnlyStrategy('key_active', BoneMealBagKeyActive)
)
