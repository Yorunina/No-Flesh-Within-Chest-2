// priority: 500
RegistryOrgan('kubejs:jar_of_mystery')
    .addScore('chestcavity:endurance', -1)
    .addScore('chestcavity:digestion', -1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function JarOfMysteryFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.getPlayer()
    if (!player) return
    let curDamage = organItem.getDamageValue() + 1
    player.potionEffects.add('minecraft:absorption', 20 * 20, 0)
    if (curDamage >= organItem.getMaxDamage()) {
        MAAUtils.onKubeTaskFinish('jar_of_mystery_grow', player, (pTask, pPlayer, pTeamData) => {
            pTeamData.addProgress(pTask, 1)
        })
        let replaceItem = Item.of('kubejs:worm_larva')
        replaceItem.setDamageValue(replaceItem.getMaxDamage())
        SetChestCavityOrgan(customData, player.chestCavityInstance, replaceItem, organIndex, slotType, true)
    } else {
        organItem.setDamageValue(curDamage)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:jar_of_mystery')
        .addOnlyStrategy('food_eaten', JarOfMysteryFoodEaten)
)

