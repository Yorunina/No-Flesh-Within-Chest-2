// priority: 500
RegistryOrgan('kubejs:jar_of_mystery')
    .addScore('chestcavity:endurance', 1)
    .addScore('chestcavity:digestion', 1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function JarOfMysteryFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.getPlayer()
    let curDamage = organItem.getDamageValue() + 1
    player.potionEffects.add('minecraft:absorption', 20 * 20, 0)
    if (curDamage >= organItem.getMaxDamage()) {
        let replaceItem = Item.of('kubejs:parasite_larva')
        replaceItem.setDamageValue(replaceItem.getMaxDamage())
        SetChestCavityOrgan(customData, player.chestCavityInstance, replaceItem, organIndex, slotType, false)
    } else {
        organItem.setDamageValue(curDamage)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:jar_of_mystery')
        .addOnlyStrategy('food_eaten', JarOfMysteryFoodEaten)
)


RegistryOrgan('kubejs:parasite_larva')
    .addScore('chestcavity:filtration', 1)
    .addScore('chestcavity:fire_resistant', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ParasiteLarvaFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.getPlayer()
    const item = event.getItem()
    if (!organItem.hasNBT()) {
        organItem.setNbt(new $CompoundTag())
    }
    let nbt = organItem.getNbt()
    let saturation = nbt.getFloat('saturation')

    let foodProperties = item.getFoodProperties(player)
    let foodHunger = foodProperties.getNutrition()
    let foodSaturation = foodProperties.getSaturationModifier() * foodHunger
    nbt.putFloat('saturation', saturation + foodSaturation)
    let curDamage = organItem.getDamageValue() - foodHunger
    if (curDamage <= 0) {
        // SetChestCavityOrgan(customData, player.chestCavityInstance, replaceItem, organIndex, slotType, false)
    } else {
        organItem.setDamageValue(curDamage)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:parasite_larva')
        .addOnlyStrategy('food_eaten', ParasiteLarvaFoodEaten)
)