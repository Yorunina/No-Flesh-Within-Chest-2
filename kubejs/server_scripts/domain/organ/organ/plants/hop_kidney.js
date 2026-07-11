// priority: 500
RegistryOrgan('kubejs:hop_kidney')
    .addScore('chestcavity:detoxification', 0.5)
    .addScore('chestcavity:filtration', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HopKidneyKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const itemStacks = GetBundleContents(organItem)
    if (itemStacks.length <= 0) return
    const beerItemStack = itemStacks[0]
    const nbt = beerItemStack.getNbt()
    let quality = 1
    if (beerItemStack.hasNBT() && nbt.contains('brewery.beer_quality')) {
        quality = nbt.getInt('brewery.beer_quality')
    }
    let effect = MAAUtils.calculateEffectForQuality(beerItemStack, quality)
    if (!effect) return
    $AlcoholManager.drinkAlcohol(player)
    // 更容易喝醉
    $AlcoholManager.drinkAlcohol(player)
    player.addEffect(effect)
    player.addItemCooldown(organItem, 20 * 30)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hop_kidney')
        .addOnlyStrategy('key_active', HopKidneyKeyActive)
)
