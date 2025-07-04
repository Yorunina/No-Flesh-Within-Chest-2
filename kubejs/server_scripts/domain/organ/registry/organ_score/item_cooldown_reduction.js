// priority: 500
const ItemCooldownReductionDownUUID = 'BD2B673B-7A6A-4626-8A30-5AAF4B5A3636'
const ItemCooldownReductionDownIdentifier = 'ItemCooldownReductionDown'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function ItemCooldownReductionOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:item_cooldown_reduction')
    const attributeInstance = entity.getAttribute('item_cooling_reduction:reduction')
    if (!attributeInstance) return
    attributeInstance.removeModifier(ItemCooldownReductionDownUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            ItemCooldownReductionDownUUID,
            ItemCooldownReductionDownIdentifier,
            organScoreValue,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:item_cooldown_reduction', ItemCooldownReductionOrganScore)

