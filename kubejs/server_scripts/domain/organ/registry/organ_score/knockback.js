// priority: 500
const KnockbackAttckKnockbackUUID = UUID.fromString('C8324C7F-1FC9-4480-B74A-F511CB18B246')
const KnockbackAttckKnockbackIdentifier = 'KnockbackAttckKnockback'

/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function KnockbackOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:knockback')
    const attributeInstance = entity.getAttribute('minecraft:generic.attack_knockback')
    if (!attributeInstance) return
    attributeInstance.removeModifier(KnockbackAttckKnockbackUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            KnockbackAttckKnockbackUUID,
            KnockbackAttckKnockbackIdentifier,
            0.5 * organScoreValue,

            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:knockback', KnockbackOrganScore)