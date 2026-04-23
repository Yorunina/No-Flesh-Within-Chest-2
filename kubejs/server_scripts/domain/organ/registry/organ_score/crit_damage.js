// priority: 500
const CritDamageCritDamageUpUUID = UUID.fromString('7DA00F94-96BD-417D-9AE0-3D6F37D74522')
const CritDamageCritDamageUpIdentifier = 'CritDamageCritDamageUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function CritDamageUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:crit_damage')
    const attributeInstance = entity.getAttribute('attributeslib:crit_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(CritDamageCritDamageUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            CritDamageCritDamageUpUUID,
            CritDamageCritDamageUpIdentifier,
            organScoreValue / 20,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:crit_damage', CritDamageUpdateOrganScore)