// priority: 500
const CritChanceCritChanceUpUUID = UUID.fromString('CE42673E-CDDC-4D8E-82CE-AFEBEBD37E8D')
const CritChanceCritChanceUpIdentifier = 'CritChanceCritChanceUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function CritChanceUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:crit_chance')
    const attributeInstance = entity.getAttribute('attributeslib:crit_chance')
    if (!attributeInstance) return
    attributeInstance.removeModifier(CritChanceCritChanceUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            CritChanceCritChanceUpUUID,
            CritChanceCritChanceUpIdentifier,
            organScoreValue / 100,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:crit_chance', CritChanceUpdateOrganScore)