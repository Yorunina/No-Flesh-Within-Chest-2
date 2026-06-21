// priority: 500
RegistryOrgan('kubejs:worm_larva')
    .addScore('chestcavity:filtration', 1)
    .addScore('chestcavity:endurance', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ParasiteLarvaFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.getPlayer()
    if (!player) return
    const item = event.getItem()
    const level = event.getLevel()
    if (!organItem.hasNBT()) {
        organItem.setNbt(new $CompoundTag())
    }
    let nbt = organItem.getNbt()
    let saturation = nbt.getFloat('saturation')

    let foodProperties = item.getFoodProperties(player)
    let foodHunger = foodProperties.getNutrition()
    let foodSaturation = foodProperties.getSaturationModifier() * foodHunger * 2
    let curSaturation = saturation + foodSaturation
    nbt.putFloat('saturation', curSaturation)
    let curDamage = organItem.getDamageValue() - foodHunger
    if (curDamage <= 0) {
        let ratio = curSaturation / (organItem.getMaxDamage() - curDamage)
        if (ratio >= 1) {
            let chestCavity = player.getChestCavityInstance()
            if (!chestCavity) return
            let invTypeData = chestCavity.getInventoryTypeData()
            let ccInv = chestCavity.inventory
            let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, EightDirectionOffset)
            let emptyItemCount = 0
            for (let slotDefinition of aroundRelativeSlots) {
                let pItem = ccInv.getStackInSlot(slotDefinition.getId())
                if (!pItem || pItem.isEmpty()) {
                    emptyItemCount++
                    continue
                }
                let replaceItem
                if (pItem.hasTag('kubejs:heart')) {
                    replaceItem = Item.of('kubejs:king_of_stomach')
                } else if (pItem.hasTag('kubejs:bone')) {
                    replaceItem = Item.of('kubejs:greedy_throat')
                } else if (pItem.hasTag('kubejs:liver')) {
                    replaceItem = Item.of('kubejs:beer_gland')
                } else if (pItem.hasTag('kubejs:kidney')) {
                    replaceItem = Item.of('kubejs:sweets_gland')
                } else if (pItem.hasTag('kubejs:stomach')) {
                    replaceItem = Item.of('kubejs:parasitism_stomach')
                }
                if (!replaceItem) continue
                RemoveChestCavityOrgan(customData, player.chestCavityInstance, organIndex, slotType, true)
                SetChestCavityOrgan(customData, player.chestCavityInstance, replaceItem, slotDefinition.getId(), slotDefinition.getType(), true)
                level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 1, 1)
                return
            }
            // 虚空胃袋转化
            if (emptyItemCount >= aroundRelativeSlots.length) {
                SetChestCavityOrgan(customData, player.chestCavityInstance, Item.of('kubejs:void_stomach_pouch'), organIndex, slotType, true)
                level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 1, 1)
                return
            }
        }
        // 美味虫
        let replaceItem = Item.of('kubejs:worm_of_taste')
        SetChestCavityOrgan(customData, player.chestCavityInstance, replaceItem, organIndex, slotType, true)
    } else {
        organItem.setDamageValue(curDamage)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:worm_larva')
        .addOnlyStrategy('food_eaten', ParasiteLarvaFoodEaten)
)