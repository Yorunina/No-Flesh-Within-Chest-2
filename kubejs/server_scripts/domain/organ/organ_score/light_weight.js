// priority: 500
const LightWeightEntityGravityDownUUID = UUID.fromString('618EC64C-73F0-40A7-9EB5-3ADC51735A53')
const LightWeightEntityGravityDownIdentifier = 'LightWeightEntityGravityDown'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function LightWeightUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:light_weight')
    const attributeInstance = entity.getAttribute('forge:entity_gravity')
    if (!attributeInstance) return
    attributeInstance.removeModifier(LightWeightEntityGravityDownUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            LightWeightEntityGravityDownUUID,
            LightWeightEntityGravityDownIdentifier,
            -organScoreValue * 0.01,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:light_weight', LightWeightUpdateOrganScore)
