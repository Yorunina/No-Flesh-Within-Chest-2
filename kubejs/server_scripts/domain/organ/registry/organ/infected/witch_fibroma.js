// priority: 500
RegistryOrgan('kubejs:witch_fibroma')
    .addScore('chestcavity:digestion', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WitchStomachKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    let potionsStack = GetBundleContents(organItem)
    if (potionsStack.length <= 0) return
    let potionItem = potionsStack[0]
    let potion = $PotionUtils.getPotion(potionItem)
    if (potion.effects.isEmpty()) return
    let effects = potion.getEffects()
    for (let effect of effects) {
        // todo
        player.potionEffects.add(effect.effect, effect.duration, effect.amplifier)
    }
    player.addItemCooldown(organItem, 20 * 120)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:witch_fibroma')
        .addOnlyStrategy('key_active', WitchStomachKeyActive)
)