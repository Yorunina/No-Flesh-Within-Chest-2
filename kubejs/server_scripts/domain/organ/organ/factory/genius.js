// priority: 500
RegistryOrgan('kubejs:genius')
    .addScore('kubejs:stress', 1)
    .addScore('kubejs:creative_flight', 1)

/**
 * 处理器官事件：key_active。
 * @param {OrganEventCustomData} customData
 * @param {Internal.NetworkEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function geniusKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    let potionsStack = GetBundleContents(organItem)
    if (potionsStack.length <= 0) {
        player.removeAllEffects()
        return
    }
    let potionItem = potionsStack[0]
    let potion = $PotionUtils.getPotion(potionItem)
    if (potion.effects.isEmpty()) return
    let effects = potion.getEffects()
    for (let effect of effects) {
        player.potionEffects.add(effect.effect, effect.duration * 99999, effect.amplifier)
    }
    player.addItemCooldown(organItem, 20 * 10)
}

/**
 * 处理器官事件：chest_cavity_update。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function geniusChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const entity = event.entity
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    const effects = entity.getActiveEffects()
    const effectCount = effects.size()
    stressValue = stressValue + effectCount
    chestCavity.setOrganScore('kubejs:stress', stressValue)
}

/**
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function geniusArmorTakeOn(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinAdd(entity, 'chest', 'secret/chestcavity/genius')
}

/**
 * 处理器官事件：organ_take_off。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function geniusArmorTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    OrganSkinRemove(entity, 'chest', 'secret/chestcavity/genius')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:genius')
        .addOnlyStrategy('key_active', geniusKeyActive)
        .addOnlyStrategy('organ_take_on', geniusArmorTakeOn, -1)
        .addOnlyStrategy('organ_take_off', geniusArmorTakeOff)
        .addOnlyStrategy('chest_cavity_update', geniusChestCavityUpdate, 10)
)
