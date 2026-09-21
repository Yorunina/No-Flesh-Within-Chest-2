// priority: 500
const MagicTagMaxManaUUID = UUID.fromString('6E2B7A41-3C8F-4D91-9A55-2F8C1B47E6D0')
const MagicTagMaxManaIdentifier = 'MagicTagMaxMana'

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function MagicTagChestCavityUpdate(customData, event, tagId, count) {
    const attributeInstance = event.entity.getAttribute('ars_nouveau:ars_nouveau.perk.max_mana')
    if (!attributeInstance) return
    attributeInstance.removeModifier(MagicTagMaxManaUUID)
    let amount = 0
    if (count >= 3) amount = amount + 100
    if (count >= 6) amount = amount + 300
    if (amount == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            MagicTagMaxManaUUID,
            MagicTagMaxManaIdentifier,
            amount,
            $Operation.ADDITION)
    )
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:magic')
        .addStrategy('chest_cavity_update', MagicTagChestCavityUpdate)
)