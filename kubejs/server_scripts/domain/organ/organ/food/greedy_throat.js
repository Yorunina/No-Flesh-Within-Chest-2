// priority: 500
RegistryOrgan('kubejs:greedy_throat')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:knockback_resistant', -1)



/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.FoodEatenEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function GreedyThroatFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    if (!player) return
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const foodItem = event.item
    if (!foodItem) return
    if (OrganItemCoolDownSlience(player, organItem)) return
    let itemCopy = foodItem.copyWithCount(1)
    let nbt = itemCopy.getOrCreateTag()
    if (nbt.contains('greedyThroatUUID')) {
        let greedyUuid = nbt.getUUID('greedyThroatUUID')
        if (greedyUuid.equals(player.getUuid())) return
    }
    nbt.putUUID('greedyThroatUUID', player.getUuid())

    let canSetSlotList = []
    for (let i = 0; i < ccInv.getContainerSize(); i++) {
        if (ccInv.getItem(i).isEmpty()) {
            canSetSlotList.push(i)
        }
    }

    let targetIndex = -1
    if (canSetSlotList.length > 0) {
        targetIndex = RandomGet(canSetSlotList)
    } else {
        return
    }
    let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetChestCavityOrgan(customData, chestCavity, itemCopy, targetIndex, targetSlotType, true)
    if (player instanceof $ServerPlayer) {
        player.addItemCooldown(organItem, 20 * 10)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:greedy_throat')
        .addOnlyStrategy('food_eaten', GreedyThroatFoodEaten)
)