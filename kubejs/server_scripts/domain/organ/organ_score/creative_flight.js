// priority: 500
const CreativeFlightCreativeFlightUpUUID = UUID.fromString('BA9F089C-ABC5-4326-935B-DE6509999CA1')
const CreativeFlightCreativeFlightUpIdentifier = 'CreativeFlightCreativeFlightUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function CreativeFilghtUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:creative_flight')
    const attributeInstance = entity.getAttribute('attributeslib:creative_flight')
    if (!attributeInstance) return
    attributeInstance.removeModifier(CreativeFlightCreativeFlightUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            CreativeFlightCreativeFlightUpUUID,
            CreativeFlightCreativeFlightUpIdentifier,
            organScoreValue,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:creative_flight', CreativeFilghtUpdateOrganScore)